import React from 'react';
import { Link } from 'react-router-dom';
import { ListFilter, ArrowRight, Calendar, Gamepad2 } from 'lucide-react';
import { WalkInBooking } from '../../../types/walkInBooking';
import { formatINR } from '../../../lib/utils';

interface TodaysWalkInTableProps {
  bookings: WalkInBooking[];
}

export const TodaysWalkInTable: React.FC<TodaysWalkInTableProps> = ({ bookings }) => {
  return (
    <div className="rounded-3xl bg-[#0e0a1d]/90 border border-purple-500/25 p-4 sm:p-5 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl h-full flex flex-col justify-between">
      <div>
        {/* Card Header: Icon + Title + View All Link */}
        <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-purple-500/15">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <ListFilter className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold font-display text-white">
              Todays On Spot Bookings
            </h2>
          </div>

          <Link
            to="/admin/bookings"
            className="flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors group cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Bookings Table / List */}
        <div className="mt-2 overflow-x-auto scrollbar-thin">
          {bookings.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 space-y-2">
              <Calendar className="w-8 h-8 mx-auto text-zinc-600" />
              <p className="text-sm font-medium">No walk-in bookings recorded yet today.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[440px] sm:min-w-[480px]">
              <thead>
                <tr className="border-b border-purple-500/15 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  <th className="py-2.5 px-2 text-center w-7">#</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Station</th>
                  <th className="py-2.5 px-3">Time Slot</th>
                  <th className="py-2.5 px-3 text-center">Duration</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10 text-xs sm:text-[13px]">
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-purple-950/20 transition-colors duration-150 group"
                  >
                    {/* # Index */}
                    <td className="py-2.5 px-2 text-center font-mono font-bold text-zinc-400">
                      {booking.serialNumber}
                    </td>

                    {/* Customer */}
                    <td className="py-2.5 px-3 font-semibold text-white truncate max-w-[120px]">
                      {booking.customerName}
                    </td>

                    {/* Station */}
                    <td className="py-2.5 px-3 font-bold text-white tracking-wide">
                      <div className="flex items-center gap-1.5">
                        <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
                        <span>{booking.stationName}</span>
                      </div>
                    </td>

                    {/* Time Slot */}
                    <td className="py-2.5 px-3 text-zinc-300 font-mono whitespace-nowrap">
                      {booking.timeSlot}
                    </td>

                    {/* Duration */}
                    <td className="py-2.5 px-3 text-center text-zinc-400 whitespace-nowrap">
                      {booking.durationFormatted}
                    </td>

                    {/* Amount */}
                    <td className="py-2.5 px-3 text-right font-bold text-white whitespace-nowrap">
                      {formatINR(booking.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Footer Info / Counter */}
      <div className="pt-3 mt-3 border-t border-purple-500/10 flex items-center justify-between text-[11px] text-zinc-400">
        <span>Showing {bookings.length} walk-in booking{bookings.length === 1 ? '' : 's'}</span>
        <span className="font-mono text-purple-400/90">24/7 Slot Engine</span>
      </div>
    </div>
  );
};
