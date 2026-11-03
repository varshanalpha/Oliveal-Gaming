# Roadmap: Oliveal Gaming Zone

## Overview
Progressive 3-Stage build journey: starting with high-fidelity Landing Page frontend, moving to customer booking and admin matrix UI, followed by PostgreSQL database schema with atomic stored procedures, and culminating in serverless edge functions, Razorpay payments, and Resend email ticketing.

## Phases
- [ ] **Phase 1: High-Fidelity Landing Page & Brand Scaffolding** - Vite + React + TS setup, dark gaming UI theme, navigation, hero, stations, features, booking steps, and responsive layout.
- [ ] **Phase 2: Customer Booking Flow & Pass UI** - 24/7 calendar, 8 PM IST tomorrow rule, station picker, duration selector, and pass view.
- [ ] **Phase 3: Admin Matrix Grid & Counter Walk-In POS** - 24/7 slot grid, Quick Block and Complete walk-in modals, station maintenance toggles.
- [ ] **Phase 4: Database Layer & Atomic Concurrency Stored Procedures** - PostgreSQL DDL, `acquire_slot_lock`, and RLS policies.
- [ ] **Phase 5: Payments, Auth & Serverless API Integrations** - Supabase Auth, Razorpay edge functions, Resend QR emails, and realtime syncing.

## Phase Details

### Phase 1: High-Fidelity Landing Page & Brand Scaffolding
**Goal**: Deliver a visually stunning, responsive landing page reflecting the Oliveal Gaming Zone brand and reference design.
**Depends on**: Nothing (Initial Phase)
**Requirements**: [LAND-01, LAND-02, LAND-03, LAND-04, LAND-05, LAND-06, LAND-07, LAND-08]
**Success Criteria**:
  1. Vite + React + TS + Tailwind development environment configured and builds cleanly without warnings.
  2. Hero section reproduces visual language of reference image (PS5 visual, neon accents, floating game cards).
  3. Stations section accurately presents PS5 (`ALPHA`-`DELTA`) and Simulator (`RS1`, `RS2`) categories with pricing metadata.
  4. Features, How Booking Works, and CTA sections styled with gaming aesthetics and micro-interactions.
  5. Smooth scrolling navigation and mobile responsive menu operational.
  6. Data sourced from central mock data through dedicated service abstraction.
  7. Minimal placeholder `/login` route configured for Auth entry point CTAs.

Plans:
- [ ] 01-01: Scaffolding, Tailwind theme, design tokens, and base router.
- [ ] 01-02: Mock data architecture, TypeScript contracts, and station service layer.
- [ ] 01-03: Navbar and Footer components with mobile responsiveness and smooth scrolling.
- [ ] 01-04: Hero section with dynamic game cards, console visual, and feature badges.
- [ ] 01-05: Stations showcase section with PS5 and Simulator cards and specs.
- [ ] 01-06: Value propositions ("Why Choose Oliveal") and "How Booking Works" 3-step guide.
- [ ] 01-07: Final CTA banner and login placeholder route.
- [ ] 01-08: Cross-browser QA, mobile responsive validation, and production build check.

