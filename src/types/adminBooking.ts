export type AdminStationName = 'ALPHA' | 'BETA' | 'GAMMA' | 'DELTA' | 'RS1' | 'RS2';
export type AdminStationType = 'ps5' | 'simulator';
export type AdminBookingStatus = 'ongoing' | 'upcoming' | 'completed';
export type AdminBookingType = 'online';

export interface AdminBookingCustomer {
  fullName: string;
  initials: string;
  email: string;
  phone: string;
  avatarColor?: string;
}

export interface AdminBooking {
  id: string; // e.g. 'BK-1001'
  bookingCode: string; // e.g. 'OLV-261105-ALPHA'
  customer: AdminBookingCustomer;
  stationName: AdminStationName;
  stationCategory: AdminStationType;
  stationCategoryLabel: 'PS5' | 'Racing';
  bookingDate: string; // 'Nov 05, 2026'
  dateIso: string; // '2026-11-05'
  startTime: string; // '06:00 PM'
  endTime: string; // '07:00 PM'
  timeSlotFormatted: string; // '06:00 PM – 07:00 PM'
  durationMinutes: 60 | 90 | 120;
  durationFormatted: string; // '60 mins', '90 mins', '120 mins'
  playerCount: 1 | 2;
  amount: number; // 150, 300, 200, etc.
  status: AdminBookingStatus;
  bookingType: AdminBookingType;
  paymentGateway: 'Razorpay';
  paymentStatus: 'Paid & Confirmed';
  transactionId: string;
  createdAt: string;
}

export interface AdminBookingStats {
  totalBookings: number;
  completed: number;
  upcoming: number;
  ongoing: number;
}

export interface AdminBookingFiltersState {
  searchQuery: string;
  station: string; // 'all' | AdminStationName
  bookingType: string; // 'all' | 'online'
  status: string; // 'all' | AdminBookingStatus
  dateRange: 'last7' | 'today' | 'last30' | 'all';
}

export interface AdminBookingsPaginatedResult {
  bookings: AdminBooking[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  startIndex: number;
  endIndex: number;
}
