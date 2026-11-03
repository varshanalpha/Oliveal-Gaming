# Roadmap: Oliveal Gaming Zone

## Overview
Progressive sequential build journey: starting with high-fidelity Landing Page frontend, moving to Authentication Pages, Customer Dashboard experience, customer booking engine, admin matrix operations UI, followed by PostgreSQL database layer and serverless backend API integrations.

## Phases
- [x] **Phase 1: High-Fidelity Landing Page & Brand Scaffolding** - Vite + React + TS setup, dark gaming UI theme, navigation, hero, stations, features, booking steps, and responsive layout. (COMPLETED)
- [x] **Phase 2: Authentication Pages & Mock Flow** - Customer Login, Customer Signup, Email OTP Verification, and dedicated Admin Login strictly adhering to reference image design. (COMPLETED)
- [x] **Phase 3: Customer Dashboard Experience & Account Hub** - 3-column dashboard shell, Dashboard Home reproducing reference design, Book Slot entry, My Bookings history, Profile editing, Settings, Help & Support, Notifications center, and centralized mock data services. (COMPLETED)
- [ ] **Phase 4: Customer Booking Engine & Slot Lock Flow** - 24/7 calendar, 8 PM IST tomorrow unlock rule, atomic 5-min checkout countdown, dynamic pricing calculation, and QR pass generation.
- [ ] **Phase 5: Admin Matrix Grid & Counter Walk-In POS** - 24/7 slot grid across 6 stations, Quick Block and Complete walk-in modals, station maintenance toggles, and counter QR scanner.
- [ ] **Phase 6: Database Layer & Atomic Concurrency Stored Procedures** - PostgreSQL DDL (`profiles`, `stations`, `bookings`, `slot_locks`), `acquire_slot_lock`, and RLS security policies.
- [ ] **Phase 7: Backend API Integrations & Services** - Supabase Auth, Razorpay edge functions, Resend QR emails, and realtime subscriptions.

## Phase Details

### Phase 3: Customer Dashboard Experience & Account Hub
**Goal**: Deliver the full Customer Dashboard experience strictly matching the uploaded reference image, complete with 3-area layout (Sidebar, Main Content, Right Information Panel), 6 navigation pages, and decoupled mock services.
**Depends on**: Phase 2
**Requirements**: [CUST-01, CUST-02, CUST-03, CUST-04, CUST-05, CUST-06, CUST-07, CUST-08]
**Success Criteria**:
  1. Professional 3-area application shell: Left Sidebar (Logo, 6 navigation items with active purple highlight, bottom controller graphic), Main Content area, Right Information Panel (Your Next Booking, Your Profile, Announcements).
  2. Customer Dashboard Home (`/customer/dashboard`) exactly reproducing the reference design: Welcome header with user name, Hero Booking Banner with gaming rigs visual, 4 statistic cards (Total Bookings, Completed, Upcoming, Gaming Hours), "Our Gaming Stations" 6-card row, and "Recent Bookings" structured table with View Details modal.
  3. Book Slot Entry Page (`/customer/book-slot`) introducing station categories (PS5 ALPHA-DELTA, Simulator RS1-RS2) and pricing specifications.
  4. My Bookings Page (`/customer/bookings`) with status filter tabs (All, Upcoming, Completed) and booking detail modal. Customers strictly cannot cancel confirmed bookings.
  5. Profile Page (`/customer/profile`) with personal info editing, account status, and validation feedback.
  6. Settings Page (`/customer/settings`) with preferences, notification toggles, change password simulation, and logout confirmation.
  7. Help & Support Page (`/customer/support`) with searchable FAQ accordion and mock contact support ticket submission.
  8. Header Notification Center with unread indicator badge, dropdown list, mark as read, and profile menu with functional logout.
  9. Centralized mock data & services architecture (`customerService`, `bookingService`, `announcementService`, `notificationService`, `supportService`).

Plans:
- [x] 03-01: Types, contracts, and Mock Data & Service architecture (`src/types/customer.ts`, `src/services/`).
- [x] 03-02: Customer Dashboard Shell, Sidebar navigation, Header, and Notification Center.
- [x] 03-03: Customer Dashboard Home Page (`/customer/dashboard`) strictly matching reference design.
- [x] 03-04: Book Slot Entry Point Page (`/customer/book-slot`).
- [x] 03-05: My Bookings Page (`/customer/bookings`) with tabs and booking details modal.
- [x] 03-06: Profile Page (`/customer/profile`) and Settings Page (`/customer/settings`).
- [x] 03-07: Help & Support Page (`/customer/support`) with searchable FAQs.
- [x] 03-08: Cross-browser QA, mobile/tablet responsive testing, and production build check.
