import { CustomerBooking, BookedSlotRange, SlotValidationResult } from '../types/customer';
import {
  MOCK_CUSTOMER_BOOKINGS,
  MOCK_UPCOMING_BOOKING,
  MOCK_STATION_BOOKED_SLOTS,
} from '../mock-data/customer';

const delay = (ms = 80) => new Promise((resolve) => setTimeout(resolve, ms));

export const timeStringToMinutes = (timeStr: string): number => {
  // Expected formats: "09:00 PM", "9:00 PM"
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

export const minutesToTimeString = (totalMinutes: number): string => {
  const normalized = ((totalMinutes % (24 * 60)) + (24 * 60)) % (24 * 60);
  const rawHours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  const period = rawHours >= 12 ? 'PM' : 'AM';
  const hours12 = rawHours % 12 || 12;

  return `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
};

export const bookingService = {
  async getCustomerBookings(filter: 'all' | 'upcoming' | 'completed' = 'all'): Promise<CustomerBooking[]> {
    await delay();
    if (filter === 'upcoming') {
      return MOCK_CUSTOMER_BOOKINGS.filter((b) => b.status === 'confirmed');
    }
    if (filter === 'completed') {
      return MOCK_CUSTOMER_BOOKINGS.filter((b) => b.status === 'completed');
    }
    return [...MOCK_CUSTOMER_BOOKINGS];
  },

  async getUpcomingBooking(): Promise<CustomerBooking | null> {
    await delay();
    return { ...MOCK_UPCOMING_BOOKING };
  },

  async getRecentBookings(limit = 3): Promise<CustomerBooking[]> {
    await delay();
    const completed = MOCK_CUSTOMER_BOOKINGS.filter((b) => b.status === 'completed');
    return completed.slice(0, limit);
  },

  async getBookingById(id: string): Promise<CustomerBooking | null> {
    await delay();
    const found = MOCK_CUSTOMER_BOOKINGS.find((b) => b.id === id || b.bookingCode === id);
    return found ? { ...found } : null;
  },

  async getBookedSlots(stationName: string): Promise<BookedSlotRange[]> {
    await delay();
    return MOCK_STATION_BOOKED_SLOTS[stationName] || [];
  },

  calculateBookingEndTime(startTimeString: string, durationMinutes: number): string {
    const startMinutes = timeStringToMinutes(startTimeString);
    const endMinutes = startMinutes + durationMinutes;
    return minutesToTimeString(endMinutes);
  },

  calculateBookingPrice(
    category: 'ps5' | 'simulator',
    durationMinutes: number,
    playerCount: number
  ): number {
    const hourlyRate =
      category === 'ps5'
        ? playerCount === 2
          ? 200
          : 150
        : 200;

    return Math.round((hourlyRate * durationMinutes) / 60);
  },

  async validateBookingSlot(
    stationName: string,
    startTimeString: string,
    durationMinutes: number
  ): Promise<SlotValidationResult> {
    await delay();
    const booked = MOCK_STATION_BOOKED_SLOTS[stationName] || [];
    const requestedStart = timeStringToMinutes(startTimeString);
    const requestedEnd = requestedStart + durationMinutes;

    for (const slot of booked) {
      // Overlap condition: start < otherEnd && end > otherStart
      if (requestedStart < slot.endMinutes && requestedEnd > slot.startMinutes) {
        return {
          isValid: false,
          conflictSlot: slot,
          errorMessage: `Selected time slot overlaps an existing booking: ${slot.label}.`,
        };
      }
    }

    return { isValid: true };
  },

  async createMockBooking(bookingData: Partial<CustomerBooking>): Promise<CustomerBooking> {
    await delay();
    const newBooking: CustomerBooking = {
      id: `bk-${Date.now()}`,
      bookingCode: `OLV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${bookingData.stationName || 'ALPHA'}`,
      stationId: `st-${bookingData.stationName?.toLowerCase() || 'alpha'}`,
      stationName: (bookingData.stationName as any) || 'ALPHA',
      stationType: bookingData.stationType || 'ps5',
      bookingDate: bookingData.bookingDate || 'Today, Nov 04, 2026',
      startTime: bookingData.startTime || '09:00 PM',
      endTime: bookingData.endTime || '10:00 PM',
      duration: bookingData.duration || `${bookingData.durationMinutes || 60} Minutes`,
      durationMinutes: bookingData.durationMinutes || 60,
      playerCount: bookingData.playerCount || 1,
      totalAmount: bookingData.totalAmount || 150,
      status: 'confirmed',
      paymentMethod: 'razorpay',
      stationThumb: bookingData.stationThumb,
    };

    MOCK_CUSTOMER_BOOKINGS.unshift(newBooking);
    return newBooking;
  },
};

