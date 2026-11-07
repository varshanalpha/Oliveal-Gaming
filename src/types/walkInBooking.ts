export type StationName = 'ALPHA' | 'BETA' | 'GAMMA' | 'DELTA' | 'RS1' | 'RS2';
export type StationCategory = 'ps5' | 'simulator';
export type WalkInDuration = 60 | 90 | 120;
export type WalkInPlayerCount = 1 | 2;

export interface WalkInBooking {
  id: string;
  serialNumber: number;
  customerName: string;
  customerPhone?: string;
  stationName: StationName;
  stationCategory: StationCategory;
  startTime: string;
  endTime: string;
  timeSlot: string;
  durationMinutes: WalkInDuration;
  durationFormatted: string;
  playerCount: WalkInPlayerCount;
  amount: number;
  bookingDate: string;
  createdAt: string;
  status: 'ongoing' | 'upcoming' | 'completed';
}

export interface CreateWalkInBookingInput {
  customerName: string;
  customerPhone?: string;
  stationName: StationName;
  stationCategory: StationCategory;
  startTime: string;
  durationMinutes: WalkInDuration;
  playerCount: WalkInPlayerCount;
}

export interface WalkInValidationResult {
  isValid: boolean;
  errorField?: 'customerName' | 'customerPhone' | 'station' | 'duration' | 'startTime' | 'conflict';
  errorMessage?: string;
  conflictingSlot?: string;
}
