import {
  StationName,
  StationCategory,
  WalkInDuration,
  WalkInPlayerCount,
  WalkInBooking,
  CreateWalkInBookingInput,
  WalkInValidationResult,
} from '../types/walkInBooking';
import { INITIAL_TODAYS_WALK_IN_BOOKINGS } from '../mock-data/walk-in-bookings';
import { MOCK_STATION_BOOKED_SLOTS } from '../mock-data/customer';
import { MOCK_ADMIN_BOOKINGS } from '../mock-data/admin-bookings';

/**
 * Converts a 12-hour formatted time string (e.g. "11:29 AM", "01:00 PM")
 * into total minutes from start of the day (0..1439).
 */
export const timeStringToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

/**
 * Converts total minutes from start of the day to a 12-hour formatted string (e.g. "12:29 PM").
 */
export const minutesToTimeString = (totalMinutes: number): string => {
  const normalized = ((totalMinutes % (24 * 60)) + (24 * 60)) % (24 * 60);
  const rawHours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  const period = rawHours >= 12 ? 'PM' : 'AM';
  const hours12 = rawHours % 12 || 12;

  return `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
};

/**
 * Calculates proportional walk-in booking price:
 * - PS5 1P: ₹150/hr (60m: ₹150, 90m: ₹225, 120m: ₹300)
 * - PS5 2P: ₹200/hr (60m: ₹200, 90m: ₹300, 120m: ₹400)
 * - Racing 1P: ₹200/hr (60m: ₹200, 90m: ₹300, 120m: ₹400)
 */
export const calculateWalkInPrice = (
  category: StationCategory,
  durationMinutes: WalkInDuration,
  playerCount: WalkInPlayerCount
): number => {
  const effectivePlayers = category === 'simulator' ? 1 : playerCount;
  const hourlyRate =
    category === 'ps5'
      ? effectivePlayers === 2
        ? 200
        : 150
      : 200;

  return Math.round((hourlyRate * durationMinutes) / 60);
};

/**
 * Calculates End Time = Start Time + Selected Duration with minute precision.
 */
export const calculateEndTime = (
  startTime: string,
  durationMinutes: WalkInDuration
): string => {
  const startMinutes = timeStringToMinutes(startTime);
  const endMinutes = startMinutes + durationMinutes;
  return minutesToTimeString(endMinutes);
};

class WalkInBookingService {
  private bookings: WalkInBooking[] = [...INITIAL_TODAYS_WALK_IN_BOOKINGS];

  /**
   * Returns today's walk-in bookings sorted by serial number / chronological order.
   */
  async getTodaysWalkInBookings(): Promise<WalkInBooking[]> {
    return Promise.resolve([...this.bookings]);
  }

  /**
   * Synchronously returns today's walk-in bookings for zero layout-shift SSR/CSR initial state.
   */
  getTodaysWalkInBookingsSync(): WalkInBooking[] {
    return [...this.bookings];
  }

  /**
   * Checks whether the requested interval conflicts with any existing online or walk-in booking
   * for the specific station.
   *
   * Interval overlap rule: newStart < existingEnd && newEnd > existingStart
   */
  validateStationAvailability(
    stationName: StationName,
    startTime: string,
    durationMinutes: WalkInDuration
  ): WalkInValidationResult {
    const reqStart = timeStringToMinutes(startTime);
    const reqEnd = reqStart + durationMinutes;

    if (reqStart === 0 && !startTime.includes('12:00 AM') && !startTime.includes('00:00')) {
      return {
        isValid: false,
        errorField: 'startTime',
        errorMessage: 'Invalid start time format.',
      };
    }

    // 1. Check against existing walk-in bookings for this station
    for (const walkIn of this.bookings) {
      if (walkIn.stationName === stationName) {
        const existStart = timeStringToMinutes(walkIn.startTime);
        const existEnd = timeStringToMinutes(walkIn.endTime);

        // Conflict condition
        if (reqStart < existEnd && reqEnd > existStart) {
          return {
            isValid: false,
            errorField: 'conflict',
            errorMessage: `Station ${stationName} is already booked from ${walkIn.timeSlot} (Walk-in: ${walkIn.customerName}).`,
            conflictingSlot: walkIn.timeSlot,
          };
        }
      }
    }

    // 2. Check against customer online booked slots
    const onlineSlots = MOCK_STATION_BOOKED_SLOTS[stationName] || [];
    for (const slot of onlineSlots) {
      const existStart = slot.startMinutes ?? timeStringToMinutes(slot.startTime);
      const existEnd = slot.endMinutes ?? timeStringToMinutes(slot.endTime);

      if (reqStart < existEnd && reqEnd > existStart) {
        return {
          isValid: false,
          errorField: 'conflict',
          errorMessage: `Station ${stationName} is already booked from ${slot.label || `${slot.startTime} – ${slot.endTime}`} (Online Booking).`,
          conflictingSlot: slot.label || `${slot.startTime} – ${slot.endTime}`,
        };
      }
    }

    // 3. Check against today's admin bookings dataset
    const adminTodayBookings = MOCK_ADMIN_BOOKINGS.filter(
      (b) => b.stationName === stationName && b.bookingDate === 'Nov 05, 2026'
    );
    for (const b of adminTodayBookings) {
      const existStart = timeStringToMinutes(b.startTime);
      const existEnd = timeStringToMinutes(b.endTime);

      if (reqStart < existEnd && reqEnd > existStart) {
        return {
          isValid: false,
          errorField: 'conflict',
          errorMessage: `Station ${stationName} is already booked from ${b.timeSlotFormatted} (${b.customer.fullName}).`,
          conflictingSlot: b.timeSlotFormatted,
        };
      }
    }

    return { isValid: true };
  }

  /**
   * Creates a new Walk-in Booking after rigorous business validation.
   */
  async createWalkInBooking(
    input: CreateWalkInBookingInput
  ): Promise<{ success: boolean; booking?: WalkInBooking; validation: WalkInValidationResult }> {
    const trimmedName = input.customerName.trim();

    // 1. Validate customer name
    if (!trimmedName || trimmedName.length < 2) {
      return {
        success: false,
        validation: {
          isValid: false,
          errorField: 'customerName',
          errorMessage: 'Customer name is required (minimum 2 characters).',
        },
      };
    }

    // 2. Validate phone number if supplied
    if (input.customerPhone && input.customerPhone.trim()) {
      const cleanPhone = input.customerPhone.replace(/[\s\-\(\)\+]/g, '');
      if (cleanPhone.length < 10 || !/^\d+$/.test(cleanPhone)) {
        return {
          success: false,
          validation: {
            isValid: false,
            errorField: 'customerPhone',
            errorMessage: 'Please enter a valid 10-digit phone number.',
          },
        };
      }
    }

    // 3. Validate duration
    if (![60, 90, 120].includes(input.durationMinutes)) {
      return {
        success: false,
        validation: {
          isValid: false,
          errorField: 'duration',
          errorMessage: 'Invalid duration. Choose 60, 90, or 120 minutes.',
        },
      };
    }

    // 4. Validate conflict
    const availability = this.validateStationAvailability(
      input.stationName,
      input.startTime,
      input.durationMinutes
    );
    if (!availability.isValid) {
      return {
        success: false,
        validation: availability,
      };
    }

    // 5. Calculate derived attributes
    const calculatedEndTime = calculateEndTime(input.startTime, input.durationMinutes);
    const amount = calculateWalkInPrice(input.stationCategory, input.durationMinutes, input.playerCount);
    const newSerial = this.bookings.length + 1;
    const newId = `WB-${String(newSerial).padStart(3, '0')}`;

    const newBooking: WalkInBooking = {
      id: newId,
      serialNumber: newSerial,
      customerName: trimmedName,
      customerPhone: input.customerPhone?.trim() || undefined,
      stationName: input.stationName,
      stationCategory: input.stationCategory,
      startTime: input.startTime,
      endTime: calculatedEndTime,
      timeSlot: `${input.startTime} – ${calculatedEndTime}`,
      durationMinutes: input.durationMinutes,
      durationFormatted: `${input.durationMinutes} mins`,
      playerCount: input.stationCategory === 'simulator' ? 1 : input.playerCount,
      amount,
      bookingDate: 'Nov 05, 2026',
      createdAt: 'Just now',
      status: 'ongoing',
    };

    // Append new booking
    this.bookings = [...this.bookings, newBooking];

    return {
      success: true,
      booking: newBooking,
      validation: { isValid: true },
    };
  }

  /**
   * Resets bookings to initial mock list (useful for state resets)
   */
  reset(): void {
    this.bookings = [...INITIAL_TODAYS_WALK_IN_BOOKINGS];
  }
}

export const walkInBookingService = new WalkInBookingService();
