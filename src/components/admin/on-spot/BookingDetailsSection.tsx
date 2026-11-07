import React from 'react';
import { Calendar, Clock, User, Users, ArrowRight, Info } from 'lucide-react';
import {
  StationCategory,
  WalkInDuration,
  WalkInPlayerCount,
} from '../../../types/walkInBooking';
import { StartTimePicker } from './StartTimePicker';
import { EndTimeDisplay } from './EndTimeDisplay';

interface BookingDetailsSectionProps {
  category: StationCategory;
  duration: WalkInDuration;
  onDurationChange: (dur: WalkInDuration) => void;
  playerCount: WalkInPlayerCount;
  onPlayerCountChange: (count: WalkInPlayerCount) => void;
  startTime: string;
  onStartTimeChange: (time: string) => void;
  endTime: string;
}

export const BookingDetailsSection: React.FC<BookingDetailsSectionProps> = ({
  category,
  duration,
  onDurationChange,
  playerCount,
  onPlayerCountChange,
  startTime,
  onStartTimeChange,
  endTime,
}) => {
  const isRacing = category === 'simulator';

  return (
    <div className="space-y-2.5 sm:space-y-3">
      {/* Section Header */}
      <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
        <Calendar className="w-3.5 h-3.5 text-purple-400" />
        <span>Booking Details</span>
      </div>

      {/* Row 1: Duration on Left, Players on Right */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3.5 items-start">
        
        {/* Left: Duration Selector (60, 90, 120 Minutes) */}
        <div className="sm:col-span-7 space-y-1">
          <label className="block text-xs font-semibold text-zinc-300">
            • Duration <span className="text-purple-400">*</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {([60, 90, 120] as const).map((dur) => {
              const isSelected = duration === dur;
              return (
                <button
                  key={dur}
                  type="button"
                  onClick={() => onDurationChange(dur)}
                  className={`h-10 sm:h-10.5 px-2 rounded-xl sm:rounded-2xl text-xs sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.45)] border border-purple-400/50'
                      : 'bg-[#120d24] text-zinc-300 border border-purple-500/20 hover:border-purple-500/40 hover:text-white'
                  }`}
                >
                  <Clock className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-purple-400'}`} />
                  <span className="whitespace-nowrap">{dur} Minutes</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Players Selector (1 Player, 2 Players) */}
        <div className="sm:col-span-5 space-y-1">
          <label className="block text-xs font-semibold text-zinc-300">
            Players <span className="text-purple-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            {/* 1 Player */}
            <button
              type="button"
              onClick={() => onPlayerCountChange(1)}
              className={`h-10 sm:h-10.5 px-2 rounded-xl sm:rounded-2xl text-xs sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                playerCount === 1 || isRacing
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.45)] border border-purple-400/50'
                  : 'bg-[#120d24] text-zinc-300 border border-purple-500/20 hover:border-purple-500/40 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5 shrink-0" />
              <span>1 Player</span>
            </button>

            {/* 2 Players */}
            <button
              type="button"
              disabled={isRacing}
              onClick={() => !isRacing && onPlayerCountChange(2)}
              className={`h-10 sm:h-10.5 px-2 rounded-xl sm:rounded-2xl text-xs sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all duration-200 ${
                isRacing
                  ? 'bg-zinc-900/40 text-zinc-600 border border-zinc-800 cursor-not-allowed opacity-50'
                  : playerCount === 2
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.45)] border border-purple-400/50 cursor-pointer'
                  : 'bg-[#120d24] text-zinc-300 border border-purple-500/20 hover:border-purple-500/40 hover:text-white cursor-pointer'
              }`}
              title={isRacing ? 'Racing Simulators support 1 player only' : undefined}
            >
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span>2 Players</span>
            </button>
          </div>
        </div>

      </div>

      {/* Row 2: Start Time & Automatically Calculated End Time */}
      <div className="pt-0.5 space-y-1.5">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center">
          
          {/* Start Time with minute-precision picker */}
          <div className="sm:col-span-5 space-y-1">
            <label className="block text-xs font-semibold text-zinc-300">
              • Start Time <span className="text-purple-400">*</span>
            </label>
            <StartTimePicker
              value={startTime}
              onChange={onStartTimeChange}
            />
          </div>

          {/* Arrow Divider */}
          <div className="hidden sm:flex sm:col-span-2 items-center justify-center pt-4">
            <ArrowRight className="w-5 h-5 text-zinc-400 font-bold" />
          </div>

          {/* End Time (Read-only Auto Calculated) */}
          <div className="sm:col-span-5 space-y-1">
            <label className="block text-xs font-semibold text-zinc-300">
              End Time (Auto)
            </label>
            <EndTimeDisplay endTime={endTime} />
          </div>

        </div>

        {/* Small supporting message */}
        <div className="flex items-center gap-1.5 pt-0.5 text-zinc-400 text-[11px]">
          <Info className="w-3 h-3 text-purple-400 shrink-0" />
          <span>End time is calculated automatically based on the selected duration.</span>
        </div>
      </div>
    </div>
  );
};
