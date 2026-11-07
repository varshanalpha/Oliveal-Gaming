import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminShell } from '../../components/admin/layout/AdminShell';
import { QRScannerFrame } from '../../components/admin/scan-qr/QRScannerFrame';
import { RecentCheckInsTable } from '../../components/admin/scan-qr/RecentCheckInsTable';
import { ScannedBookingDetailsCard } from '../../components/admin/scan-qr/ScannedBookingDetailsCard';
import { checkInService } from '../../services/checkInService';
import { CheckInRecord, QRScannerState } from '../../types/checkIn';
import { AdminBooking } from '../../types/adminBooking';

import headerPs5Img from '../../assets/dashboard/bookslot-header-ps5.png';

export const AdminScanQRPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Synchronous initial check-ins state strictly matching the reference design
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>(() =>
    checkInService.getRecentCheckInsSync()
  );

  // Scanner dynamic flow state
  const [scannerState, setScannerState] = useState<QRScannerState>('ready');
  const [scannedBooking, setScannedBooking] = useState<AdminBooking | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [existingCheckInTime, setExistingCheckInTime] = useState<string | undefined>();
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Refresh check-ins on mount
  useEffect(() => {
    checkInService.getRecentCheckIns().then(setCheckIns);
  }, []);

  // Handle scanned or uploaded QR payload
  const handleScanPayload = async (rawPayload: string) => {
    setIsVerifying(true);
    setScannerState('verifying');

    try {
      const response = await checkInService.verifyQRCode(rawPayload);
      setScannerState(response.state);
      setScannedBooking(response.booking);
      setErrorMessage(response.errorMessage);
      setExistingCheckInTime(response.existingCheckInTime);

      // Auto-confirm test helper if confirm parameter is present
      if (searchParams.get('confirm') === 'true' && response.state === 'verified' && response.booking) {
        await handleConfirmCheckIn(response.booking.id);
      }
    } catch {
      setScannerState('error');
      setErrorMessage('An unexpected error occurred while verifying the QR code.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Automated test query parameter handler
  useEffect(() => {
    const testScan = searchParams.get('scan');
    if (testScan) {
      handleScanPayload(testScan);
    }
  }, [searchParams]);

  // Confirm Check-in action from the dynamically displayed Booking Details card
  const handleConfirmCheckIn = async (bookingId: string) => {
    const result = await checkInService.confirmCheckIn(bookingId);
    if (result.success && result.checkInRecord) {
      // Refresh check-ins table immediately
      const updated = await checkInService.getRecentCheckIns();
      setCheckIns(updated);
      setScannerState('checkin_confirmed');
    } else {
      setErrorMessage(result.error || 'Failed to complete check-in.');
      setScannerState('error');
    }
  };

  // Reset scanner back to initial Ready to Scan state
  const handleResetScanner = () => {
    setScannerState('ready');
    setScannedBooking(undefined);
    setErrorMessage(undefined);
    setExistingCheckInTime(undefined);
  };

  return (
    <AdminShell pageTitle="Scan QR">
      <div className="space-y-3 sm:space-y-4 w-full max-w-7xl mx-auto pb-4">
        
        {/* ======================================================== */}
        {/* PAGE HEADER: TITLE + DESCRIPTION + PS5 LASER RIGS VISUAL */}
        {/* ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 relative">
          <div className="space-y-0.5 max-w-xl">
            <h1 className="text-2xl sm:text-3xl lg:text-[30px] font-extrabold font-display tracking-tight leading-tight text-white">
              Scan <span className="text-purple-400">QR</span>
            </h1>
            <p className="text-xs sm:text-[13px] text-zinc-300 font-sans">
              Verify customer bookings and check-in players for their game session.
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
        {/* Left: QR Code Scanner (Initial) OR Scanned Booking Details (Dynamic) */}
        {/* Right: Recent Check-ins Table */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Column: Scanner (Initial) OR Dynamic Booking Details (After Scan) */}
          <div className="lg:col-span-5">
            {scannerState === 'ready' || scannerState === 'verifying' ? (
              <QRScannerFrame
                onScanPayload={handleScanPayload}
                isVerifying={isVerifying}
              />
            ) : (
              <ScannedBookingDetailsCard
                scannerState={scannerState}
                booking={scannedBooking}
                errorMessage={errorMessage}
                existingCheckInTime={existingCheckInTime}
                onConfirmCheckIn={handleConfirmCheckIn}
                onResetScanner={handleResetScanner}
              />
            )}
          </div>

          {/* Right Column: Recent Check-ins Table */}
          <div className="lg:col-span-7">
            <RecentCheckInsTable checkIns={checkIns} />
          </div>

        </div>

      </div>
    </AdminShell>
  );
};

export default AdminScanQRPage;
