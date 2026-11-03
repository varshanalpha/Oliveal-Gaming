# Oliveal Gaming Zone — Platform Project Specification

## What This Is
Oliveal Gaming Zone is a 24/7 gaming lounge slot reservation platform. It allows gamers to reserve dedicated PlayStation 5 stations (`ALPHA`, `BETA`, `GAMMA`, `DELTA`) and Racing Simulators (`RS1`, `RS2`) for 60 to 120-minute sessions with dynamic player pricing, 5-minute atomic slot locking, Razorpay online payments, and instant QR pass generation. It also provides a 24/7 Admin operations matrix for counter walk-ins and QR check-ins.

## Core Value
Frictionless 24/7 gaming rig reservations with zero double-booking and instant online/counter slot synchronization.

## Business Context
- **Customer**: Console gamers, racing simulation enthusiasts, esports casuals, and walk-in groups.
- **Revenue Model**: Hourly slot fees (PS5 ₹150–₹200/hr based on players; Simulators ₹200/hr).
- **Success Metric**: Slot utilization rate, zero double-booking occurrences, counter check-in speed.

## Current Milestone Scope: Phase 1 — Landing Page Development
Exclusively develop the public-facing landing page with high-fidelity visual design, responsive layout, smooth navigation, centralized mock data & services, and route placeholders.

### Active Requirements (Landing Page)
- [ ] Setup Vite + React + TypeScript + Tailwind CSS + Lucide React + React Router.
- [ ] Implement design tokens & themes (Deep black/dark navy background, neon purple & violet accents).
- [ ] Reusable Layout Components: Premium Navigation bar (desktop & mobile menu) and Footer.
- [ ] Hero Section with game cards, console visual, headline, CTAs, and feature badges matching design reference.
- [ ] Gaming Stations Section showcasing 4x PS5s (`ALPHA`, `BETA`, `GAMMA`, `DELTA`) and 2x Simulators (`RS1`, `RS2`).
- [ ] "Why Choose Oliveal" Value Proposition Section.
- [ ] "How Booking Works" 3-Step Interactive Process Section.
- [ ] Final CTA Banner & Footer with navigation anchors.
- [ ] Centralized mock data & service layer (abstracted data fetching).
- [ ] Route placeholder for `/login` (auth entry point).
- [ ] Build & typecheck verification (0 errors, 100% responsive).

### Out of Scope (Future Phases)
- Customer login/signup UI, Supabase Auth, Google OAuth.
- Customer booking calendar, time slot picker, slot lock countdown.
- Razorpay checkout integration and webhooks.
- Admin dashboard, matrix schedule grid, walk-in modals.
- QR scanner and counter check-in.
- Database tables, migrations, and backend APIs.

