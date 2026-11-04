import React from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  Gamepad2,
  Calendar,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Flag,
} from 'lucide-react';
import { AdminBooking } from '../../../types/adminBooking';
import { BookingStatusBadge } from './BookingStatusBadge';
import { formatINR } from '../../../lib/utils';

interface BookingDetailsModalProps {
  booking: AdminBooking | null;
  onClose: () => void;
}

export const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  booking,
  onClose,
}) => {
  if (!booking) return null;

  const isSimulator = booking.stationCategory === 'simulator';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#110b1d] border border-purple-500/30 p-6 sm:p-7 shadow-[0_0_50px_rgba(168,85,247,0.3)] z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400">
              {isSimulator ? <Flag className="w-5 h-5" /> : <Gamepad2 className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                  Booking Details
                </h3>
                <span className="font-mono text-xs font-bold text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded-md">
                  {booking.id}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Created on {booking.createdAt}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-5 pt-5 text-xs sm:text-sm">
          
          {/* Status & Station Highlight Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 to-zinc-900/60 border border-purple-500/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white font-display font-bold text-sm shadow-md">
                {booking.customer.initials}
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-base">
                  {booking.customer.fullName}
                </h4>
                <p className="text-xs text-purple-300 font-mono">
                  Station {booking.stationName} • {booking.stationCategoryLabel}
                </p>
              </div>
            </div>

            <BookingStatusBadge status={booking.status} />
          </div>

          {/* 3-Section Grid: Customer, Reservation, Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. Customer Information */}
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-purple-500/15 space-y-3">
              <h5 className="font-display font-bold text-xs uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Customer Profile</span>
              </h5>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-purple-500/10">
                  <span className="text-zinc-400">Full Name</span>
                  <span className="font-semibold text-white">{booking.customer.fullName}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-purple-500/10">
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email
                  </span>
                  <span className="font-mono text-zinc-200">{booking.customer.email}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Phone
                  </span>
                  <span className="font-mono text-zinc-200">{booking.customer.phone}</span>
                </div>
              </div>
            </div>

            {/* 2. Payment & Settlement */}
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-purple-500/15 space-y-3">
              <h5 className="font-display font-bold text-xs uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Payment Details</span>
              </h5>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-purple-500/10">
                  <span className="text-zinc-400">Total Amount</span>
                  <span className="font-display font-black text-sm text-emerald-400">
                    {formatINR(booking.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-purple-500/10">
                  <span className="text-zinc-400">Payment Status</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> {booking.paymentStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-zinc-400">Transaction ID</span>
                  <span className="font-mono text-[11px] text-zinc-300">{booking.transactionId}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Reservation Breakdown Card */}
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-purple-500/15 space-y-3">
            <h5 className="font-display font-bold text-xs uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Session Allocation</span>
            </h5>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-purple-500/10">
                <span className="text-zinc-500 block text-[10px]">Booking Date</span>
                <span className="font-semibold text-white mt-0.5 block">{booking.bookingDate}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-purple-500/10">
                <span className="text-zinc-500 block text-[10px]">Time Slot</span>
                <span className="font-semibold text-purple-300 font-mono mt-0.5 block">{booking.timeSlotFormatted}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-purple-500/10">
                <span className="text-zinc-500 block text-[10px]">Playtime</span>
                <span className="font-semibold text-white mt-0.5 block">{booking.durationFormatted}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-purple-500/10">
                <span className="text-zinc-500 block text-[10px]">Players</span>
                <span className="font-semibold text-white mt-0.5 block">{booking.playerCount} Player{booking.playerCount > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* QR Verification Info */}
          <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                <QrCode className="w-9 h-9 text-purple-700" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 block">
                  Customer Pass Token
                </span>
                <span className="font-mono font-bold text-sm text-white">
                  {booking.bookingCode}
                </span>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Check-in available via Counter QR Scanner module.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Online Pass</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-5 mt-4 border-t border-purple-500/15 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
