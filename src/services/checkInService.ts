import type { CheckInRecord, QRVerificationResponse } from '../types/checkIn';
import { INITIAL_RECENT_CHECK_INS } from '../mock-data/check-ins';
import { MOCK_ADMIN_BOOKINGS } from '../mock-data/admin-bookings';

export const formatKolkataTimestamp = (date: Date = new Date()): string => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(date);

  const month = parts.find((p) => p.type === 'month')?.value || 'Nov';
  const day = parts.find((p) => p.type === 'day')?.value || '07';
  const hour = parts.find((p) => p.type === 'hour')?.value || '10';
  const minute = parts.find((p) => p.type === 'minute')?.value || '30';
  const dayPeriod = parts.find((p) => p.type === 'dayPeriod')?.value?.toUpperCase() || 'AM';

  return `${month} ${day}, ${hour}:${minute} ${dayPeriod}`;
};

class CheckInService {
  private recentCheckIns: CheckInRecord[] = [...INITIAL_RECENT_CHECK_INS];
  private checkedInBookingIds: Map<string, string> = new Map([
    ['BK-1001', 'Nov 05, 11:29 AM'],
    ['BK-0999', 'Nov 05, 01:00 PM'],
    ['BK-0998', 'Nov 05, 03:10 PM'],
    ['BK-0997', 'Nov 05, 06:15 PM'],
  ]);

  /**
   * Returns copy of recent check-ins sorted by serial number
   */
  async getRecentCheckIns(): Promise<CheckInRecord[]> {
    return Promise.resolve([...this.recentCheckIns]);
  }

  /**
   * Synchronous accessor to eliminate initial layout-shift
   */
  getRecentCheckInsSync(): CheckInRecord[] {
    return [...this.recentCheckIns];
  }

  /**
   * Checks if booking ID is already checked in
   */
  isAlreadyCheckedIn(bookingId: string): boolean {
    return this.checkedInBookingIds.has(bookingId.toUpperCase());
  }

  /**
   * Gets previous check-in timestamp
   */
  getCheckInTimestamp(bookingId: string): string | undefined {
    return this.checkedInBookingIds.get(bookingId.toUpperCase());
  }

  /**
   * Verifies a raw scanned or uploaded QR payload
   */
  async verifyQRCode(rawPayload: string): Promise<QRVerificationResponse> {
    if (!rawPayload || !rawPayload.trim()) {
      return {
        state: 'invalid_qr',
        errorMessage: 'Invalid QR Code. Please scan a valid Oliveal booking QR code.',
      };
    }

    const cleaned = rawPayload.trim();

    // Check if payload looks like non-booking random string
    if (cleaned.length < 3) {
      return {
        state: 'invalid_qr',
        errorMessage: 'Invalid QR Code. Please scan a valid Oliveal booking QR code.',
        decodedPayload: cleaned,
      };
    }

    // Try extracting booking ID or code from JSON, URL, or plain string
    let searchId = cleaned;
    let searchCode = cleaned;

    if (cleaned.startsWith('{') && cleaned.endsWith('}')) {
      try {
        const parsed = JSON.parse(cleaned);
        searchId = parsed.bookingId || parsed.id || '';
        searchCode = parsed.bookingCode || parsed.code || '';
      } catch {
        // Continue with raw string
      }
    } else if (cleaned.includes('/booking/')) {
      searchId = cleaned.split('/booking/').pop() || '';
    }

    const normalizedId = searchId.toUpperCase().trim();
    const normalizedCode = searchCode.toUpperCase().trim();

    // Search inside centralized MOCK_ADMIN_BOOKINGS
    const found = MOCK_ADMIN_BOOKINGS.find(
      (b) =>
        b.id.toUpperCase() === normalizedId ||
        b.bookingCode.toUpperCase() === normalizedCode ||
        b.id.toUpperCase() === normalizedCode ||
        b.bookingCode.toUpperCase() === normalizedId
    );

    if (!found) {
      return {
        state: 'not_found',
        errorMessage: 'No booking found for this QR code.',
        decodedPayload: cleaned,
      };
    }

    // Check if already checked in
    if (this.isAlreadyCheckedIn(found.id)) {
      const existingTime = this.getCheckInTimestamp(found.id) || 'Earlier today';
      return {
        state: 'already_checked_in',
        booking: found,
        existingCheckInTime: existingTime,
        errorMessage: 'This booking has already been checked in.',
        decodedPayload: cleaned,
      };
    }

    // Valid and eligible
    return {
      state: 'verified',
      booking: found,
      decodedPayload: cleaned,
    };
  }

  /**
   * Confirms check-in for a verified booking and adds to recent check-ins
   */
  async confirmCheckIn(
    bookingId: string
  ): Promise<{ success: boolean; checkInRecord?: CheckInRecord; error?: string }> {
    const normalizedId = bookingId.toUpperCase().trim();

    if (this.isAlreadyCheckedIn(normalizedId)) {
      const existing = this.getCheckInTimestamp(normalizedId);
      return {
        success: false,
        error: `Booking ${normalizedId} has already been checked in (${existing}).`,
      };
    }

    const booking = MOCK_ADMIN_BOOKINGS.find((b) => b.id.toUpperCase() === normalizedId);
    if (!booking) {
      return {
        success: false,
        error: `Booking ${normalizedId} not found.`,
      };
    }

    const checkInTime = formatKolkataTimestamp();
    const newRecord: CheckInRecord = {
      id: `CI-${normalizedId.replace(/[^0-9]/g, '') || String(this.recentCheckIns.length + 1)}`,
      serialNumber: 1, // Will re-index
      bookingId: booking.id,
      customerName: booking.customer.fullName,
      customerInitials: booking.customer.initials,
      customerAvatarColor: booking.customer.avatarColor || 'from-purple-600 to-indigo-600',
      stationName: booking.stationName,
      checkInTime,
      status: 'checked_in',
    };

    // Prepend new check-in and re-index serial numbers
    const updated = [newRecord, ...this.recentCheckIns].map((rec, idx) => ({
      ...rec,
      serialNumber: idx + 1,
    }));

    this.recentCheckIns = updated;
    this.checkedInBookingIds.set(normalizedId, checkInTime);

    return {
      success: true,
      checkInRecord: newRecord,
    };
  }

  /**
   * Resets check-ins to initial mock state (useful for test resets)
   */
  reset(): void {
    this.recentCheckIns = [...INITIAL_RECENT_CHECK_INS];
    this.checkedInBookingIds = new Map([
      ['BK-1001', 'Nov 05, 11:29 AM'],
      ['BK-0999', 'Nov 05, 01:00 PM'],
      ['BK-0998', 'Nov 05, 03:10 PM'],
      ['BK-0997', 'Nov 05, 06:15 PM'],
    ]);
  }
}

export const checkInService = new CheckInService();
