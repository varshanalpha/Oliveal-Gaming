export interface CustomerProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  initials: string;
  accountStatus: 'Active' | 'Suspended';
  authMethod: 'Email & Password' | 'Google OAuth';
  emailVerified: boolean;
  memberSince: string;
}

export interface CustomerStatistics {
  totalBookings: number;
  completed: number;
  upcoming: number;
  gamingHours: number;
}

export type BookingStatus = 'confirmed' | 'completed' | 'pending' | 'expired';

export interface CustomerBooking {
  id: string;
  bookingCode: string;
  stationId: string;
  stationName: 'ALPHA' | 'BETA' | 'GAMMA' | 'DELTA' | 'RS1' | 'RS2';
  stationType: 'ps5' | 'simulator';
  bookingDate: string;
  startTime: string;
  endTime: string;
  duration: string;
  durationMinutes: 60 | 90 | 120;
  playerCount: number;
  totalAmount: number;
  status: BookingStatus;
  paymentMethod: 'razorpay' | 'cash';
  stationThumb?: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  icon: 'gift' | 'gamepad' | 'calendar';
  date?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'booking' | 'system' | 'offer';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'stations' | 'pricing' | 'policies';
}

export interface SupportTicketInput {
  subject: string;
  category: string;
  description: string;
}

export interface CustomerPreferences {
  displayName: string;
  notifyBookingConfirmation: boolean;
  notifyBookingReminders: boolean;
  notifyAnnouncements: boolean;
}

export interface BookedSlotRange {
  id: string;
  stationName: string;
  startTime: string;
  endTime: string;
  label: string;
  startMinutes: number;
  endMinutes: number;
}

export interface SlotValidationResult {
  isValid: boolean;
  conflictSlot?: BookedSlotRange;
  errorMessage?: string;
}

