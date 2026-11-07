---
task: auth-frontend-integration
type: quick
status: complete
created: 2026-11-07
description: Integrate Oliveal Gaming Zone frontend authentication pages with Supabase Auth and PostgreSQL schema
---

# Quick Task: Supabase Authentication Frontend Integration

## Objective
Connect all existing Oliveal Gaming Zone authentication pages (`CustomerLoginPage`, `CustomerSignupPage`, `EmailOtpVerificationPage`, `AdminLoginPage`) to live Supabase Auth and the `public.profiles` database schema. Preserve all existing UI designs, components, animations, and user experience while replacing mock authentication with live Supabase workflows.

## Scope & Constraints
- Support Customer Signup with Email/Password + Resend SMTP OTP verification.
- Support Customer Login with Email/Password and email verification check.
- Support Google OAuth PKCE flow with redirect callback (`/auth/callback`).
- Support Admin Login with Email/Password and strict database-backed role verification (`role === 'admin'`).
- Support centralized session persistence (`AuthContext` + `onAuthStateChange`).
- Enforce client route protection (`RequireAuth`, `RequireCustomer`, `RequireAdmin`).
- Maintain `.env.example` and keep `.env` gitignored.
- Preserve all existing dark gaming aesthetics and component layouts.

## Implementation Steps
1. **Supabase Client & Environment**:
   - Update `src/lib/supabase.ts` to support `VITE_SUPABASE_PUBLISHABLE_KEY` and `VITE_SUPABASE_ANON_KEY`.
   - Update `.env` and create `.env.example`.
2. **Centralized Auth State Management**:
   - Create `src/contexts/AuthContext.tsx` and custom hook `src/hooks/useAuth.ts`.
   - Implement `onAuthStateChange`, profile fetching from `public.profiles`, loading, and session restore.
3. **OAuth Callback Route (`/auth/callback`)**:
   - Create `src/pages/auth/AuthCallbackPage.tsx`.
   - Register route in `src/App.tsx`.
4. **Customer Signup & Email OTP Integration**:
   - Connect `CustomerSignupPage.tsx` to `supabase.auth.signUp()`.
   - Connect `EmailOtpVerificationPage.tsx` to `supabase.auth.verifyOtp()` and `supabase.auth.resend()`.
5. **Customer Login Integration**:
   - Connect `CustomerLoginPage.tsx` to `supabase.auth.signInWithPassword()`.
   - Handle unconfirmed email redirection to `/verify-email`.
6. **Google OAuth Integration**:
   - Connect `GoogleButton.tsx` / `handleGoogleSignup` / `handleGoogleLogin` to `supabase.auth.signInWithOAuth()`.
7. **Admin Login Integration**:
   - Connect `AdminLoginPage.tsx` to `supabase.auth.signInWithPassword()`.
   - Verify `role === 'admin'` from `public.profiles`. Reject non-admin users.
8. **Route Guards & Protection**:
   - Implement `src/components/auth/ProtectedRoute.tsx`.
   - Protect `/customer/*` and `/admin/*` routes in `src/App.tsx`.
9. **Profile Integration**:
   - Update `src/services/authService.ts` and `src/pages/customer/ProfilePage.tsx` to use live Supabase session and profile.
10. **Verification & Build**:
    - Verify with `npm run build` (0 TypeScript errors).
    - Perform live workflow verification.
    - Write `SUMMARY.md` and update `.planning/STATE.md`.
