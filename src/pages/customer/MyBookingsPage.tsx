import React, { useState, useEffect } from 'react';
import {
  Ticket,
  Tv,
  Gamepad2,
  ShieldAlert,
  QrCode,
  ArrowRight,
} from 'lucide-react';
import { CustomerShell } from '../../components/customer/layout/CustomerShell';
import { BookingDetailsModal } from '../../components/customer/bookings/BookingDetailsModal';
import { bookingService } from '../../services/bookingService';
import { CustomerBooking } from '../../types/customer';
import { MOCK_CUSTOMER_BOOKINGS } from '../../mock-data/customer';
import { formatINR } from '../../lib/utils';
import { Link } from 'react-router-dom';

export const MyBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<CustomerBooking[]>(MOCK_CUSTOMER_BOOKINGS);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'completed'>('all');
  const [selectedBooking, setSelectedBooking] = useState<CustomerBooking | null>(null);

  useEffect(() => {
    bookingService.getCustomerBookings().then(setBookings);
  }, []);

  const filteredBookings = bookings.filter((bk) => {
    if (filter === 'all') return true;
    return bk.status === filter;
  });

  const upcomingCount = bookings.filter((b) => b.status === 'confirmed').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;

  return (
    <CustomerShell pageTitle="My Bookings">
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              My <span className="text-purple-400">Bookings</span> History
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              View your upcoming gaming passes, previous completed sessions, and check-in QR codes.
            </p>
          </div>

          <Link
            to="/customer/book-slot"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-display font-semibold text-xs sm:text-sm shadow-[0_0_15px_rgba(168,85,247,0.35)] transition-all self-start sm:self-auto cursor-pointer"
          >
            <span>Book New Slot</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-purple-500/15 pb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-semibold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              filter === 'confirmed'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span>Upcoming</span>
            <span className="px-1.5 py-0.2 rounded-full bg-purple-950 text-[10px] text-purple-300 border border-purple-500/30">
              {upcomingCount}
            </span>
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              filter === 'completed'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span>Completed</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-950 text-[10px] text-emerald-300 border border-emerald-500/30">
              {completedCount}
            </span>
          </button>
        </div>

        {/* Bookings List */}
        <div className="space-y-3.5">
          {filteredBookings.length === 0 ? (
            <div className="py-12 text-center bg-[#0e0c1f] rounded-3xl border border-purple-500/15 p-6">
              <Ticket className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <h3 className="font-display font-bold text-base text-white">
                No Bookings Found
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                You do not have any {filter !== 'all' ? filter : ''} bookings at this moment.
              </p>
            </div>
          ) : (
            filteredBookings.map((bk) => (
              <div
                key={bk.id}
                className="bg-[#0e0c1f] rounded-2xl border border-purple-500/15 hover:border-purple-500/35 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200 shadow-sm"
              >
                {/* Station & Code Info */}
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-purple-500/20 flex items-center justify-center shrink-0">
                    {bk.stationType === 'ps5' ? (
                      <Tv className="w-6 h-6 text-purple-400" />
                    ) : (
                      <Gamepad2 className="w-6 h-6 text-purple-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-black text-white text-base">
                        Station {bk.stationName}
                      </h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30">
                        {bk.stationType === 'ps5' ? 'PlayStation 5' : 'Simulator'}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-zinc-400 mt-0.5">
                      {bk.bookingCode}
                    </p>
                  </div>
                </div>

                {/* Session Date, Time & Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-y md:border-y-0 md:border-x border-purple-500/10 py-3 md:py-0 md:px-6">
                  <div>
                    <span className="text-zinc-500 text-[10px] block">Date</span>
                    <span className="font-semibold text-white">{bk.bookingDate}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] block">Time Slot</span>
                    <span className="font-medium text-zinc-300">{bk.startTime} – {bk.endTime}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] block">Duration & Rate</span>
                    <span className="font-medium text-emerald-400">{bk.duration} • {formatINR(bk.totalAmount)}</span>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide capitalize ${
                      bk.status === 'confirmed'
                        ? 'bg-purple-950/90 border border-purple-500/60 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                        : 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                    }`}
                  >
                    {bk.status}
                  </span>

                  <button
                    onClick={() => setSelectedBooking(bk)}
                    className="px-4 py-2 rounded-xl text-xs font-display font-semibold bg-zinc-900 hover:bg-zinc-800 text-white border border-purple-500/25 hover:border-purple-500/50 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <QrCode className="w-3.5 h-3.5 text-purple-400" />
                    <span>View Pass</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Strict Cancellation & Refund Notice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/30 border border-purple-500/20 flex items-start gap-3.5 text-xs text-zinc-300">
          <ShieldAlert className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-display font-bold text-white text-sm">
              Strict Non-Cancellable Policy Notice
            </h5>
            <p className="text-zinc-400 text-xs leading-relaxed">
              In accordance with Oliveal Gaming Zone booking terms, all confirmed bookings are non-refundable and cannot be rescheduled or cancelled. Please ensure prompt arrival at the lounge at least 5 minutes prior to your allocated slot.
            </p>
          </div>
        </div>

      </div>

      {/* Booking Pass Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </CustomerShell>
  );
};