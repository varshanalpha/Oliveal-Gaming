-- ==============================================================================
-- OLIVEAL GAMING ZONE — AUTHENTICATION & PROFILES DATABASE SCHEMA
-- ==============================================================================
-- Purpose: Application-level profile management, role-based access control,
--          and Row Level Security (RLS) integrated with Supabase Auth (auth.users).
--
-- Security Philosophy:
--   1. Shared Identity Hub: All users (customers and admins) authenticate via Supabase Auth (auth.users).
--   2. Explicit Profile Separation: Application metadata, roles ('customer', 'admin'), and statuses
--      reside strictly in public.profiles.
--   3. Zero Trust Signup: Trigger assigns default 'customer' role. Frontend metadata attempts to pass
--      role='admin' are categorically ignored.
--   4. Tamper-Proof Columns: Authorization columns (role, status) cannot be mutated by regular customers.
--   5. Non-Recursive RLS: Admin verification utilizes a dedicated SECURITY DEFINER helper function.
--
-- Idempotence: Safe to run on fresh or existing Supabase PostgreSQL instances.
-- ==============================================================================

-- 1. EXTENSIONS
-- Supabase enables pgcrypto and uuid-ossp by default; this ensures compatibility.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. APPLICATION TABLE: public.profiles
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  -- One-to-one relationship with Supabase Auth identities
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Display and presentation attributes
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  
  -- Role-based authorization: flat permissions model (Option B)
  role TEXT NOT NULL DEFAULT 'customer'
    CONSTRAINT check_profiles_role CHECK (role IN ('customer', 'admin')),
    
  -- User lifecycle status constraint
  status TEXT NOT NULL DEFAULT 'active'
    CONSTRAINT check_profiles_status CHECK (status IN ('active', 'disabled')),
    
  -- Audit timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Documentation comment on table
COMMENT ON TABLE public.profiles IS 'Stores application-level user profiles and authorization roles for Oliveal Gaming Zone.';
COMMENT ON COLUMN public.profiles.id IS 'Primary key referencing auth.users(id) in a 1-to-1 cascade relationship.';
COMMENT ON COLUMN public.profiles.role IS 'Authorization role: customer (default) or admin (provisioned).';
COMMENT ON COLUMN public.profiles.status IS 'Account status: active or disabled.';

-- ==============================================================================
-- 3. INDEXES
-- ==============================================================================
-- Optimized index for role filtering (e.g. admin checks)
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Optimized index for active status filtering
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);

-- ==============================================================================
-- 4. NON-RECURSIVE SECURITY DEFINER HELPER: is_admin()
-- ==============================================================================
-- Solves RLS infinite recursion when evaluating admin privileges against public.profiles.
-- Bypasses RLS internally with locked search_path.
CREATE OR REPLACE FUNCTION public.is_admin(check_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = check_user_id
      AND role = 'admin'
      AND status = 'active'
  );
$$;

COMMENT ON FUNCTION public.is_admin IS 'Returns true if the given user (or auth.uid() by default) is an active administrator. Non-recursive.';

-- Restrict function execution permissions
REVOKE ALL ON FUNCTION public.is_admin(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin(UUID) TO service_role;

-- ==============================================================================
-- 5. AUTOMATIC PROFILE CREATION TRIGGER: handle_new_user()
-- ==============================================================================
-- Automatically provisions a public.profiles record when a user registers in auth.users.
--
-- Security Guards:
--   - Hardcodes role to 'customer'. NEVER trusts role supplied in metadata.
--   - Hardcodes status to 'active'.
--   - Extracts full_name from email/password metadata or Google OAuth metadata.
--   - Extracts avatar_url from OAuth providers if present.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
DECLARE
  v_full_name TEXT;
  v_avatar_url TEXT;
BEGIN
  -- Extract display name from metadata with hierarchical fallbacks:
  -- 1. Standard full_name / fullName key (CustomerSignupPage)
  -- 2. Google OAuth name / user_name
  -- 3. Local-part prefix of email (e.g., 'gamer' from 'gamer@oliveal.com')
  -- 4. Generic 'Gamer' fallback
  v_full_name := COALESCE(
    NULLIF(TRIM(NEW.raw_user_meta_data->>'full_name'), ''),
    NULLIF(TRIM(NEW.raw_user_meta_data->>'fullName'), ''),
    NULLIF(TRIM(NEW.raw_user_meta_data->>'name'), ''),
    NULLIF(TRIM(SPLIT_PART(NEW.email, '@', 1)), ''),
    'Gamer'
  );

  -- Extract avatar URL from Google OAuth metadata if provided
  v_avatar_url := COALESCE(
    NULLIF(TRIM(NEW.raw_user_meta_data->>'avatar_url'), ''),
    NULLIF(TRIM(NEW.raw_user_meta_data->>'picture'), ''),
    NULL
  );

  -- Insert profile record with hardcoded customer role (Tamper-proof)
  INSERT INTO public.profiles (
    id,
    full_name,
    avatar_url,
    role,
    status,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    v_full_name,
    v_avatar_url,
    'customer', -- STRICT: Automatic signups are ALWAYS customer role
    'active',   -- Default status
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    updated_at = NOW();

  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.handle_new_user IS 'Trigger function to safely initialize public.profiles when auth.users receives an insertion.';

-- Register trigger on auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 6. AUTOMATIC TIMESTAMP TRIGGER: handle_updated_at()
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profiles_updated ON public.profiles;
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 7. COLUMN TAMPER PREVENTION TRIGGER: protect_profile_authorization_fields()
-- ==============================================================================
-- Protects 'role' and 'status' columns against unauthorized customer mutation.
-- If a non-admin attempts to update role or status, the database rejects the update.
CREATE OR REPLACE FUNCTION public.protect_profile_authorization_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- If caller is not an active admin, block changes to authorization columns
  IF NOT public.is_admin(auth.uid()) THEN
    IF NEW.role IS DISTINCT FROM OLD.role THEN
      RAISE EXCEPTION 'Access Denied: You are not authorized to modify user roles.';
    END IF;
    IF NEW.status IS DISTINCT FROM OLD.status THEN
      RAISE EXCEPTION 'Access Denied: You are not authorized to modify account status.';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.protect_profile_authorization_fields IS 'Enforces that only administrators can mutate role and status columns.';

DROP TRIGGER IF EXISTS trg_protect_profile_authorization ON public.profiles;
CREATE TRIGGER trg_protect_profile_authorization
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_profile_authorization_fields();

-- ==============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Explicitly enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 8.1 SELECT Policies
-- Customer: Authenticated user can read their own profile
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Users can read own profile'
  ) THEN
    CREATE POLICY "Users can read own profile"
      ON public.profiles
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;
END $$;

-- Admin: Active administrator can view all profile records
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Admins can read all profiles'
  ) THEN
    CREATE POLICY "Admins can read all profiles"
      ON public.profiles
      FOR SELECT
      TO authenticated
      USING (public.is_admin(auth.uid()));
  END IF;
END $$;

-- 8.2 UPDATE Policies
-- Customer: Can update their own display fields (full_name, avatar_url)
-- Note: Trigger protect_profile_authorization_fields prevents tampering with role/status.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Users can update own display profile'
  ) THEN
    CREATE POLICY "Users can update own display profile"
      ON public.profiles
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Admin: Can update profiles (including status and role assignment during provisioning)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Admins can update profiles'
  ) THEN
    CREATE POLICY "Admins can update profiles"
      ON public.profiles
      FOR UPDATE
      TO authenticated
      USING (public.is_admin(auth.uid()))
      WITH CHECK (public.is_admin(auth.uid()));
  END IF;
END $$;

-- 8.3 INSERT / DELETE Policies
-- Direct INSERT from client applications is disabled (Handled via handle_new_user trigger).
-- Service Role has unrestricted bypass for administrative CLI tasks and backend workers.

-- ==============================================================================
-- 9. END OF AUTHENTICATION SCHEMA
-- ==============================================================================

