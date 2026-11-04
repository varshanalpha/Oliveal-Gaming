import React from 'react';
import { AdminBookingStatus } from '../../../types/adminBooking';

interface BookingStatusBadgeProps {
  status: AdminBookingStatus;
  className?: string;
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({
  status,
  className = '',
}) => {
  switch (status) {
    case 'ongoing':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-display font-semibold text-xs shadow-[0_0_10px_rgba(16,185,129,0.25)] ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
          <span>Ongoing</span>
        </span>
      );

    case 'upcoming':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-500/40 text-sky-300 font-display font-semibold text-xs shadow-[0_0_10px_rgba(14,165,233,0.25)] ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.9)]" />
          <span>Upcoming</span>
        </span>
      );

    case 'completed':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-display font-semibold text-xs ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Completed</span>
        </span>
      );

    default:
      return null;
  }
};
