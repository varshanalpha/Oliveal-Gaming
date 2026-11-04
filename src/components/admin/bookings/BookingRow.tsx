import React from 'react';
import { Eye, Gamepad2, Flag } from 'lucide-react';
import { AdminBooking } from '../../../types/adminBooking';
import { BookingStatusBadge } from './BookingStatusBadge';
import { formatINR } from '../../../lib/utils';

interface BookingRowProps {
  booking: AdminBooking;
  serialNumber: number;
  onViewDetails: (booking: AdminBooking) => void;
}

export const BookingRow: React.FC<BookingRowProps> = ({
  booking,
  serialNumber,
  onViewDetails,
}) => {
  const isSimulator = booking.stationCategory === 'simulator';

  return (
    <tr className="border-b border-purple-500/10 hover:bg-purple-950/20 transition-colors group">
      
      {/* 1. Serial Number */}
      <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-xs font-mono text-zinc-400">
        {serialNumber}
      </td>

      {/* 2. Booking ID */}
      <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-mono font-semibold text-zinc-200">
        {booking.id}
      </td>

      {/* 3. Customer */}
      <td className="py-2.5 sm:py-3 px-3 sm:px-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white font-display font-bold text-xs shrink-0 shadow-sm">
            {booking.customer.initials}
          </div>
          <span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
            {booking.customer.fullName}
          </span>
        </div>
      </td>

      {/* 4. Station */}
      <td className="py-2.5 sm:py-3 px-3 sm:px-4">
        <div className="flex items-center gap-2 whitespace-nowrap">
          {isSimulator ? (
            <Flag className="w-4 h-4 text-purple-400 shrink-0" />
          ) : (
            <Gamepad2 className="w-4 h-4 text-purple-400 shrink-0" />
          )}
          <span className="font-display font-bold text-xs sm:text-sm text-white">
            {booking.stationName}
          </span>
          <span className="text-xs text-zinc-400 font-sans">
            ({booking.stationCategoryLabel})
          </span>
        </div>
      </td>

      {/* 5. Date */}
      <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-zinc-300 whitespace-nowrap font-sans">
        {booking.bookingDate}
      </td>

      {/* 6. Time Slot */}
      <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-zinc-300 font-mono whitespace-nowrap">
        {booking.timeSlotFormatted}
      </td>

      {/* 7. Duration */}
      <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-zinc-400 whitespace-nowrap font-sans">
        {booking.durationFormatted}
      </td>

      {/* 8. Amount */}
      <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold text-white whitespace-nowrap">
        {formatINR(booking.amount)}
      </td>

      {/* 9. Status */}
      <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
        <BookingStatusBadge status={booking.status} />
      </td>

      {/* 10. Actions */}
      <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-center whitespace-nowrap">
        <button
          type="button"
          onClick={() => onViewDetails(booking)}
          className="p-1.5 rounded-lg bg-zinc-900/80 border border-purple-500/20 text-zinc-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-950/40 transition-all cursor-pointer inline-flex items-center justify-center shadow-sm"
          title="View Booking Details"
          aria-label={`View details for ${booking.id}`}
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </td>

    </tr>
  );
};
