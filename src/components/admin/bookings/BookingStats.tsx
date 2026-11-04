import React from 'react';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';
import { AdminBookingStats } from '../../../types/adminBooking';

interface BookingStatsProps {
  stats: AdminBookingStats;
  loading?: boolean;
}

export const BookingStats: React.FC<BookingStatsProps> = ({ stats, loading = false }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full">
      
      {/* Card 1: Total Bookings */}
      <div className="rounded-2xl p-3.5 sm:p-4 bg-[#100b1c] border border-purple-500/20 flex items-center gap-3.5 transition-all duration-200 hover:border-purple-500/40 shadow-sm">
        <div className="w-11 h-11 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <Calendar className="w-5.5 h-5.5" />
        </div>
        <div>
          <span className="text-xs sm:text-sm font-medium text-zinc-400 block font-sans">
            Total Bookings
          </span>
          <span className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-none mt-1 block">
            {loading ? '...' : stats.totalBookings}
          </span>
        </div>
      </div>

      {/* Card 2: Completed */}
      <div className="rounded-2xl p-3.5 sm:p-4 bg-[#100b1c] border border-purple-500/20 flex items-center gap-3.5 transition-all duration-200 hover:border-emerald-500/40 shadow-sm">
        <div className="w-11 h-11 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <CheckCircle2 className="w-5.5 h-5.5" />
        </div>
        <div>
          <span className="text-xs sm:text-sm font-medium text-zinc-400 block font-sans">
            Completed
          </span>
          <span className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-none mt-1 block">
            {loading ? '...' : stats.completed}
          </span>
        </div>
      </div>

      {/* Card 3: Upcoming */}
      <div className="rounded-2xl p-3.5 sm:p-4 bg-[#100b1c] border border-purple-500/20 flex items-center gap-3.5 transition-all duration-200 hover:border-purple-500/40 shadow-sm">
        <div className="w-11 h-11 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.35)]">
          <Clock className="w-5.5 h-5.5" />
        </div>
        <div>
          <span className="text-xs sm:text-sm font-medium text-zinc-400 block font-sans">
            Upcoming
          </span>
          <span className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-none mt-1 block">
            {loading ? '...' : stats.upcoming}
          </span>
        </div>
      </div>

    </div>
  );
};
