import {
  CustomerProfile,
  CustomerStatistics,
  CustomerBooking,
  Announcement,
  NotificationItem,
  FAQItem,
  CustomerPreferences,
} from '../types/customer';

export const MOCK_CUSTOMER_PROFILE: CustomerProfile = {
  id: 'usr-varshan-01',
  fullName: 'R Varshan',
  email: 'varshan@gmail.com',
  phone: '+91 98765 43210',
  initials: 'RV',
  avatarUrl: undefined,
  accountStatus: 'Active',
  authMethod: 'Email & Password',
  emailVerified: true,
  memberSince: 'September 2026',
};

export const MOCK_CUSTOMER_STATS: CustomerStatistics = {
  totalBookings: 12,
  completed: 9,
  upcoming: 2,
  gamingHours: 36,
};

export const MOCK_UPCOMING_BOOKING: CustomerBooking = {
  id: 'bk-next-01',
  bookingCode: 'OLV-261105-BETA',
  stationId: 'st-beta',
  stationName: 'BETA',
  stationType: 'ps5',
  bookingDate: 'Nov 05, 2026',
  startTime: '6:00 PM',
  endTime: '7:00 PM',
  duration: '1 Hour',
  durationMinutes: 60,
  playerCount: 1,
  totalAmount: 150,
  status: 'confirmed',
  paymentMethod: 'razorpay',
  stationThumb: '/assets/station-ps5-thumb.png',
};

export const MOCK_CUSTOMER_BOOKINGS: CustomerBooking[] = [
  MOCK_UPCOMING_BOOKING,
  {
    id: 'bk-up-02',
    bookingCode: 'OLV-261106-GAM',
    stationId: 'st-gamma',
    stationName: 'GAMMA',
    stationType: 'ps5',
    bookingDate: 'Nov 06, 2026',
    startTime: '8:00 PM',
    endTime: '9:00 PM',
    duration: '1 Hour',
    durationMinutes: 60,
    playerCount: 2,
    totalAmount: 200,
    status: 'confirmed',
    paymentMethod: 'razorpay',
    stationThumb: '/assets/station-ps5-thumb.png',
  },
  {
    id: 'bk-rec-01',
    bookingCode: 'OLV-261102-ALP',
    stationId: 'st-alpha',
    stationName: 'ALPHA',
    stationType: 'ps5',
    bookingDate: 'Nov 02, 2026',
    startTime: '6:00 PM',
    endTime: '7:00 PM',
    duration: '1 Hour',
    durationMinutes: 60,
    playerCount: 1,
    totalAmount: 150,
    status: 'completed',
    paymentMethod: 'razorpay',
    stationThumb: '/assets/station-ps5-thumb.png',
  },
  {
    id: 'bk-rec-02',
    bookingCode: 'OLV-261028-RS1',
    stationId: 'st-rs1',
    stationName: 'RS1',
    stationType: 'simulator',
    bookingDate: 'Oct 28, 2026',
    startTime: '4:00 PM',
    endTime: '6:00 PM',
    duration: '2 Hours',
    durationMinutes: 120,
    playerCount: 1,
    totalAmount: 400,
    status: 'completed',
    paymentMethod: 'razorpay',
    stationThumb: '/assets/station-rs1-thumb.png',
  },
  {
    id: 'bk-rec-03',
    bookingCode: 'OLV-261020-DEL',
    stationId: 'st-delta',
    stationName: 'DELTA',
    stationType: 'ps5',
    bookingDate: 'Oct 20, 2026',
    startTime: '7:00 PM',
    endTime: '8:00 PM',
    duration: '1 Hour',
    durationMinutes: 60,
    playerCount: 1,
    totalAmount: 150,
    status: 'completed',
    paymentMethod: 'cash',
    stationThumb: '/assets/station-ps5-thumb.png',
  },
  {
    id: 'bk-past-04',
    bookingCode: 'OLV-261015-RS2',
    stationId: 'st-rs2',
    stationName: 'RS2',
    stationType: 'simulator',
    bookingDate: 'Oct 15, 2026',
    startTime: '5:00 PM',
    endTime: '7:00 PM',
    duration: '2 Hours',
    durationMinutes: 120,
    playerCount: 1,
    totalAmount: 400,
    status: 'completed',
    paymentMethod: 'razorpay',
    stationThumb: '/assets/station-rs2-thumb.png',
  },
  {
    id: 'bk-past-05',
    bookingCode: 'OLV-261010-BET',
    stationId: 'st-beta',
    stationName: 'BETA',
    stationType: 'ps5',
    bookingDate: 'Oct 10, 2026',
    startTime: '3:30 PM',
    endTime: '5:00 PM',
    duration: '90 Mins',
    durationMinutes: 90,
    playerCount: 2,
    totalAmount: 300,
    status: 'completed',
    paymentMethod: 'razorpay',
    stationThumb: '/assets/station-ps5-thumb.png',
  },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Weekend Gaming Offer!',
    description: 'Get 10% off on 2+ hour slots.',
    icon: 'gift',
  },
  {
    id: 'ann-2',
    title: 'New Racing Simulator RS2',
    description: 'Now available for booking!',
    icon: 'gamepad',
  },
  {
    id: 'ann-3',
    title: 'Extended Weekend Hours',
    description: 'Open till 12:00 AM (Fri - Sun).',
    icon: 'calendar',
  },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Booking Confirmed!',
    message: 'Your slot for PS5 Station BETA on Nov 05, 2026 at 6:00 PM is confirmed.',
    timestamp: '10 mins ago',
    isRead: false,
    type: 'booking',
  },
  {
    id: 'notif-2',
    title: 'Session Reminder',
    message: 'Your upcoming session starts tomorrow at 6:00 PM. Please arrive 5 minutes early with your QR code pass.',
    timestamp: '2 hours ago',
    isRead: false,
    type: 'booking',
  },
  {
    id: 'notif-3',
    title: 'Racing Simulator RS2 Launched',
    message: 'Experience the new ultra-wide dual QHD cockpit with direct-drive 8Nm force feedback.',
    timestamp: '1 day ago',
    isRead: true,
    type: 'offer',
  },
];

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I book a gaming slot at Oliveal Gaming Zone?',
    answer:
      'Navigate to Book Slot, choose your desired PlayStation 5 or Racing Simulator, select your preferred 60, 90, or 120-minute session, and complete instant checkout via UPI/Cards. You will immediately receive a digital QR pass.',
    category: 'booking',
  },
  {
    id: 'faq-2',
    question: 'When do tomorrow’s slots unlock?',
    answer:
      'Per our business rules, tomorrow’s complete schedule unlocks every evening at exactly 8:00 PM (20:00) IST (Asia/Kolkata). Today’s slots are bookable anytime up to the current hour.',
    category: 'booking',
  },
  {
    id: 'faq-3',
    question: 'Can I cancel or reschedule a confirmed booking?',
    answer:
      'No. Oliveal Gaming Zone maintains a strict NO CANCELLATION and NO REFUND policy across all confirmed online and walk-in reservations. All sales are final.',
    category: 'policies',
  },
  {
    id: 'faq-4',
    question: 'What are the hourly rates for PS5 and Racing Simulators?',
    answer:
      'For PlayStation 5 stations (ALPHA, BETA, GAMMA, DELTA): 1 Player is ₹150/hr, 2 Players is ₹200/hr. For Racing Simulators (RS1, RS2): Single cockpit driver is ₹200/hr. Durations of 60m, 90m, and 120m are available.',
    category: 'pricing',
  },
  {
    id: 'faq-5',
    question: 'How does counter check-in work upon arrival?',
    answer:
      'Simply present the digital QR code from your booking pass or confirmation email to the front-desk operations lead. The admin will scan the code to verify your reservation and activate your gaming station.',
    category: 'stations',
  },
  {
    id: 'faq-6',
    question: 'How does the 5-minute checkout lock work?',
    answer:
      'When you proceed to checkout, an atomic database lock holds your selected station and time slot for 5 minutes. If checkout is completed, the slot is confirmed. If abandoned or failed, the lock expires automatically and returns to the pool.',
    category: 'booking',
  },
];

export const MOCK_PREFERENCES: CustomerPreferences = {
  displayName: 'Varshan',
  notifyBookingConfirmation: true,
  notifyBookingReminders: true,
  notifyAnnouncements: true,
};

import { BookedSlotRange } from '../types/customer';

export const MOCK_STATION_BOOKED_SLOTS: Record<string, BookedSlotRange[]> = {
  ALPHA: [
    {
      id: 'bs-alpha-1',
      stationName: 'ALPHA',
      startTime: '07:00 PM',
      endTime: '08:00 PM',
      label: '07:00 PM – 08:00 PM',
      startMinutes: 19 * 60, // 1140
      endMinutes: 20 * 60,   // 1200
    },
    {
      id: 'bs-alpha-2',
      stationName: 'ALPHA',
      startTime: '11:00 PM',
      endTime: '12:00 AM',
      label: '11:00 PM – 12:00 AM',
      startMinutes: 23 * 60, // 1380
      endMinutes: 24 * 60,   // 1440
    },
  ],
  BETA: [
    {
      id: 'bs-beta-1',
      stationName: 'BETA',
      startTime: '06:00 PM',
      endTime: '07:00 PM',
      label: '06:00 PM – 07:00 PM',
      startMinutes: 18 * 60,
      endMinutes: 19 * 60,
    },
    {
      id: 'bs-beta-2',
      stationName: 'BETA',
      startTime: '09:30 PM',
      endTime: '11:00 PM',
      label: '09:30 PM – 11:00 PM',
      startMinutes: 21 * 60 + 30,
      endMinutes: 23 * 60,
    },
  ],
  GAMMA: [
    {
      id: 'bs-gamma-1',
      stationName: 'GAMMA',
      startTime: '08:00 PM',
      endTime: '09:00 PM',
      label: '08:00 PM – 09:00 PM',
      startMinutes: 20 * 60,
      endMinutes: 21 * 60,
    },
  ],
  DELTA: [
    {
      id: 'bs-delta-1',
      stationName: 'DELTA',
      startTime: '04:00 PM',
      endTime: '05:30 PM',
      label: '04:00 PM – 05:30 PM',
      startMinutes: 16 * 60,
      endMinutes: 17 * 60 + 30,
    },
    {
      id: 'bs-delta-2',
      stationName: 'DELTA',
      startTime: '07:00 PM',
      endTime: '08:00 PM',
      label: '07:00 PM – 08:00 PM',
      startMinutes: 19 * 60,
      endMinutes: 20 * 60,
    },
  ],
  RS1: [
    {
      id: 'bs-rs1-1',
      stationName: 'RS1',
      startTime: '05:00 PM',
      endTime: '07:00 PM',
      label: '05:00 PM – 07:00 PM',
      startMinutes: 17 * 60,
      endMinutes: 19 * 60,
    },
    {
      id: 'bs-rs1-2',
      stationName: 'RS1',
      startTime: '09:00 PM',
      endTime: '10:30 PM',
      label: '09:00 PM – 10:30 PM',
      startMinutes: 21 * 60,
      endMinutes: 22 * 60 + 30,
    },
  ],
  RS2: [
    {
      id: 'bs-rs2-1',
      stationName: 'RS2',
      startTime: '06:30 PM',
      endTime: '08:00 PM',
      label: '06:30 PM – 08:00 PM',
      startMinutes: 18 * 60 + 30,
      endMinutes: 20 * 60,
    },
  ],
};

