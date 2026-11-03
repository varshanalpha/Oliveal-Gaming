import { BookingStep } from '../types';

export const MOCK_BOOKING_STEPS: BookingStep[] = [
  {
    step: 1,
    title: 'Choose Your Gaming Station',
    tagline: 'PS5s or Racing Cockpits',
    description:
      'Select from 4 competitive PlayStation 5 rigs (ALPHA, BETA, GAMMA, DELTA) for solo/multiplayer action, or 2 direct-drive Racing Simulators (RS1, RS2) for track supremacy.',
    badgeText: 'Step 01',
    highlight: '6 Dedicated Rigs Available',
  },
  {
    step: 2,
    title: 'Select Your Preferred Time Slot',
    tagline: 'Flexible 60 to 120 Min Sessions',
    description:
      'Pick any start time on 30-minute intervals. Reserve today’s remaining slots anytime, or book tomorrow’s complete schedule right when it unlocks at 8:00 PM IST daily.',
    badgeText: 'Step 02',
    highlight: 'Tomorrow Unlocks @ 8 PM IST',
  },
  {
    step: 3,
    title: 'Confirm Your Booking and Play',
    tagline: 'Atomic Hold & Instant QR Ticket',
    description:
      'Lock your slot for 5 minutes during checkout, complete payment via UPI or Cards, and get your digital QR ticket immediately to scan at the counter on arrival.',
    badgeText: 'Step 03',
    highlight: 'Instant Counter QR Entry',
  },
];

