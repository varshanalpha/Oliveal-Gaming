import React, { useState, useEffect } from 'react';
import { AdminShell } from '../../components/admin/layout/AdminShell';
import { CreateWalkInBookingForm } from '../../components/admin/on-spot/CreateWalkInBookingForm';
import { TodaysWalkInTable } from '../../components/admin/on-spot/TodaysWalkInTable';
import { walkInBookingService } from '../../services/walkInBookingService';
import { WalkInBooking } from '../../types/walkInBooking';

import headerPs5Img from '../../assets/dashboard/bookslot-header-ps5.png';

export const AdminOnSpotBookingPage: React.FC = () => {
  // Synchronous initial state to avoid any layout-shift or loading spinner flash
  const [todaysBookings, setTodaysBookings] = useState<WalkInBooking[]>(() =>
    walkInBookingService.getTodaysWalkInBookingsSync()
  );

  // Refresh bookings on mount
  useEffect(() => {
    walkInBookingService.getTodaysWalkInBookings().then(setTodaysBookings);
  }, []);

  const handleBookingCreated = (newBooking: WalkInBooking) => {
    // Add to list and ensure sorted/updated view
    setTodaysBookings((prev) => [...prev, newBooking]);
  };

  return (
    <AdminShell pageTitle="On Spot Booking">
      <div className="space-y-2.5 sm:space-y-3.5 w-full max-w-7xl mx-auto pb-2 sm:pb-3">
        
        {/* ======================================================== */}
        {/* PAGE HEADER: TITLE + DESCRIPTION + PS5 LASER RIGS VISUAL */}
        {/* ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 relative">
          <div className="space-y-0.5 max-w-xl">
            <h1 className="text-2xl sm:text-3xl lg:text-[30px] font-extrabold font-display tracking-tight leading-tight text-white">
              On Spot <span className="text-purple-400">Booking</span>
            </h1>
            <p className="text-xs sm:text-[13px] text-zinc-300 font-sans">
              Create and manage walk-in bookings for customers at the gaming zone.
            </p>
          </div>

          {/* Right Header Visual: PS5 Console + Controller with Purple Neon Glow */}
          <div className="hidden lg:flex items-center justify-end shrink-0">
            <div className="relative w-44 h-16 flex items-center justify-center">
              <div className="absolute inset-0 bg-purple-600/20 blur-xl rounded-full" />
              <img
                src={headerPs5Img}
                alt="PS5 Gaming Setup"
                className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN TWO-COLUMN CONTENT LAYOUT */}
        {/* Left: Create Walk-in Booking Form */}
        {/* Right: Todays On Spot Bookings Table */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
          
          {/* Left Column: Create Walk-in Booking Form */}
          <div className="xl:col-span-7">
            <CreateWalkInBookingForm onBookingCreated={handleBookingCreated} />
          </div>

          {/* Right Column: Today's On Spot Bookings Table */}
          <div className="xl:col-span-5">
            <TodaysWalkInTable bookings={todaysBookings} />
          </div>

        </div>

      </div>
    </AdminShell>
  );
};

export default AdminOnSpotBookingPage;
