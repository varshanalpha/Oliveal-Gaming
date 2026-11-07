import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Mail,
  Phone,
  Gamepad2,
  Clock,
  ShieldCheck,
  RotateCcw,
  Loader2,
  Users,
} from 'lucide-react';
import { AdminBooking } from '../../../types/adminBooking';
import { QRScannerState } from '../../../types/checkIn';
import { formatINR } from '../../../lib/utils';

interface ScannedBookingDetailsCardProps {
  scannerState: QRScannerState;
  booking?: AdminBooking;
  errorMessage?: string;
  existingCheckInTime?: string;
  onConfirmCheckIn: (bookingId: string) => Promise<void>;
  onResetScanner: () => void;
}

export const ScannedBookingDetailsCard: React.FC<ScannedBookingDetailsCardProps> = ({
  scannerState,
  booking,
  errorMessage,
  existingCheckInTime,
  onConfirmCheckIn,
  onResetScanner,
}) => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [confirmedSuccess, setConfirmedSuccess] = useState<boolean>(false);

  const handleConfirm = async () => {
    if (!booking) return;
    setIsConfirming(true);
    await onConfirmCheckIn(booking.id);
    setIsConfirming(false);
    setConfirmedSuccess(true);
  };

  // State A: Already Checked In Error Card
  if (scannerState === 'already_checked_in') {
    return (
      <div className="rounded-3xl bg-[#0e0a1d]/90 border border-amber-500/30 p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl space-y-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <p className="font-bold text-amber-300 text-sm sm:text-base">
              Already Checked In
            </p>
            <p className="text-xs text-amber-200/90 mt-0.5">
              This booking was already checked in at{' '}
              <span className="font-mono font-bold text-white">{existingCheckInTime || 'Earlier today'}</span>.
              Duplicate check-ins are restricted.
            </p>
          </div>
        </div>

        {booking && (
          <div className="p-4 rounded-2xl bg-[#110c22] border border-purple-500/20 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between items-center text-zinc-400">
              <span>Booking ID:</span>
              <span className="font-mono font-bold text-white">{booking.id}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Customer:</span>
              <span className="font-semibold text-white">{booking.customer.fullName}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Station:</span>
              <span className="font-bold text-purple-300">{booking.stationName} ({booking.stationCategoryLabel})</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Session:</span>
              <span className="font-mono text-zinc-300">{booking.timeSlotFormatted}</span>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onResetScanner}
          className="w-full h-11 sm:h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Scan Another QR Code</span>
        </button>
      </div>
    );
  }

  // State B: Invalid QR or Booking Not Found Error Card
  if (scannerState === 'invalid_qr' || scannerState === 'not_found' || scannerState === 'error') {
    return (
      <div className="rounded-3xl bg-[#0e0a1d]/90 border border-red-500/30 p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl space-y-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-200">
          <XCircle className="w-5 h-5 text-red-400 shrink-0" />
          <div>
            <p className="font-bold text-red-300 text-sm sm:text-base">
              Verification Failed
            </p>
            <p className="text-xs text-red-200/90 mt-0.5">
              {errorMessage || 'Unable to verify QR code. Please check that this is an authentic Oliveal Gaming Zone booking pass.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onResetScanner}
          className="w-full h-11 sm:h-12 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-purple-500/30 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-purple-400" />
          <span>Scan Another QR Code</span>
        </button>
      </div>
    );
  }

  // State C: Successfully Checked In Confirmation Card
  if (confirmedSuccess) {
    return (
      <div className="rounded-3xl bg-[#0e0a1d]/90 border border-emerald-500/30 p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl space-y-4 text-center animate-in fade-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(52,211,153,0.4)]">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold font-display text-white">
            Player Checked In!
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300">
            {booking?.customer.fullName} is checked in for Station{' '}
            <span className="font-bold text-purple-400">{booking?.stationName}</span>.
          </p>
        </div>

        {booking && (
          <div className="p-3.5 rounded-2xl bg-[#110c22] border border-purple-500/20 text-xs text-zinc-300 space-y-1 text-left">
            <div className="flex justify-between">
              <span className="text-zinc-500">Booking ID:</span>
              <span className="font-mono font-bold text-white">{booking.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Session:</span>
              <span className="font-mono text-zinc-200">{booking.timeSlotFormatted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Station Status:</span>
              <span className="font-bold text-emerald-400">Unlocked & Ready</span>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onResetScanner}
          className="w-full h-11 sm:h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Scan Next Customer</span>
        </button>
      </div>
    );
  }

  // State D: Verified Booking Details Card (Ready for Admin to Confirm Check-in)
  if (!booking) return null;

  return (
    <div className="rounded-3xl bg-[#0e0a1d]/90 border border-purple-500/25 p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl relative space-y-4 animate-in fade-in zoom-in-95">
      
      {/* Header with Verified Status Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-purple-500/15">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg sm:text-xl font-bold font-display text-white">
            Booking Details
          </h3>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          <span>QR Verified</span>
        </span>
      </div>

      {/* Customer Information Block */}
      <div className="p-3.5 rounded-2xl bg-[#110c22] border border-purple-500/20 space-y-2.5">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${
              booking.customer.avatarColor || 'from-purple-600 to-indigo-600'
            } text-white font-bold text-sm flex items-center justify-center shadow-sm`}
          >
            {booking.customer.initials}
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">
              {booking.customer.fullName}
            </p>
            <p className="text-[11px] text-purple-400 font-mono mt-0.5">
              Verified Oliveal Gamer
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-purple-500/10 text-xs text-zinc-300">
          <div className="flex items-center gap-1.5 truncate">
            <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span className="truncate">{booking.customer.email}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span>{booking.customer.phone || 'Phone verified'}</span>
          </div>
        </div>
      </div>

      {/* Booking Details Grid */}
      <div className="grid grid-cols-2 gap-2.5 text-xs">
        
        {/* Booking ID & Code */}
        <div className="p-2.5 rounded-xl bg-[#120d24] border border-purple-500/15">
          <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Booking ID</span>
          <span className="text-sm font-mono font-bold text-white">{booking.id}</span>
          <span className="text-[10px] font-mono text-purple-400 block truncate">{booking.bookingCode}</span>
        </div>

        {/* Station Allocation */}
        <div className="p-2.5 rounded-xl bg-[#120d24] border border-purple-500/15">
          <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Station</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Gamepad2 className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-extrabold text-white">{booking.stationName}</span>
          </div>
          <span className="text-[10px] text-zinc-400">({booking.stationCategoryLabel})</span>
        </div>

        {/* Time Slot & Date */}
        <div className="p-2.5 rounded-xl bg-[#120d24] border border-purple-500/15">
          <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Reserved Slot</span>
          <div className="flex items-center gap-1 text-zinc-200 font-mono text-xs mt-0.5">
            <Clock className="w-3 h-3 text-purple-400 shrink-0" />
            <span>{booking.timeSlotFormatted}</span>
          </div>
          <span className="text-[10px] text-zinc-500 block mt-0.5">{booking.bookingDate}</span>
        </div>

        {/* Players & Duration */}
        <div className="p-2.5 rounded-xl bg-[#120d24] border border-purple-500/15">
          <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Session Info</span>
          <div className="flex items-center gap-1.5 text-white font-semibold text-xs mt-0.5">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>{booking.playerCount} Player{booking.playerCount > 1 ? 's' : ''}</span>
          </div>
          <span className="text-[10px] text-zinc-400">{booking.durationFormatted} Duration</span>
        </div>

      </div>

      {/* Payment & Amount Banner */}
      <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-500/25 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block">
            Payment Status
          </span>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {booking.paymentStatus || 'Paid & Confirmed'}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block">
            Total Amount
          </span>
          <span className="text-lg font-black text-white">
            {formatINR(booking.amount)}
          </span>
        </div>
      </div>

      {/* Confirmation Actions */}
      <div className="space-y-2 pt-1">
        <button
          type="button"
          disabled={isConfirming}
          onClick={handleConfirm}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] transition-all cursor-pointer disabled:opacity-50"
        >
          {isConfirming ? (
            <>
              <Loader2 className="w-4.5 h-4.5 animate-spin" />
              <span>Confirming Check-in...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4.5 h-4.5 text-white" />
              <span>Confirm Check-in</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onResetScanner}
          className="w-full h-10 rounded-xl bg-transparent hover:bg-zinc-900/60 text-zinc-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
          <span>Scan Another QR Code</span>
        </button>
      </div>

    </div>
  );
};
