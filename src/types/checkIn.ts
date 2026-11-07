import { AdminBooking } from './adminBooking';

export type CheckInStatus = 'checked_in';

export interface CheckInRecord {
  id: string;
  serialNumber: number;
  bookingId: string;
  customerName: string;
  customerInitials: string;
  customerAvatarColor?: string;
  stationName: string;
  checkInTime: string;
  status: CheckInStatus;
}

export type QRScannerState =
  | 'ready'
  | 'requesting_permission'
  | 'scanning'
  | 'verifying'
  | 'verified'
  | 'already_checked_in'
  | 'not_found'
  | 'invalid_qr'
  | 'not_eligible'
  | 'checkin_confirmed'
  | 'error';

export interface QRVerificationResponse {
  state: QRScannerState;
  booking?: AdminBooking;
  errorMessage?: string;
  existingCheckInTime?: string;
  decodedPayload?: string;
}

