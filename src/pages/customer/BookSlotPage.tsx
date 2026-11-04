import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Check,
  CheckCircle2,
  Gamepad2,
  Tv,
  Flag,
  Info,
  AlertTriangle,
  QrCode,
  X,
  Users,
  ShieldAlert,
} from 'lucide-react';
import { CustomerShell } from '../../components/customer/layout/CustomerShell';
import { bookingService } from '../../services/bookingService';
import { MOCK_STATION_BOOKED_SLOTS } from '../../mock-data/customer';
import { BookedSlotRange, SlotValidationResult, CustomerBooking } from '../../types/customer';
import { formatINR } from '../../lib/utils';

import headerPs5Img from '../../assets/dashboard/bookslot-header-ps5.png';
import ps5ThumbImg from '../../assets/dashboard/bookslot-ps5-thumb.png';
import rs1ThumbImg from '../../assets/dashboard/station-rs1-thumb.png';
import rs2ThumbImg from '../../assets/dashboard/station-rs2-thumb.png';

// Generate 48 30-minute intervals throughout a 24-hour day
const TIME_OPTIONS = (() => {
  const times: string[] = [];
  for (let i = 0; i < 24 * 60; i += 30) {
    const hours = Math.floor(i / 60);
    const mins = i % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const h12 = hours % 12 || 12;
    times.push(`${String(h12).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${period}`);
  }
  return times;
})();

interface StationItem {
  id: string;
  name: 'ALPHA' | 'BETA' | 'GAMMA' | 'DELTA' | 'RS1' | 'RS2';
  category: 'ps5' | 'simulator';
  categoryLabel: string;
  thumb: string;
}

const PS5_STATIONS: StationItem[] = [
  { id: 'ALPHA', name: 'ALPHA', category: 'ps5', categoryLabel: 'PlayStation 5', thumb: ps5ThumbImg },
  { id: 'BETA', name: 'BETA', category: 'ps5', categoryLabel: 'PlayStation 5', thumb: ps5ThumbImg },
  { id: 'GAMMA', name: 'GAMMA', category: 'ps5', categoryLabel: 'PlayStation 5', thumb: ps5ThumbImg },
  { id: 'DELTA', name: 'DELTA', category: 'ps5', categoryLabel: 'PlayStation 5', thumb: ps5ThumbImg },
];

const SIMULATOR_STATIONS: StationItem[] = [
  { id: 'RS1', name: 'RS1', category: 'simulator', categoryLabel: 'Racing Simulator', thumb: rs1ThumbImg },
  { id: 'RS2', name: 'RS2', category: 'simulator', categoryLabel: 'Racing Simulator', thumb: rs2ThumbImg },
];

export const BookSlotPage: React.FC = () => {
  const navigate = useNavigate();

  // Category & Station Selection (Default: PS5 & ALPHA)
  const [category, setCategory] = useState<'ps5' | 'simulator'>('ps5');
  const [selectedStation, setSelectedStation] = useState<StationItem>(PS5_STATIONS[0]);

  // Duration & Custom Time Slot (Default: 60 Mins, 09:00 PM -> 10:00 PM matching reference image)
  const [duration, setDuration] = useState<60 | 90 | 120>(60);
  const [startTime, setStartTime] = useState<string>('09:00 PM');
  const [startTimeDropdownOpen, setStartTimeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Booked Slots (Initialized with mock data to prevent flash of empty state)
  const [bookedSlots, setBookedSlots] = useState<BookedSlotRange[]>(
    MOCK_STATION_BOOKED_SLOTS['ALPHA'] || []
  );
  const [validationResult, setValidationResult] = useState<SlotValidationResult>({ isValid: true });
  const [bookedSlotsScrollIndex, setBookedSlotsScrollIndex] = useState(0);

  // Confirmation Step / Modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [playerCount, setPlayerCount] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<CustomerBooking | null>(null);

  // Automatically calculate end time based on startTime + duration
  const endTime = useMemo(() => {
    return bookingService.calculateBookingEndTime(startTime, duration);
  }, [startTime, duration]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setStartTimeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch booked slots whenever selected station changes
  useEffect(() => {
    bookingService.getBookedSlots(selectedStation.name).then((slots) => {
      setBookedSlots(slots);
      setBookedSlotsScrollIndex(0);
    });
  }, [selectedStation]);

  // Validate conflict whenever station, start time, or duration changes
  useEffect(() => {
    bookingService.validateBookingSlot(selectedStation.name, startTime, duration).then(setValidationResult);
  }, [selectedStation, startTime, duration]);

  // Handle switching category
  const handleCategoryChange = (newCat: 'ps5' | 'simulator') => {
    setCategory(newCat);
    if (newCat === 'ps5') {
      setSelectedStation(PS5_STATIONS[0]);
    } else {
      setSelectedStation(SIMULATOR_STATIONS[0]);
      setPlayerCount(1); // Simulators are 1 player
    }
  };

  // Pricing calculation
  const totalAmount = useMemo(() => {
    return bookingService.calculateBookingPrice(category, duration, playerCount);
  }, [category, duration, playerCount]);

  // Scroll Booked Slots
  const handleScrollBookedSlots = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setBookedSlotsScrollIndex((prev) => Math.max(0, prev - 1));
    } else {
      setBookedSlotsScrollIndex((prev) => Math.min(Math.max(0, bookedSlots.length - 2), prev + 1));
    }
  };

  // Handle Book Slot Click
  const handleBookSlotClick = () => {
    if (!validationResult.isValid) return;
    setShowConfirmModal(true);
  };

  // Complete Reservation
  const handleConfirmReservation = async () => {
    setIsSubmitting(true);
    const newBk = await bookingService.createMockBooking({
      stationName: selectedStation.name,
      stationType: selectedStation.category,
      bookingDate: 'Today, Nov 04, 2026',
      startTime,
      endTime,
      duration: `${duration} Minutes`,
      durationMinutes: duration,
      playerCount,
      totalAmount,
      stationThumb: selectedStation.thumb,
    });
    setIsSubmitting(false);
    setConfirmedBooking(newBk);
  };

  const currentStationList = category === 'ps5' ? PS5_STATIONS : SIMULATOR_STATIONS;

  return (
    <CustomerShell pageTitle="Book Slot">
      <div className="space-y-4 sm:space-y-4.5 w-full max-w-7xl mx-auto pb-4">
        
        {/* ======================================================== */}
        {/* MAIN PAGE HEADER WITH INTEGRATED PROGRESS BAR & PS5 RIGS */}
        {/* ======================================================== */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 relative">
          
          {/* Left Column: Heading + Subtitle + Progress Indicator */}
          <div className="space-y-3">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold font-display text-white tracking-tight leading-tight">
                Book Your <span className="text-purple-400">Gaming Slot</span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-xl">
                Choose a station, set your playtime (60–120 minutes), create your own time slot, and book your session.
              </p>
            </div>

            {/* Horizontal Three-Step Progress Indicator (Exactly aligned like reference) */}
            <div className="inline-flex py-2 px-5 sm:px-6 rounded-2xl bg-[#0c0919]/90 border border-purple-500/20 items-center gap-3 sm:gap-6 select-none shadow-sm">
              {/* Step 1 */}
              <div className="flex items-center gap-2.5">
                <div className="w-5.5 h-5.5 rounded-full bg-purple-600 text-white font-display font-bold text-xs flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.55)]">
                  1
                </div>
                <span className="font-semibold text-white tracking-wide text-xs sm:text-sm">
                  Select Station
                </span>
              </div>

              <div className="w-8 sm:w-14 h-0.5 bg-purple-500/40 rounded-full" />

              {/* Step 2 */}
              <div className="flex items-center gap-2.5">
                <div className="w-5.5 h-5.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-display font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <span className="font-medium text-zinc-300 text-xs sm:text-sm">
                  Create Time Slot
                </span>
              </div>

              <div className="w-8 sm:w-14 h-0.5 bg-zinc-800 rounded-full" />

              {/* Step 3 */}
              <div className="flex items-center gap-2.5">
                <div className="w-5.5 h-5.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 font-display font-bold text-xs flex items-center justify-center">
                  3
                </div>
                <span className="font-medium text-zinc-500 text-xs sm:text-sm">
                  Confirm Booking
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: PS5 Console + Controller with Purple Neon Glow */}
          <div className="hidden xl:flex items-center justify-end shrink-0">
            <img
              src={headerPs5Img}
              alt="PlayStation 5 Console & Controller"
              className="w-56 lg:w-64 h-auto object-contain filter drop-shadow-[0_0_25px_rgba(168,85,247,0.45)]"
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 1: SELECT GAMING STATION                            */}
        {/* ======================================================== */}
        <div className="space-y-2.5 sm:space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-5.5 h-5.5 rounded-full bg-purple-600 text-white font-display font-bold text-xs flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.5)] shrink-0">
              1
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg lg:text-[19px] text-white">
              Select Gaming Station
            </h3>
          </div>

          {/* Category Toggle (Full width matching station cards) */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[#0c0919] border border-purple-500/25 w-full">
            {/* Option 1: PlayStation 5 */}
            <button
              type="button"
              onClick={() => handleCategoryChange('ps5')}
              className={`py-2.5 sm:py-3 px-4 rounded-xl text-sm sm:text-[15px] font-display font-bold transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer ${
                category === 'ps5'
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.45)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              <Tv className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>PlayStation 5</span>
              <span className={`text-xs sm:text-sm font-medium ${category === 'ps5' ? 'text-purple-200' : 'text-zinc-500'}`}>
                (4 Stations)
              </span>
            </button>

            {/* Option 2: Racing Simulators */}
            <button
              type="button"
              onClick={() => handleCategoryChange('simulator')}
              className={`py-2.5 sm:py-3 px-4 rounded-xl text-sm sm:text-[15px] font-display font-bold transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer ${
                category === 'simulator'
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.45)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              <Flag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>Racing Simulators</span>
              <span className={`text-xs sm:text-sm font-medium ${category === 'simulator' ? 'text-purple-200' : 'text-zinc-500'}`}>
                (2 Stations)
              </span>
            </button>
          </div>

          {/* Station Cards Grid */}
          <div className={`grid gap-3 sm:gap-3.5 ${category === 'ps5' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto w-full'}`}>
            {currentStationList.map((st) => {
              const isSelected = selectedStation.name === st.name;
              return (
                <div
                  key={st.id}
                  onClick={() => setSelectedStation(st)}
                  className={`rounded-2xl p-3 sm:p-3.5 transition-all duration-200 cursor-pointer relative group flex flex-col justify-between select-none ${
                    isSelected
                      ? 'bg-[#120f26] border-2 border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.35)] ring-1 ring-purple-400/40'
                      : 'bg-[#0e0c1f] border border-purple-500/20 hover:border-purple-500/50 hover:bg-[#131029]'
                  }`}
                >
                  {/* Selected Checkmark Badge (Top-Right) */}
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-md animate-in zoom-in-75 duration-150">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}

                  {/* Thumbnail Image Container */}
                  <div className="w-full h-20 sm:h-22 rounded-xl bg-zinc-950/70 border border-purple-500/10 flex items-center justify-center p-1.5 mb-1.5 relative overflow-hidden">
                    <img
                      src={st.thumb}
                      alt={st.name}
                      className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Station Name & Category */}
                  <div className="text-center pt-0.5">
                    <h4 className="font-display font-black text-sm sm:text-base lg:text-[17px] text-white tracking-wider">
                      {st.name}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-zinc-400 mt-0.5">
                      {st.categoryLabel}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 2: CREATE YOUR TIME SLOT                            */}
        {/* ======================================================== */}
        <div className="space-y-2.5 sm:space-y-3 pt-0.5">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-5.5 h-5.5 rounded-full bg-purple-600 text-white font-display font-bold text-xs flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.5)] shrink-0">
                2
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg lg:text-[19px] text-white">
                Create Your Time Slot
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 pl-8 font-sans mt-0.5">
              Choose your playtime duration and create a custom time slot.
            </p>
          </div>

          {/* Time Controls Layout (Playtime Duration + Set Time Slot + Info Card) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 sm:gap-4 items-stretch">
            
            {/* Playtime Duration (3 buttons) */}
            <div className="md:col-span-1 xl:col-span-5 space-y-1">
              <label className="text-xs sm:text-[13px] font-semibold text-zinc-300 block">
                Playtime Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([60, 90, 120] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDuration(d)}
                    className={`py-2 sm:py-2.5 px-2 rounded-xl text-xs sm:text-sm font-display font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                      duration === d
                        ? 'bg-purple-600 text-white shadow-[0_0_16px_rgba(168,85,247,0.45)]'
                        : 'bg-[#0e0c1f] border border-purple-500/20 text-zinc-300 hover:text-white hover:bg-zinc-900/60'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{d} Minutes</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Set Your Time Slot (Start Time -> End Time) */}
            <div className="md:col-span-1 xl:col-span-4 space-y-1">
              <label className="text-xs sm:text-[13px] font-semibold text-zinc-300 block">
                Set Your Time Slot
              </label>

              <div className="p-1 rounded-xl bg-[#0e0c1f] border border-purple-500/20 flex items-center justify-between gap-1.5 h-[46px]">
                
                {/* Start Time Selector */}
                <div className="relative flex-1 h-full" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setStartTimeDropdownOpen(!startTimeDropdownOpen)}
                    className="w-full h-full py-1 px-2.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-white flex items-center justify-between gap-1.5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <div className="text-left">
                        <span className="text-[8px] text-zinc-400 uppercase tracking-wider block font-sans leading-none mb-0.5 whitespace-nowrap">Start Time</span>
                        <span className="font-bold text-white leading-none text-xs sm:text-sm font-mono whitespace-nowrap">{startTime}</span>
                      </div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  </button>

                  {/* Dropdown Menu */}
                  {startTimeDropdownOpen && (
                    <div className="absolute left-0 mt-1 w-48 max-h-56 overflow-y-auto rounded-xl bg-[#130f29] border border-purple-500/30 shadow-2xl z-30 p-1.5 divide-y divide-purple-500/10">
                      {TIME_OPTIONS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            setStartTime(t);
                            setStartTimeDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs sm:text-sm font-mono rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                            startTime === t
                              ? 'bg-purple-600 text-white font-bold'
                              : 'text-zinc-300 hover:bg-zinc-800/80'
                          }`}
                        >
                          <span>{t}</span>
                          {startTime === t && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Arrow Divider */}
                <span className="text-zinc-500 font-bold shrink-0 text-sm px-0.5">→</span>

                {/* End Time (Auto-calculated, read-only) */}
                <div className="flex-1 h-full py-1 px-2.5 rounded-lg bg-zinc-900/40 text-zinc-300 flex items-center justify-between gap-1.5 border border-purple-500/10">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <div className="text-left">
                      <span className="text-[8px] text-zinc-400 uppercase tracking-wider block font-sans leading-none mb-0.5 whitespace-nowrap">End Time</span>
                      <span className="font-bold text-white leading-none text-xs sm:text-sm font-mono whitespace-nowrap">{endTime}</span>
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-600 shrink-0 opacity-40" />
                </div>

              </div>
            </div>

            {/* Info Box */}
            <div className="md:col-span-2 xl:col-span-3 flex items-end">
              <div className="w-full p-2.5 rounded-xl bg-[#0e0c1f] border border-purple-500/20 flex items-center gap-2.5 text-zinc-300 min-h-[46px]">
                <div className="w-5 h-5 rounded-full bg-purple-950/70 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Info className="w-3.5 h-3.5" />
                </div>
                <p className="text-[11px] sm:text-xs leading-tight text-zinc-400">
                  Playtime can be 60, 90, or 120 minutes. You can choose any time slot.
                </p>
              </div>
            </div>

          </div>

          {/* Conflict Feedback Banner (If Overlap Detected) */}
          {!validationResult.isValid && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs sm:text-sm flex items-center gap-3 animate-in fade-in">
              <AlertTriangle className="w-4.5 h-4.5 text-rose-400 shrink-0" />
              <span>
                <strong className="font-bold text-white">Time Slot Conflict:</strong> {validationResult.errorMessage}
              </span>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* STEP 3: BOOKED SLOTS (Strictly existing bookings)        */}
        {/* ======================================================== */}
        <div className="space-y-2.5 sm:space-y-3 pt-0.5">
          <div className="flex items-center gap-2.5">
            <div className="w-5.5 h-5.5 rounded-full bg-purple-600 text-white font-display font-bold text-xs flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.5)] shrink-0">
              3
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg lg:text-[19px] text-white">
              Booked Slots
            </h3>
          </div>

          {/* Booked Slots Horizontal Container matching reference image */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-[#0e0c1f] border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Left: Station Identity */}
            <div className="flex items-center gap-2.5 self-start sm:self-center">
              <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-black text-sm sm:text-base text-white tracking-wide">
                  {selectedStation.name}
                </h4>
                <span className="text-[11px] text-zinc-400 font-mono">
                  ({selectedStation.category === 'ps5' ? 'PS5' : 'Simulator'})
                </span>
              </div>
            </div>

            {/* Center: Booked Slot Chips Timeline with Scroll Navigators */}
            <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden justify-center">
              {/* Left Scroll Arrow */}
              <button
                type="button"
                onClick={() => handleScrollBookedSlots('left')}
                disabled={bookedSlotsScrollIndex === 0}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-900 border border-purple-500/25 flex items-center justify-center text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Booked Chips */}
              <div className="flex items-center gap-2.5 overflow-x-auto py-0.5">
                {bookedSlots.length === 0 ? (
                  <span className="text-xs sm:text-sm text-zinc-400 font-mono py-1">
                    No existing bookings for Station {selectedStation.name} today.
                  </span>
                ) : (
                  bookedSlots.slice(bookedSlotsScrollIndex, bookedSlotsScrollIndex + 2).map((slot) => (
                    <div
                      key={slot.id}
                      className="px-6 sm:px-8 py-2 sm:py-2.5 rounded-xl bg-[#260a14] border border-red-500/40 text-red-300 font-mono text-xs sm:text-sm font-bold shadow-[0_0_12px_rgba(239,68,68,0.15)] shrink-0 whitespace-nowrap"
                    >
                      {slot.label}
                    </div>
                  ))
                )}
              </div>

              {/* Right Scroll Arrow */}
              <button
                type="button"
                onClick={() => handleScrollBookedSlots('right')}
                disabled={bookedSlotsScrollIndex >= Math.max(0, bookedSlots.length - 2)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-900 border border-purple-500/25 flex items-center justify-center text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Spacer for symmetrical desktop balance */}
            <div className="hidden sm:block w-8" />
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN BOOK SLOT CTA BUTTON                                */}
        {/* ======================================================== */}
        <div className="pt-2 flex flex-col items-center">
          <button
            type="button"
            onClick={handleBookSlotClick}
            disabled={!validationResult.isValid}
            className={`w-full sm:w-auto min-w-[240px] sm:min-w-[260px] px-12 sm:px-14 py-3 sm:py-3.5 rounded-full font-display font-bold text-sm sm:text-base tracking-wide transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer ${
              validationResult.isValid
                ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_30px_rgba(168,85,247,0.55)] hover:scale-[1.03]'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-60'
            }`}
          >
            <span>Book Slot</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>

          {!validationResult.isValid && (
            <p className="text-xs text-rose-400 mt-1.5 font-mono">
              Please resolve the slot conflict above to proceed.
            </p>
          )}
        </div>

        {/* ======================================================== */}
        {/* CONFIRMATION MODAL & RESERVATION PASS                    */}
        {/* ======================================================== */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md animate-in fade-in"
              onClick={() => {
                if (!isSubmitting) setShowConfirmModal(false);
              }}
            />

            <div className="relative w-full max-w-lg rounded-3xl bg-[#110f24] border border-purple-500/30 p-6 sm:p-7 shadow-[0_0_50px_rgba(168,85,247,0.3)] z-10 animate-in zoom-in-95 duration-200">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block">
                    Step 3: Confirm Booking
                  </span>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                    Review Reservation Pass
                  </h3>
                </div>

                {!confirmedBooking && (
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {!confirmedBooking ? (
                /* Pre-confirmation review form */
                <div className="space-y-4 pt-4 text-xs sm:text-sm">
                  {/* Station & Timing Summary Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-purple-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block">
                          {selectedStation.categoryLabel}
                        </span>
                        <h4 className="font-display font-black text-xl text-white">
                          Station {selectedStation.name}
                        </h4>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                        Slot Available
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-zinc-300 pt-3 border-t border-purple-500/10 text-xs sm:text-sm">
                      <div>
                        <span className="text-zinc-500 text-xs block">Schedule</span>
                        <span className="font-semibold text-white">Today, Nov 04</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-xs block">Allocated Time</span>
                        <span className="font-semibold text-purple-300">{startTime} – {endTime}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-xs block">Playtime</span>
                        <span className="font-semibold text-white">{duration} Minutes</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-xs block">Pricing Tier</span>
                        <span className="font-semibold text-white">
                          {category === 'ps5'
                            ? playerCount === 1
                              ? '₹150/hr (1 Player)'
                              : '₹200/hr (2 Players)'
                            : '₹200/hr (Simulator)'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Player Count Selection (for PS5 setups) */}
                  {category === 'ps5' && (
                    <div className="space-y-2">
                      <label className="font-semibold text-zinc-300 block text-xs sm:text-sm">
                        Select Player Count
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setPlayerCount(1)}
                          className={`py-2.5 px-3 rounded-xl font-display font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm ${
                            playerCount === 1
                              ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                              : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                          }`}
                        >
                          <Users className="w-4 h-4" />
                          <span>1 Player (₹150/hr)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPlayerCount(2)}
                          className={`py-2.5 px-3 rounded-xl font-display font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm ${
                            playerCount === 2
                              ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                              : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                          }`}
                        >
                          <Users className="w-4 h-4" />
                          <span>2 Players (₹200/hr)</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Total Amount Card */}
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-purple-500/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-zinc-400 block">Total Amount Payable</span>
                      <span className="text-2xl font-display font-black text-emerald-400">
                        {formatINR(totalAmount)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono text-purple-400 block font-bold">
                        5-Min Checkout Lock
                      </span>
                      <span className="text-xs text-zinc-400">
                        Asia/Kolkata IST
                      </span>
                    </div>
                  </div>

                  {/* Strict Policy Alert */}
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-start gap-2.5 text-xs text-zinc-400">
                    <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>
                      Strict Policy: All confirmed reservations are non-cancellable and non-refundable. Please arrive 5 minutes prior to your allocated slot.
                    </span>
                  </div>

                  {/* Confirm CTA */}
                  <button
                    type="button"
                    onClick={handleConfirmReservation}
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-display font-bold text-sm sm:text-base shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Confirming Reservation...' : `Confirm & Book Slot (${formatINR(totalAmount)})`}
                  </button>
                </div>
              ) : (
                /* Confirmed Booking Pass with QR Code */
                <div className="space-y-4 pt-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div>
                    <h4 className="font-display font-extrabold text-xl text-white">
                      Reservation Confirmed!
                    </h4>
                    <p className="text-sm font-mono text-purple-400 mt-1">
                      Pass Code: {confirmedBooking.bookingCode}
                    </p>
                  </div>

                  {/* QR Code Pass Card */}
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-purple-500/30 flex flex-col items-center justify-center space-y-2">
                    <div className="w-36 h-36 rounded-xl bg-white p-2.5 shadow-lg flex items-center justify-center">
                      <QrCode className="w-28 h-28 text-purple-700" />
                    </div>
                    <span className="text-sm font-display font-bold text-white pt-1">
                      Station {confirmedBooking.stationName} • {confirmedBooking.startTime} – {confirmedBooking.endTime}
                    </span>
                    <span className="text-xs sm:text-sm text-emerald-400 font-semibold">
                      Total Paid: {formatINR(confirmedBooking.totalAmount)}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400">
                    Your QR pass has been saved to your account. Present this pass at the front desk when you arrive.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowConfirmModal(false);
                        setConfirmedBooking(null);
                      }}
                      className="py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs sm:text-sm font-semibold cursor-pointer"
                    >
                      Book Another Slot
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/customer/bookings')}
                      className="py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-purple-900/40 cursor-pointer"
                    >
                      View in My Bookings
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </CustomerShell>
  );
};
