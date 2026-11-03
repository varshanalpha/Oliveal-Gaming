# Roadmap: Oliveal Gaming Zone

## Overview
Progressive sequential build journey: starting with high-fidelity Landing Page frontend, moving to Authentication Pages (Customer Signup, Login, Email OTP, Admin Login), customer booking flow and admin matrix UI, followed by PostgreSQL database schema with atomic stored procedures, and culminating in serverless edge functions, Razorpay payments, and Resend email ticketing.

## Phases
- [x] **Phase 1: High-Fidelity Landing Page & Brand Scaffolding** - Vite + React + TS setup, dark gaming UI theme, navigation, hero, stations, features, booking steps, and responsive layout. (COMPLETED)
- [ ] **Phase 2: Authentication Pages & Mock Flow** - Customer Login, Customer Signup, Email OTP Verification, and dedicated Admin Login strictly adhering to reference image design.
- [ ] **Phase 3: Customer Booking Flow & Pass UI** - 24/7 calendar, 8 PM IST tomorrow rule, station picker, duration selector, and pass view.
- [ ] **Phase 4: Admin Matrix Grid & Counter Walk-In POS** - 24/7 slot grid, Quick Block and Complete walk-in modals, station maintenance toggles.
- [ ] **Phase 5: Database Layer & Atomic Concurrency Stored Procedures** - PostgreSQL DDL, `acquire_slot_lock`, and RLS policies.
- [ ] **Phase 6: Payments, Auth & Serverless API Integrations** - Supabase Auth, Razorpay edge functions, Resend QR emails, and realtime syncing.

## Phase Details

### Phase 2: Authentication Pages & Mock Flow
**Goal**: Implement pixel-perfect Customer Login, Customer Signup, Email OTP Verification, and Admin Login matching the attached reference design.
**Depends on**: Phase 1
**Requirements**: [AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05]
**Success Criteria**:
  1. Customer Login (`/login`) with email/password, show/hide password, Remember Me, role switcher tab, Google OAuth simulation, and link to Signup.
  2. Customer Signup (`/signup`) with Full Name, Email, Password, Confirm Password, dynamic password strength meter, Terms checkbox, Google OAuth simulation, navigating to `/verify-email`.
  3. Email OTP Verification (`/verify-email`) with masked email pill, 6-digit auto-advancing OTP input with clipboard paste support, resend countdown cooldown, change email action, and success state.
  4. Admin Login (`/admin/login`) with strict Email + Password only, NO signup links, NO Google OAuth, and navigation back to Customer Login.
  5. Mock Authentication Service (`authService.ts`) with typed interfaces, simulating async responses, validations, and loading states without modifying UI components.
  6. Routing configured for `/login`, `/signup`, `/verify-email`, `/admin/login`, with placeholder destinations for authenticated states.

Plans:
- [ ] 02-01: Types, contracts, and Mock Authentication Service layer (`src/services/authService.ts`).
- [ ] 02-02: Reusable Auth Layout and input components (Split-screen container, Password strength meter, 6-box OTP input, Google button).
- [ ] 02-03: Customer Login Page (`src/pages/auth/CustomerLoginPage.tsx`) matching reference design.
- [ ] 02-04: Customer Signup Page (`src/pages/auth/CustomerSignupPage.tsx`) matching reference design with password strength & validations.
- [ ] 02-05: Email OTP Verification Page (`src/pages/auth/EmailOtpVerificationPage.tsx`) with auto-advance, paste, and cooldown timers.
- [ ] 02-06: Admin Login Page (`src/pages/auth/AdminLoginPage.tsx`) with strict email/password and no signup/OAuth.
- [ ] 02-07: Routing configuration in `src/App.tsx` and navbar/CTA linking.
- [ ] 02-08: Cross-browser QA, mobile responsive validation, and production build check.
