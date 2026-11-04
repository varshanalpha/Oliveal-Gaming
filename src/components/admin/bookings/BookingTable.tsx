import React from 'react';
import { CalendarX, RefreshCw } from 'lucide-react';
import { AdminBooking } from '../../../types/adminBooking';
import { BookingRow } from './BookingRow';

interface BookingTableProps {
  bookings: AdminBooking[];
  startIndex: number;
  loading?: boolean;
  onViewDetails: (booking: AdminBooking) => void;
  onResetFilters?: () => void;
}

export const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  startIndex,
  loading = false,
  onViewDetails,
  onResetFilters,
}) => {
  return (
    <div className="w-full rounded-2xl bg-[#100b1b] border border-purple-500/20 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          
          {/* Table Header */}
          <thead>
            <tr className="bg-[#140d24]/80 border-b border-purple-500/15 text-xs font-semibold text-zinc-400 select-none">
              <th scope="col" className="py-2.5 sm:py-3 px-3 sm:px-4 w-12 font-mono">
                #
              </th>
              <th scope="col" className="py-2.5 sm:py-3 px-3 sm:px-4">
                Booking ID
              </th>
              <th scope="col" className="py-2.5 sm:py-3 px-3 sm:px-4">
                Customer
              </th>
              <th scope="col" className="py-2.5 sm:py-3 px-3 sm:px-4">
                Station
              </th>
              <th scope="col" className="py-2.5 sm:py-3 px-3 sm:px-4">
                Date
              </th>
              <th scope="col" className="py-2.5 sm:py-3 px-3 sm:px-4">
                Time Slot
              </th>
              <th scope="col" className="py-2.5 sm:py-3 px-3 sm:px-4">
                Duration
              </th>
              <th scope="col" className="py-2.5 sm:py-3 px-3 sm:px-4">
                Amount
              </th>
              <th scope="col" className="py-2.5 sm:py-3 px-3 sm:px-4">
                Status
              </th>
              <th scope="col" className="py-2.5 sm:py-3 px-3 sm:px-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-purple-500/10">
            {loading ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-zinc-400 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                    <span>Loading bookings...</span>
                  </div>
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-16 text-center">
                  <div className="max-w-md mx-auto space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto">
                      <CalendarX className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-base">
                        No Bookings Found
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        No customer online bookings match your active search or filter criteria.
                      </p>
                    </div>
                    {onResetFilters && (
                      <button
                        type="button"
                        onClick={onResetFilters}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset Filters</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              bookings.map((booking, index) => (
                <BookingRow
                  key={booking.id}
                  booking={booking}
                  serialNumber={startIndex + index}
                  onViewDetails={onViewDetails}
                />
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};
