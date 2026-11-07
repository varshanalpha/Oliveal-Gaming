---
task: admin-settings-page
type: quick
status: in_progress
created: 2026-11-07
description: Implement the Admin Settings page strictly matching the attached reference image
---

# Quick Task: Admin Settings Page Implementation

## Objective
Implement the dedicated Admin Settings page (`/admin/settings`) for the Oliveal Gaming Zone admin portal, strictly matching the approved reference image (`media_1794028338305_97f22c09.jpg`).

## Scope & Constraints
- Reuse existing Admin layout components (`AdminShell`, `AdminSidebar`, `AdminHeader`).
- Active navigation item on sidebar must be `Settings`.
- Header: Home `/` Settings breadcrumbs, notification bell, admin avatar, name, and profile dropdown.
- Page title: "Settings" with dual-color branding ("Set" in white, "tings" in purple-400), subtitle "Manage your gaming zone preferences.", and upper-right PS5 console + controller visual.
- Strict 2-column card layout (4 cards):
  1. **Gaming Zone Details**: Zone Name (`Oliveal Gaming Zone`), Description (`Premium gaming experience, 24/7`).
  2. **Pricing (Per Hour)**: PS5 1 Player (`₹150`), PS5 2 Players (`₹200`), Racing Simulator 1 Player (`₹200`).
  3. **Operating Hours**: Open Time (`12:00 AM`) -> Close Time (`11:59 PM`).
  4. **Notifications**: Booking Confirmations toggle (ON), System Updates toggle (ON).
- Centered **Save Settings** button with save icon, loading state, neon success toast, and `localStorage` persistence.
- Zero extra tabs or overcomplicated sub-routes.
- Full responsive design (desktop 2-column, tablet/mobile stacked).

## Plan
1. **Types & Service**:
   - Create `src/types/adminSettings.ts`.
   - Create `src/services/adminSettingsService.ts` with local storage persistence and mock defaults matching reference.
2. **Cards Components**:
   - `GamingZoneDetailsCard.tsx`
   - `PricingCard.tsx`
   - `OperatingHoursCard.tsx`
   - `NotificationsCard.tsx`
3. **Page & Route Assembly**:
   - Create `src/pages/admin/AdminSettingsPage.tsx` using `AdminShell`.
   - Register `/admin/settings` route in `src/App.tsx`.
4. **Visual & Interactive Verification**:
   - Test toggle switches, input edits, time selection, and Save action.
   - Run `npm run build` for TypeScript cleanliness.
   - Capture multi-viewport screenshots (1536px, 1024px, 390px) and compare with reference image.
5. **GSD Completion**:
   - Write `SUMMARY.md`.
   - Update `.planning/STATE.md`.
