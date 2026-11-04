import {
  AdminBooking,
  AdminBookingStats,
  AdminBookingFiltersState,
  AdminBookingsPaginatedResult,
} from '../types/adminBooking';
import { MOCK_ADMIN_BOOKINGS } from '../mock-data/admin-bookings';

class AdminBookingService {
  private bookings: AdminBooking[] = [...MOCK_ADMIN_BOOKINGS];

  // Get all bookings
  async getAdminBookings(): Promise<AdminBooking[]> {
    return Promise.resolve([...this.bookings]);
  }

  // Get centralized statistics
  async getBookingStatistics(): Promise<AdminBookingStats> {
    const totalBookings = this.bookings.length;
    const completed = this.bookings.filter((b) => b.status === 'completed').length;
    const upcoming = this.bookings.filter((b) => b.status === 'upcoming').length;
    const ongoing = this.bookings.filter((b) => b.status === 'ongoing').length;

    return {
      totalBookings,
      completed,
      upcoming,
      ongoing,
    };
  }

  // Filter bookings with search, station, type, status, and date range
  filterBookings(
    bookings: AdminBooking[],
    filters: AdminBookingFiltersState
  ): AdminBooking[] {
    return bookings.filter((b) => {
      // 1. Search Query (Customer name, Booking ID, Station name)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesCustomer = b.customer.fullName.toLowerCase().includes(query);
        const matchesId = b.id.toLowerCase().includes(query);
        const matchesStation = b.stationName.toLowerCase().includes(query);
        if (!matchesCustomer && !matchesId && !matchesStation) {
          return false;
        }
      }

      // 2. Station Filter
      if (filters.station !== 'all' && b.stationName !== filters.station) {
        return false;
      }

      // 3. Booking Type Filter (Online Bookings only)
      if (filters.bookingType !== 'all' && b.bookingType !== filters.bookingType) {
        return false;
      }

      // 4. Status Filter
      if (filters.status !== 'all' && b.status !== filters.status) {
        return false;
      }

      // 5. Date Filter (Asia/Kolkata reference: Nov 05, 2026 is Today)
      if (filters.dateRange === 'today') {
        if (b.dateIso !== '2026-11-05') return false;
      } else if (filters.dateRange === 'last7') {
        // Last 7 days: 2026-10-30 to 2026-11-06
        if (b.dateIso < '2026-10-30') return false;
      } else if (filters.dateRange === 'last30') {
        // Last 30 days: 2026-10-06 to 2026-11-06
        if (b.dateIso < '2026-10-06') return false;
      }
      // 'all' includes all dates

      return true;
    });
  }

  // Paginated bookings
  async getBookingsPaginated(
    filters: AdminBookingFiltersState,
    page: number = 1,
    pageSize: number = 8
  ): Promise<AdminBookingsPaginatedResult> {
    const all = await this.getAdminBookings();
    const filtered = this.filterBookings(all, filters);

    const totalCount = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);

    const startIndex = (safePage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalCount);
    const paginatedBookings = filtered.slice(startIndex, endIndex);

    return {
      bookings: paginatedBookings,
      totalCount,
      totalPages,
      currentPage: safePage,
      pageSize,
      startIndex: totalCount === 0 ? 0 : startIndex + 1,
      endIndex,
    };
  }

  // Get single booking by ID
  async getBookingById(id: string): Promise<AdminBooking | null> {
    const booking = this.bookings.find((b) => b.id === id);
    return booking ? { ...booking } : null;
  }
}

export const adminBookingService = new AdminBookingService();
