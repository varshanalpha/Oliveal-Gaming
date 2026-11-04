import React, { useState, useEffect, useCallback } from 'react';
import { AdminShell } from '../../components/admin/layout/AdminShell';
import { BookingStats } from '../../components/admin/bookings/BookingStats';
import { BookingFilters } from '../../components/admin/bookings/BookingFilters';
import { BookingTable } from '../../components/admin/bookings/BookingTable';
import { BookingPagination } from '../../components/admin/bookings/BookingPagination';
import { BookingDetailsModal } from '../../components/admin/bookings/BookingDetailsModal';
import { adminBookingService } from '../../services/adminBookingService';
import {
  AdminBooking,
  AdminBookingStats,
  AdminBookingFiltersState,
  AdminBookingsPaginatedResult,
} from '../../types/adminBooking';
import { MOCK_ADMIN_BOOKINGS } from '../../mock-data/admin-bookings';

import headerPs5Img from '../../assets/dashboard/bookslot-header-ps5.png';

export const AdminBookingsPage: React.FC = () => {
  // Statistics State
  const [stats, setStats] = useState<AdminBookingStats>({
    totalBookings: 128,
    completed: 102,
    upcoming: 16,
    ongoing: 10,
  });

  // Filters State
  const [filters, setFilters] = useState<AdminBookingFiltersState>({
    searchQuery: '',
    station: 'all',
    bookingType: 'all',
    status: 'all',
    dateRange: 'last7',
  });

  // Pagination State (Direct initial state matching reference image: 128 bookings, 8 per page)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedData, setPaginatedData] = useState<AdminBookingsPaginatedResult>(() => {
    const initial = adminBookingService.filterBookings(MOCK_ADMIN_BOOKINGS, {
      searchQuery: '',
      station: 'all',
      bookingType: 'all',
      status: 'all',
      dateRange: 'last7',
    });
    return {
      bookings: initial.slice(0, 8),
      totalCount: initial.length,
      totalPages: Math.max(1, Math.ceil(initial.length / 8)),
      currentPage: 1,
      pageSize: 8,
      startIndex: 1,
      endIndex: Math.min(8, initial.length),
    };
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);

  // Load centralized statistics
  useEffect(() => {
    adminBookingService.getBookingStatistics().then(setStats);
  }, []);

  // Load paginated bookings based on filters and current page
  const fetchBookings = useCallback(async (activeFilters: AdminBookingFiltersState, page: number) => {
    setLoading(true);
    const result = await adminBookingService.getBookingsPaginated(activeFilters, page, 8);
    setPaginatedData(result);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBookings(filters, currentPage);
  }, [filters, currentPage, fetchBookings]);

  // Handle filter change (resets to page 1)
  const handleFilterChange = (newFilters: AdminBookingFiltersState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Reset filters
  const handleResetFilters = () => {
    const defaultFilters: AdminBookingFiltersState = {
      searchQuery: '',
      station: 'all',
      bookingType: 'all',
      status: 'all',
      dateRange: 'all',
    };
    setFilters(defaultFilters);
    setCurrentPage(1);
  };

  return (
    <AdminShell pageTitle="Bookings">
      <div className="space-y-3 sm:space-y-3.5 w-full max-w-7xl mx-auto pb-4">
        
        {/* ======================================================== */}
        {/* PAGE HEADER: TITLE + DESCRIPTION + PS5 LASER RIGS VISUAL */}
        {/* ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative">
          <div className="space-y-1 max-w-xl">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold font-display text-white tracking-tight leading-tight">
              Bookings
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 font-sans">
              View and manage all gaming slot bookings made by customers.
            </p>
          </div>

          {/* Right Header Visual: PS5 Console + Controller with Purple Neon Glow */}
          <div className="hidden lg:flex items-center justify-end shrink-0">
            <img
              src={headerPs5Img}
              alt="PlayStation 5 Console & Controller"
              className="w-48 lg:w-52 h-auto object-contain filter drop-shadow-[0_0_25px_rgba(168,85,247,0.45)]"
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOOKING STATISTICS (Total Bookings, Completed, Upcoming)  */}
        {/* ======================================================== */}
        <BookingStats stats={stats} />

        {/* ======================================================== */}
        {/* SEARCH AND FILTER TOOLBAR (5 Controls)                   */}
        {/* ======================================================== */}
        <BookingFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* ======================================================== */}
        {/* BOOKINGS DATA TABLE (10 Columns matching reference image) */}
        {/* ======================================================== */}
        <BookingTable
          bookings={paginatedData.bookings}
          startIndex={paginatedData.startIndex}
          loading={loading}
          onViewDetails={(booking) => setSelectedBooking(booking)}
          onResetFilters={handleResetFilters}
        />

        {/* ======================================================== */}
        {/* PAGINATION CONTROLS (Showing 1–8 of 128 bookings)        */}
        {/* ======================================================== */}
        <BookingPagination
          currentPage={paginatedData.currentPage}
          totalPages={paginatedData.totalPages}
          totalCount={paginatedData.totalCount}
          startIndex={paginatedData.startIndex}
          endIndex={paginatedData.endIndex}
          onPageChange={(page) => setCurrentPage(page)}
        />

        {/* ======================================================== */}
        {/* BOOKING DETAILS MODAL                                    */}
        {/* ======================================================== */}
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />

      </div>
    </AdminShell>
  );
};
