import React from 'react';
import { Gamepad2, Flag, Check } from 'lucide-react';
import { StationName, StationCategory } from '../../../types/walkInBooking';

import ps5ThumbImg from '../../../assets/dashboard/bookslot-ps5-thumb.png';
import rs1ThumbImg from '../../../assets/dashboard/station-rs1-thumb.png';
import rs2ThumbImg from '../../../assets/dashboard/station-rs2-thumb.png';

interface StationOption {
  id: StationName;
  name: StationName;
  category: StationCategory;
  categoryLabel: string;
  thumb: string;
}

const PS5_STATIONS: StationOption[] = [
  { id: 'ALPHA', name: 'ALPHA', category: 'ps5', categoryLabel: '(PS5)', thumb: ps5ThumbImg },
  { id: 'BETA', name: 'BETA', category: 'ps5', categoryLabel: '(PS5)', thumb: ps5ThumbImg },
  { id: 'GAMMA', name: 'GAMMA', category: 'ps5', categoryLabel: '(PS5)', thumb: ps5ThumbImg },
  { id: 'DELTA', name: 'DELTA', category: 'ps5', categoryLabel: '(PS5)', thumb: ps5ThumbImg },
];

const RACING_STATIONS: StationOption[] = [
  { id: 'RS1', name: 'RS1', category: 'simulator', categoryLabel: '(Racing)', thumb: rs1ThumbImg },
  { id: 'RS2', name: 'RS2', category: 'simulator', categoryLabel: '(Racing)', thumb: rs2ThumbImg },
];

interface StationSelectorProps {
  category: StationCategory;
  onCategoryChange: (cat: StationCategory) => void;
  selectedStation: StationName;
  onStationSelect: (station: StationName) => void;
}

export const StationSelector: React.FC<StationSelectorProps> = ({
  category,
  onCategoryChange,
  selectedStation,
  onStationSelect,
}) => {
  const activeStations = category === 'ps5' ? PS5_STATIONS : RACING_STATIONS;

  const handleTabClick = (newCat: StationCategory) => {
    onCategoryChange(newCat);
    if (newCat === 'ps5' && (selectedStation === 'RS1' || selectedStation === 'RS2')) {
      onStationSelect('ALPHA');
    } else if (newCat === 'simulator' && selectedStation !== 'RS1' && selectedStation !== 'RS2') {
      onStationSelect('RS1');
    }
  };

  return (
    <div className="space-y-2.5">
      {/* Section Header */}
      <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
        <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
        <span>Select Gaming Station</span>
      </div>

      {/* Category Tabs: PS5 vs Racing Simulators */}
      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
        {/* PS5 Tab */}
        <button
          type="button"
          onClick={() => handleTabClick('ps5')}
          className={`flex items-center gap-2.5 px-3 py-2 sm:py-2.5 rounded-2xl transition-all duration-200 cursor-pointer text-left ${
            category === 'ps5'
              ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/50'
              : 'bg-[#120d24] text-zinc-300 border border-purple-500/20 hover:border-purple-500/40 hover:text-white'
          }`}
        >
          <div
            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
              category === 'ps5' ? 'bg-white/20 text-white' : 'bg-purple-950/50 text-purple-400'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-[13px] font-bold truncate">PlayStation 5</p>
            <p
              className={`text-[10px] truncate ${
                category === 'ps5' ? 'text-purple-100' : 'text-zinc-500'
              }`}
            >
              (4 Stations)
            </p>
          </div>
        </button>

        {/* Racing Simulators Tab */}
        <button
          type="button"
          onClick={() => handleTabClick('simulator')}
          className={`flex items-center gap-2.5 px-3 py-2 sm:py-2.5 rounded-2xl transition-all duration-200 cursor-pointer text-left ${
            category === 'simulator'
              ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/50'
              : 'bg-[#120d24] text-zinc-300 border border-purple-500/20 hover:border-purple-500/40 hover:text-white'
          }`}
        >
          <div
            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
              category === 'simulator'
                ? 'bg-white/20 text-white'
                : 'bg-purple-950/50 text-purple-400'
            }`}
          >
            <Flag className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-[13px] font-bold truncate">Racing Simulators</p>
            <p
              className={`text-[10px] truncate ${
                category === 'simulator' ? 'text-purple-100' : 'text-zinc-500'
              }`}
            >
              (2 Stations)
            </p>
          </div>
        </button>
      </div>

      {/* Station Cards Grid */}
      <div
        className={`grid gap-2 sm:gap-2.5 ${
          category === 'ps5' ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-2'
        }`}
      >
        {activeStations.map((station) => {
          const isSelected = selectedStation === station.id;
          return (
            <button
              key={station.id}
              type="button"
              onClick={() => onStationSelect(station.id)}
              className={`relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-2xl transition-all duration-200 cursor-pointer text-center group ${
                isSelected
                  ? 'bg-purple-950/50 border-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                  : 'bg-[#120d24]/80 border border-purple-500/20 hover:border-purple-500/40 hover:bg-[#150f29]'
              }`}
            >
              {/* Checkmark badge on selected */}
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 w-4.5 h-4.5 rounded-full bg-purple-500 flex items-center justify-center shadow-md">
                  <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                </div>
              )}

              {/* Station Visual Thumbnail */}
              <div className="relative w-full h-10 sm:h-12 flex items-center justify-center mb-1 overflow-hidden">
                <img
                  src={station.thumb}
                  alt={station.name}
                  className={`max-h-full object-contain transition-transform duration-200 filter ${
                    isSelected
                      ? 'scale-105 drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]'
                      : 'opacity-85 group-hover:opacity-100 drop-shadow-[0_0_6px_rgba(168,85,247,0.3)]'
                  }`}
                />
              </div>

              {/* Station Name & Category Label */}
              <p className="text-xs sm:text-[13px] font-extrabold text-white tracking-wide leading-tight">
                {station.name}
              </p>
              <p className="text-[10px] text-zinc-400 font-sans mt-0.5 leading-none">
                {station.categoryLabel}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
