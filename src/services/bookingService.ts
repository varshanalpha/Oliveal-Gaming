import { CustomerBooking } from '../types/customer';
import { MOCK_CUSTOMER_BOOKINGS, MOCK_UPCOMING_BOOKING } from '../mock-data/customer';

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

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
};

