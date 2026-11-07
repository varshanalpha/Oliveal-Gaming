---
task: auth-frontend-audit-supabase-schema
type: quick
status: in_progress
created: 2026-11-07
description: Perform comprehensive frontend authentication audit and generate production-ready Supabase auth schema and documentation
---

# Quick Task: Authentication Frontend Audit & Supabase Database Schema

## Objective
Audit the entire existing frontend authentication implementation (Customer & Admin), determine the exact PostgreSQL database requirements, and generate a clean, secure, production-ready `supabase/schema.sql` and comprehensive architectural guide `supabase/authentication-design.md`.

## Scope & Constraints
- Strictly limited to authentication schema and documentation.
- Do not modify frontend code or mock services in this task.
- Do not create booking, station, payment, or operational tables.
- Do not execute SQL against the live database without explicit user approval.
- Follow Supabase PostgreSQL security best practices (RLS, explicit search paths, security definer admin helper to prevent recursion, tamper-proof trigger assigning default `customer` role).

## Task Breakdown
1. **Task 1: Comprehensive Frontend Inspection**
   - Inspect Customer Login, Signup, OTP Verification, and Profile editing pages.
   - Inspect Admin Login page.
   - Inspect `authService.ts`, `types/auth.ts`, `types/customer.ts`.
   - Document exact fields collected vs expectations.
2. **Task 2: Database Schema Architecture (`supabase/schema.sql`)**
   - Create `public.profiles` referencing `auth.users.id` with `ON DELETE CASCADE`.
   - Role constraints (`customer`, `admin`) and status constraints (`active`, `disabled`).
   - Timestamps (`created_at`, `updated_at`) and automatic update trigger.
   - Secure trigger function `handle_new_user()` with explicit `search_path = public` that hardcodes `role = 'customer'` (ignoring metadata tamper attempts).
   - Secure helper function `is_admin(user_id UUID)` (`SECURITY DEFINER`, fixed search path) to prevent RLS recursion.
   - Fine-grained RLS policies for customer self-read and admin global-read.
   - Idempotent script with non-destructive patterns.
3. **Task 3: Architectural Documentation (`supabase/authentication-design.md`)**
   - Detail Supabase Auth vs PostgreSQL responsibilities.
   - Signup, OTP verification, Google OAuth, and Admin provisioning workflows.
   - Supabase Dashboard configuration checklist (SMTP, OTP, redirect URLs, Google OAuth).
   - Next phase roadmap for frontend integration.
4. **Task 4: Validation & Review**
   - Validate SQL syntax and constraints.
   - Verify zero destructive commands.
   - Prepare comprehensive audit report with explicit stop condition.

