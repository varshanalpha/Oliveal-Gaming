import React from 'react';
import { X, QrCode, Calendar, Clock, User, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { CustomerBooking } from '../../../types/customer';
import { formatINR } from '../../../lib/utils';

interface BookingDetailsModalProps {
  booking: CustomerBooking | null;
  onClose: () => void;
}

export const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-3xl bg-[#110f24] border border-purple-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)] z-10 animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              <QrCode className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Booking Pass Details
              </h3>
              <p className="text-xs font-mono text-purple-400">
                {booking.bookingCode}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pass Content */}
        <div className="space-y-4 pt-5">
          
          {/* Station & Status Card */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/60 border border-purple-500/20">
            <div>
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">
                {booking.stationType === 'ps5' ? 'PlayStation 5 Setup' : 'Racing Simulator'}
              </span>
              <h4 className="font-display font-extrabold text-xl text-white mt-0.5">
                Station {booking.stationName}
              </h4>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide capitalize ${
                booking.status === 'confirmed'
                  ? 'bg-purple-950/80 border border-purple-500 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                  : 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
              }`}
            >
              {booking.status}
            </span>
          </div>

          {/* Schedule Specs Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
              <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span>Date</span>
              </div>
              <span className="font-semibold text-white">{booking.bookingDate}</span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
              <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>Time & Duration</span>
              </div>
              <span className="font-semibold text-white">
                {booking.startTime} – {booking.endTime} ({booking.duration})
              </span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
              <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                <User className="w-3.5 h-3.5 text-purple-400" />
                <span>Players</span>
              </div>
              <span className="font-semibold text-white">
                {booking.playerCount} {booking.playerCount === 1 ? 'Player' : 'Players'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
              <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Payment Paid</span>
              </div>
              <span className="font-bold text-emerald-300 font-display text-sm">
                {formatINR(booking.totalAmount)}
              </span>
            </div>
          </div>

          {/* Digital QR Code Pass Simulation */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-purple-500/30 flex flex-col items-center justify-center space-y-2">
            <div className="w-32 h-32 rounded-xl bg-white p-2.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-zinc-900 rounded-lg p-2 flex flex-col items-center justify-center text-center">
                <QrCode className="w-16 h-16 text-purple-400" />
                <span className="text-[8px] font-mono text-zinc-400 mt-1">SCAN AT DESK</span>
              </div>
            </div>
            <span className="text-[11px] text-zinc-400 text-center font-medium">
              Present this pass at front desk on arrival for instant QR check-in
            </span>
          </div>

          {/* Policy Alert Note */}
          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-start gap-2.5 text-[11px] text-zinc-400">
            <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span>
              Strict Policy: All confirmed reservations are non-cancellable and non-refundable. Please arrive 5 minutes before your scheduled start time.
            </span>
          </div>

        </div>

        {/* Modal Close Button */}
        <div className="pt-5 mt-4 border-t border-purple-500/15">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl font-display font-semibold text-xs bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 transition-colors cursor-pointer"
          >
            Close Pass
          </button>
        </div>

      </div>
    </div>
  );
};

