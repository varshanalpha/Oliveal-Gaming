import React, { useState, useMemo } from 'react';
import { Plus, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import {
  StationName,
  StationCategory,
  WalkInDuration,
  WalkInPlayerCount,
  WalkInBooking,
} from '../../../types/walkInBooking';
import {
  walkInBookingService,
  calculateEndTime,
  calculateWalkInPrice,
} from '../../../services/walkInBookingService';
import { CustomerDetailsForm } from './CustomerDetailsForm';
import { StationSelector } from './StationSelector';
import { BookingDetailsSection } from './BookingDetailsSection';
import { BookingPriceSummary } from './BookingPriceSummary';

interface CreateWalkInBookingFormProps {
  onBookingCreated: (booking: WalkInBooking) => void;
}

export const CreateWalkInBookingForm: React.FC<CreateWalkInBookingFormProps> = ({
  onBookingCreated,
}) => {
  // Form State
  const [customerName, setCustomerName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [category, setCategory] = useState<StationCategory>('ps5');
  const [selectedStation, setSelectedStation] = useState<StationName>('ALPHA');
  const [duration, setDuration] = useState<WalkInDuration>(60);
  const [playerCount, setPlayerCount] = useState<WalkInPlayerCount>(1);
  const [startTime, setStartTime] = useState<string>('11:29 AM');

  // Submission & Feedback State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [conflictError, setConflictError] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  // Derived: Automatic End Time Calculation (End Time = Start Time + Selected Duration)
  const endTime = useMemo(() => {
    return calculateEndTime(startTime, duration);
  }, [startTime, duration]);

  // Derived: Dynamic Price Calculation
  const amount = useMemo(() => {
    return calculateWalkInPrice(category, duration, playerCount);
  }, [category, duration, playerCount]);

  // Handle Form Submission
  const handleSubmit = async () => {
    setNameError(undefined);
    setPhoneError(undefined);
    setConflictError(undefined);
    setSuccessMessage(undefined);

    // Immediate Client Validation
    if (!customerName.trim()) {
      setNameError('Customer name is required.');
      return;
    }

    if (phoneNumber.trim()) {
      const clean = phoneNumber.replace(/[\s\-\(\)\+]/g, '');
      if (clean.length < 10 || !/^\d+$/.test(clean)) {
        setPhoneError('Please enter a valid 10-digit phone number.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const result = await walkInBookingService.createWalkInBooking({
        customerName: customerName.trim(),
        customerPhone: phoneNumber.trim() || undefined,
        stationName: selectedStation,
        stationCategory: category,
        startTime,
        durationMinutes: duration,
        playerCount: category === 'simulator' ? 1 : playerCount,
      });

      if (!result.success || !result.booking) {
        if (result.validation?.errorField === 'customerName') {
          setNameError(result.validation.errorMessage);
        } else if (result.validation?.errorField === 'customerPhone') {
          setPhoneError(result.validation.errorMessage);
        } else if (result.validation?.errorField === 'conflict') {
          setConflictError(result.validation.errorMessage);
        } else {
          setConflictError(result.validation?.errorMessage || 'Failed to create booking.');
        }
        setIsSubmitting(false);
        return;
      }

      // Success
      setSuccessMessage(
        `Walk-in booking created successfully for ${result.booking.customerName} on ${result.booking.stationName} (${result.booking.timeSlot}).`
      );
      onBookingCreated(result.booking);

      // Reset customer details for next customer, keep reasonable defaults
      setCustomerName('');
      setPhoneNumber('');
    } catch {
      setConflictError('An unexpected error occurred while creating booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl bg-[#0e0a1d]/90 border border-purple-500/25 p-4 sm:p-5 lg:p-5.5 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl relative space-y-3.5 sm:space-y-4">
      
      {/* Form Card Header */}
      <div className="flex items-center gap-2.5 pb-2.5 border-b border-purple-500/15">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-400 flex items-center justify-center font-bold text-sm shadow-[0_0_12px_rgba(168,85,247,0.3)]">
          <Plus className="w-4 h-4" />
        </div>
        <h2 className="text-lg sm:text-xl lg:text-[21px] font-bold text-white font-display tracking-tight">
          Create Walk-in Booking
        </h2>
      </div>

      {/* Conflict / General Error Alert Banner */}
      {conflictError && (
        <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/40 flex items-start justify-between gap-3 text-red-200 text-xs sm:text-sm animate-in fade-in slide-in-from-top-1">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-300">Slot Unavailable</p>
              <p className="text-red-200/90 text-xs mt-0.5">{conflictError}</p>
            </div>
          </div>
          <button
            onClick={() => setConflictError(undefined)}
            className="text-red-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Success Alert Banner */}
      {successMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-start justify-between gap-3 text-emerald-200 text-xs sm:text-sm animate-in fade-in slide-in-from-top-1">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-300">Booking Confirmed</p>
              <p className="text-emerald-200/90 text-xs mt-0.5">{successMessage}</p>
            </div>
          </div>
          <button
            onClick={() => setSuccessMessage(undefined)}
            className="text-emerald-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Section A: Customer Details */}
      <CustomerDetailsForm
        customerName={customerName}
        onCustomerNameChange={(val) => {
          setCustomerName(val);
          if (nameError) setNameError(undefined);
        }}
        phoneNumber={phoneNumber}
        onPhoneNumberChange={(val) => {
          setPhoneNumber(val);
          if (phoneError) setPhoneError(undefined);
        }}
        nameError={nameError}
        phoneError={phoneError}
      />

      {/* Section B: Select Gaming Station */}
      <StationSelector
        category={category}
        onCategoryChange={setCategory}
        selectedStation={selectedStation}
        onStationSelect={setSelectedStation}
      />

      {/* Section C: Booking Details (Duration, Players, Start Time, Auto End Time) */}
      <BookingDetailsSection
        category={category}
        duration={duration}
        onDurationChange={setDuration}
        playerCount={playerCount}
        onPlayerCountChange={setPlayerCount}
        startTime={startTime}
        onStartTimeChange={(newTime) => {
          setStartTime(newTime);
          if (conflictError) setConflictError(undefined);
        }}
        endTime={endTime}
      />

      {/* Section D: Price Summary & Create Booking Action */}
      <BookingPriceSummary
        duration={duration}
        amount={amount}
        category={category}
        playerCount={playerCount}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />

    </div>
  );
};
