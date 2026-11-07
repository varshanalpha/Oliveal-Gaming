import React from 'react';
import { Clock, ChevronDown, ArrowRight } from 'lucide-react';
import { AdminOperatingHoursSettings } from '../../../types/adminSettings';

interface OperatingHoursCardProps {
  operatingHours: AdminOperatingHoursSettings;
  onChangeHours: (key: keyof AdminOperatingHoursSettings, val: string) => void;
}

const COMMON_TIME_OPTIONS = [
  '12:00 AM',
  '01:00 AM',
  '02:00 AM',
  '06:00 AM',
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '12:00 PM',
  '06:00 PM',
  '08:00 PM',
  '10:00 PM',
  '11:00 PM',
  '11:59 PM',
];

export const OperatingHoursCard: React.FC<OperatingHoursCardProps> = ({
  operatingHours,
  onChangeHours,
}) => {
  return (
    <div className="bg-[#0e0a1d]/90 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col justify-between space-y-4 hover:border-purple-500/35 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Clock className="w-5 h-5 text-fuchsia-400 shrink-0 stroke-[2.2]" />
        <h2 className="text-base sm:text-lg font-bold text-white font-display">
          Operating Hours
        </h2>
      </div>

      {/* Time Range Selector */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-zinc-300 px-1">
          <label htmlFor="admin-open-time" className="flex-1">
            Open Time
          </label>
          <div className="w-6 sm:w-8 shrink-0" aria-hidden="true" />
          <label htmlFor="admin-close-time" className="flex-1">
            Close Time
          </label>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Open Time */}
          <div className="flex-1 relative flex items-center">
            <Clock className="absolute left-3.5 w-4 h-4 text-zinc-400 pointer-events-none" />
            <select
              id="admin-open-time"
              value={operatingHours.openTime}
              onChange={(e) => onChangeHours('openTime', e.target.value)}
              className="w-full appearance-none pl-9 pr-8 py-2.5 rounded-xl bg-[#130d28]/90 border border-purple-500/25 text-white text-sm font-medium focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/40 transition-all duration-200 cursor-pointer"
            >
              {COMMON_TIME_OPTIONS.map((t) => (
                <option key={`open-${t}`} value={t} className="bg-[#120d24] text-white">
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>

          {/* Arrow Divider */}
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 shrink-0" />

          {/* Close Time */}
          <div className="flex-1 relative flex items-center">
            <Clock className="absolute left-3.5 w-4 h-4 text-zinc-400 pointer-events-none" />
            <select
              id="admin-close-time"
              value={operatingHours.closeTime}
              onChange={(e) => onChangeHours('closeTime', e.target.value)}
              className="w-full appearance-none pl-9 pr-8 py-2.5 rounded-xl bg-[#130d28]/90 border border-purple-500/25 text-white text-sm font-medium focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/40 transition-all duration-200 cursor-pointer"
            >
              {COMMON_TIME_OPTIONS.map((t) => (
                <option key={`close-${t}`} value={t} className="bg-[#120d24] text-white">
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
