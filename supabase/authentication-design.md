# Oliveal Gaming Zone — Authentication Architecture & Supabase Database Design

## 1. Executive Summary & Architectural Overview

Oliveal Gaming Zone operates as a premium 24/7 gaming lounge slot-booking platform. The system supports two distinct classes of users:
1. **Public Customers**: Gamers booking slots online, tracking reservation passes, and managing profiles.
2. **Operations Administrators**: Lounge front-desk leads managing counter walk-in blocks, scanning customer QR tokens, and updating pricing settings.

Both user classes authenticate through a single, hardened **Supabase Auth** engine, with identity records residing in `auth.users` and application-level domain attributes residing in `public.profiles`.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          OLIVEAL FRONTEND                              │
├───────────────────────────────────┬────────────────────────────────────┤
│         CUSTOMER INTERFACE        │          ADMIN INTERFACE           │
│  - Email/Password Signup + OTP     │  - Email/Password Restricted Login │
│  - Email/Password Login           │  - Zero Public Signup              │
│  - Google OAuth Sign-in           │  - Dedicated Operations Portal     │
└─────────────────┬─────────────────┴──────────────────┬─────────────────┘
                  │                                    │
                  ▼                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        SUPABASE AUTH (auth.users)                      │
│  - Manages credentials, password hashing (bcrypt/argon2), JWT tokens  │
│  - Dispatches 6-digit email confirmation OTP codes                    │
│  - Handles Google OAuth 2.0 PKCE authentication flow                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                  Database Trigger  │ (on_auth_user_created)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       DATABASE (public.profiles)                       │
│  - 1-to-1 Cascade link: profiles.id = auth.users.id                    │
│  - Role-based authorization: 'customer' (default) vs 'admin'           │
│  - Lifecycle status: 'active' vs 'disabled'                            │
│  - Row Level Security (RLS) guarded by non-recursive helper function   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Why Customers & Admins Share `auth.users`

Rather than maintaining disparate authentication tables (which leads to security vulnerabilities, duplicate session management, and custom password hashing vulnerabilities):

1. **Battle-Tested Cryptographic Security**: Supabase Auth securely manages password hashing (Argon2/bcrypt), token refresh rotation, brute-force mitigation, and session persistence in browser storage.
2. **Unified Session Handling**: The `@supabase/supabase-js` client manages JWT tokens, session lifecycle, and automatic token refresh identically across both customer and admin portals.
3. **Database-Enforced Role Separation**: Authentication (who you are) is separated from Authorization (what you are permitted to do). Identity is verified by `auth.users`, while permissions are strictly dictated by `public.profiles.role`.
4. **Zero Administrative Credential Exposure**: Administrators never have their passwords or credentials stored in public application tables.

---

## 3. Application Table: `public.profiles`

### Column Specifications

| Column | Data Type | Constraints | Default | Purpose |
|---|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY`, `REFERENCES auth.users(id) ON DELETE CASCADE` | None | Direct 1-to-1 foreign key to Supabase Auth identity record. |
| `full_name` | `TEXT` | `NOT NULL` | `''` | User's display name, presented in customer dashboard, booking tokens, and admin tables. |
| `avatar_url` | `TEXT` | `NULLABLE` | `NULL` | Profile picture URL, populated automatically when signing in via Google OAuth. |
| `role` | `TEXT` | `NOT NULL`, `CHECK (role IN ('customer', 'admin'))` | `'customer'` | Authorization role. Flat permissions model: all admins have equal operational power. |
| `status` | `TEXT` | `NOT NULL`, `CHECK (status IN ('active', 'disabled'))` | `'active'` | Account operational status. Disabled accounts cannot authenticate or access endpoints. |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL` | `NOW()` | Timestamp when the user registered in the system. |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL` | `NOW()` | Automatically updated on every profile mutation via database trigger. |

### Why Extra Columns Were Excluded
- **`email`**: Intentionally omitted from `public.profiles`. `auth.users.email` is the single source of truth for user email addresses. Replicating `email` introduces data desynchronization and potential PII leak vectors via broad profile reads.
- **`phone`**: Managed either directly via Supabase Auth Phone or collected contextually during customer bookings and walk-ins.
- **Passwords & OTP tokens**: Handled entirely inside Supabase Auth internals (`auth.users.encrypted_password`, OTP challenge tables).

---

## 4. Automatic Profile Creation Trigger (`handle_new_user`)

Whenever a user is registered—whether via Email/Password signup or Google OAuth—PostgreSQL fires the `on_auth_user_created` trigger executing `public.handle_new_user()`.

### Security Guarantees:
1. **Hardcoded Role Enforcement**: The trigger **always** writes `role = 'customer'`. Even if a malicious actor attempts to send `{ "data": { "role": "admin" } }` through the frontend client SDK, the trigger categorically ignores metadata role inputs.
2. **Metadata Name Extraction**: Extracts customer name using fallback precedence:
   ```sql
   COALESCE(
     NULLIF(TRIM(NEW.raw_user_meta_data->>'full_name'), ''),
     NULLIF(TRIM(NEW.raw_user_meta_data->>'fullName'), ''),
     NULLIF(TRIM(NEW.raw_user_meta_data->>'name'), ''),
     NULLIF(TRIM(SPLIT_PART(NEW.email, '@', 1)), ''),
     'Gamer'
   )
   ```
3. **Idempotent Upsert**: Utilizes `ON CONFLICT (id) DO UPDATE` to ensure duplicate OAuth token arrivals cannot throw database errors.
4. **Explicit Search Path**: Configured with `SECURITY DEFINER SET search_path = public, auth, pg_temp` to defeat search-path injection vulnerabilities.

---

## 5. Row Level Security (RLS) & Non-Recursive Admin Verification

Row Level Security is enabled on `public.profiles`.

### The Recursion Problem & Solution
If an RLS policy on `public.profiles` checks `role = 'admin'` by querying `public.profiles`, PostgreSQL initiates an infinite recursion loop, resulting in a query failure.

**The Solution**: We introduce a `SECURITY DEFINER` helper function `public.is_admin(check_user_id UUID)`:
```sql
CREATE OR REPLACE FUNCTION public.is_admin(check_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = check_user_id AND role = 'admin' AND status = 'active'
  );
$$;
```
Because `is_admin` executes with definer privileges and fixed search path, it evaluates admin membership internally without triggering outer RLS policy recursion.

### Summary of Policies

1. **`Users can read own profile`** (`SELECT`):
   - Scope: `TO authenticated`
   - Condition: `USING (auth.uid() = id)`
   - Effect: Customers can only query their own profile data.
2. **`Admins can read all profiles`** (`SELECT`):
   - Scope: `TO authenticated`
   - Condition: `USING (public.is_admin(auth.uid()))`
   - Effect: Administrators can query all customer profiles to verify bookings and walk-ins.
3. **`Users can update own display profile`** (`UPDATE`):
   - Scope: `TO authenticated`
   - Condition: `USING (auth.uid() = id) WITH CHECK (auth.uid() = id)`
   - Effect: Users can edit their display details (`full_name`, `avatar_url`).
4. **`Admins can update profiles`** (`UPDATE`):
   - Scope: `TO authenticated`
   - Condition: `USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()))`
   - Effect: Administrators can update profile records and manage customer account statuses.
5. **Authorization Column Tamper Protection**:
   - Guarded by the database trigger `trg_protect_profile_authorization`.
   - If a customer attempts to mutate `role` or `status`, the trigger raises an explicit exception: `Access Denied: You are not authorized to modify user roles.`

---

## 6. Authentication Workflows

### Workflow 1: Customer Email/Password Registration & OTP Verification
```
[ Customer ]             [ React App ]                [ Supabase Auth ]          [ Database ]
     │                         │                              │                       │
     │── Fill Signup Form ────▶│                              │                       │
     │   (Name, Email, Pass)   │── supabase.auth.signUp() ───▶│                       │
     │                         │   metadata: { full_name }    │── Create auth.user ──▶│
     │                         │                              │   (status: unconfirmed│── Trigger handle_new_user()
     │                         │                              │                       │   (Inserts profile:
     │                         │◀─ Verification Email Sent ───│                       │    role='customer',
     │◀─ Navigate to /verify ──│   (6-digit OTP code)         │                       │    status='active')
     │                         │                              │                       │
     │── Enter 6-digit OTP ───▶│                              │                       │
     │                         │── supabase.auth.verifyOtp() ─▶│                       │
     │                         │   (email, token, 'signup')   │── Confirms User ──────▶│
     │                         │                              │   (email_confirmed_at)│
     │                         │◀─ Session & JWT Returned ────│                       │
     │◀─ Redirect to Book Slot─│                              │                       │
```

### Workflow 2: Customer Google OAuth 2.0 Sign-in
```
[ Customer ]             [ React App ]                [ Google OAuth ]           [ Supabase Auth ]
     │                         │                              │                          │
     │── Click Google Button ─▶│── signInWithOAuth('google') ─┼─────────────────────────▶│
     │                         │◀─ Redirect to Google URL ────┼──────────────────────────│
     │── Consent Screen ───────┼─────────────────────────────▶│                          │
     │                         │                              │── Exchange Auth Code ───▶│
     │                         │◀─ Callback to /verify-email ─┼──────────────────────────│
     │                         │   (Session token in URL)     │                          │
     │                         │── getSession() ──────────────┼─────────────────────────▶│
     │◀─ Redirect to Book Slot─│                              │                          │
```

### Workflow 3: Admin Account Provisioning & Login
```
[ Authorized Lead ]     [ Supabase Dashboard / CLI ]    [ Database ]
        │                             │                      │
        │── Create User Account ─────▶│                      │
        │   (admin@oliveal.com, pass) │── Inserts auth.users▶│── Trigger handle_new_user()
        │                             │                      │   (role initially 'customer')
        │── Execute Promotion SQL ───▶│                      │
        │   UPDATE profiles           │─────────────────────▶│── Sets role='admin'
        │   SET role = 'admin'        │                      │
        │                             │                      │
[ Operations Admin ]    [ /admin/login Page ]         [ Supabase Auth ]          [ Database RLS ]
        │                             │                      │                          │
        │── Email + Password ────────▶│── signInWithPassword▶│                          │
        │                             │◀─ Session Returned ──│                          │
        │                             │── Query profiles ────┼─────────────────────────▶│
        │                             │   (Check role='admin')                          │── is_admin()=true
        │◀─ Access Admin Operations ──│◀─ Role Verified ─────┼──────────────────────────│
```

---

## 7. Supabase Dashboard Configuration Checklist

The following items must be configured inside your [Supabase Dashboard](https://supabase.com/dashboard) before activating live authentication in the frontend:

### A. Email Authentication & OTP
- [ ] **Enable Email Provider**: Go to **Authentication → Providers → Email** and ensure it is turned ON.
- [ ] **Enable Email Confirmations**: Enable **Confirm email** so unverified users must supply OTP codes before session activation.
- [ ] **Secure Email Change**: Turn on **Secure email change**.
- [ ] **OTP Expiration**: Set OTP expiry duration (default: 3600 seconds or adjust to 600 seconds for enhanced security).
- [ ] **Email Template for Signup**:
  - Go to **Authentication → Email Templates → Confirm signup**.
  - Customize subject: `Your Oliveal Gaming Zone Verification Code`.
  - Ensure the template uses `{{ .Token }}` to inject the 6-digit numeric OTP code matching the 6-box input on [`EmailOtpVerificationPage.tsx`](file:///Users/varshan/Desktop/Oliveall/src/pages/auth/EmailOtpVerificationPage.tsx).
- [ ] **SMTP Provider (Production)**: Configure custom SMTP (e.g. Resend, SendGrid, Amazon SES) in **Project Settings → Authentication → SMTP Settings** to prevent rate-limiting on default Supabase emails.

### B. Google OAuth Configuration
- [ ] **Enable Google Provider**: Go to **Authentication → Providers → Google** and toggle it ON.
- [ ] **Google Cloud Console Credentials**:
  - Create an OAuth 2.0 Client ID (Web Application) in Google Cloud Console.
  - Set **Authorized Redirect URIs** to your Supabase callback URL:
    `https://<your-project-ref>.supabase.co/auth/v1/callback`
- [ ] **Enter Client ID & Client Secret**: Paste the Google Client ID and Secret into the Supabase Google Provider card.
- [ ] **Authorized Redirect URLs in Supabase**:
  - Go to **Authentication → URL Configuration**.
  - Add **Site URL**: `http://localhost:5173` (development) or production domain.
  - Add **Redirect URLs**:
    - `http://localhost:5173/**`
    - `http://127.0.0.1:5173/**`

---

## 8. Next Phase: Frontend Integration Roadmap

Once the SQL schema is approved and applied in the Supabase SQL Editor, the frontend integration will proceed in the following structured steps:

1. **`src/services/authService.ts` Integration**:
   - Replace localStorage mock authentication functions with live Supabase client calls:
     - `supabase.auth.signUp({ email, password, options: { data: { full_name } } })`
     - `supabase.auth.verifyOtp({ email, token, type: 'signup' })`
     - `supabase.auth.signInWithPassword({ email, password })`
     - `supabase.auth.signInWithOAuth({ provider: 'google' })`
     - `supabase.auth.signOut()`
2. **Session Persistence & Auth Hook**:
   - Implement `useAuth()` context to listen to `supabase.auth.onAuthStateChange()`.
   - Maintain active user profile state in React context.
3. **Route Guards**:
   - Guard `/customer/*` routes requiring an active authenticated session.
   - Guard `/admin/*` routes requiring `profile.role === 'admin'`.
