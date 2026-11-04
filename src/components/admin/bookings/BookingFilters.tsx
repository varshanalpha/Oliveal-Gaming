import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Calendar, Check, X } from 'lucide-react';
import { AdminBookingFiltersState } from '../../../types/adminBooking';

interface BookingFiltersProps {
  filters: AdminBookingFiltersState;
  onFilterChange: (newFilters: AdminBookingFiltersState) => void;
}

export const BookingFilters: React.FC<BookingFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  // Dropdown open states
  const [stationOpen, setStationOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setStationOpen(false);
        setTypeOpen(false);
        setStatusOpen(false);
        setDateOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options
  const STATION_OPTIONS = [
    { value: 'all', label: 'All Stations' },
    { value: 'ALPHA', label: 'ALPHA' },
    { value: 'BETA', label: 'BETA' },
    { value: 'GAMMA', label: 'GAMMA' },
    { value: 'DELTA', label: 'DELTA' },
    { value: 'RS1', label: 'RS1' },
    { value: 'RS2', label: 'RS2' },
  ];

  const TYPE_OPTIONS = [
    { value: 'all', label: 'All Types' },
    { value: 'online', label: 'Online Bookings' },
  ];

  const STATUS_OPTIONS = [
    { value: 'all', label: 'All Status' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' },
  ];

  const DATE_OPTIONS = [
    { value: 'last7', label: 'Last 7 Days' },
    { value: 'today', label: 'Today' },
    { value: 'last30', label: 'Last 30 Days' },
    { value: 'all', label: 'All Time' },
  ];

  const selectedStationLabel =
    STATION_OPTIONS.find((s) => s.value === filters.station)?.label || 'All Stations';
  const selectedTypeLabel =
    TYPE_OPTIONS.find((t) => t.value === filters.bookingType)?.label || 'All Types';
  const selectedStatusLabel =
    STATUS_OPTIONS.find((st) => st.value === filters.status)?.label || 'All Status';
  const selectedDateLabel =
    DATE_OPTIONS.find((d) => d.value === filters.dateRange)?.label || 'Last 7 Days';

  return (
    <div
      ref={containerRef}
      className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 sm:gap-3 w-full"
    >
      {/* 1. Search Bar */}
      <div className="relative flex-1 rounded-xl bg-[#0f0a1d] border border-purple-500/20 px-3.5 py-2.5 flex items-center gap-2.5 transition-all duration-200 focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/20">
        <Search className="w-4 h-4 text-zinc-400 shrink-0" />
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) =>
            onFilterChange({ ...filters, searchQuery: e.target.value })
          }
          placeholder="Search by customer, booking ID or station..."
          className="bg-transparent text-white placeholder:text-zinc-500 text-xs sm:text-sm font-sans focus:outline-none w-full"
        />
        {filters.searchQuery && (
          <button
            onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
            className="text-zinc-400 hover:text-white p-0.5 rounded cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Dropdowns Grid / Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
        
        {/* 2. Station Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setStationOpen(!stationOpen);
              setTypeOpen(false);
              setStatusOpen(false);
              setDateOpen(false);
            }}
            className="w-full h-10 px-3.5 rounded-xl bg-[#0f0a1d] border border-purple-500/20 flex items-center justify-between gap-2 text-xs sm:text-sm text-zinc-300 hover:text-white hover:border-purple-500/40 transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="truncate">{selectedStationLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          </button>

          {stationOpen && (
            <div className="absolute right-0 sm:left-0 mt-1.5 w-44 rounded-xl bg-[#130b24] border border-purple-500/30 shadow-2xl p-1 z-30 divide-y divide-purple-500/10">
              {STATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onFilterChange({ ...filters, station: opt.value });
                    setStationOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    filters.station === opt.value
                      ? 'bg-purple-600 text-white font-semibold'
                      : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
                  }`}
                >
                  <span>{opt.label}</span>
                  {filters.station === opt.value && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Booking Type Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setTypeOpen(!typeOpen);
              setStationOpen(false);
              setStatusOpen(false);
              setDateOpen(false);
            }}
            className="w-full h-10 px-3.5 rounded-xl bg-[#0f0a1d] border border-purple-500/20 flex items-center justify-between gap-2 text-xs sm:text-sm text-zinc-300 hover:text-white hover:border-purple-500/40 transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="truncate">{selectedTypeLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          </button>

          {typeOpen && (
            <div className="absolute right-0 sm:left-0 mt-1.5 w-44 rounded-xl bg-[#130b24] border border-purple-500/30 shadow-2xl p-1 z-30 divide-y divide-purple-500/10">
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onFilterChange({ ...filters, bookingType: opt.value });
                    setTypeOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    filters.bookingType === opt.value
                      ? 'bg-purple-600 text-white font-semibold'
                      : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
                  }`}
                >
                  <span>{opt.label}</span>
                  {filters.bookingType === opt.value && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 4. Booking Status Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setStatusOpen(!statusOpen);
              setStationOpen(false);
              setTypeOpen(false);
              setDateOpen(false);
            }}
            className="w-full h-10 px-3.5 rounded-xl bg-[#0f0a1d] border border-purple-500/20 flex items-center justify-between gap-2 text-xs sm:text-sm text-zinc-300 hover:text-white hover:border-purple-500/40 transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="truncate">{selectedStatusLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          </button>

          {statusOpen && (
            <div className="absolute right-0 sm:left-0 mt-1.5 w-44 rounded-xl bg-[#130b24] border border-purple-500/30 shadow-2xl p-1 z-30 divide-y divide-purple-500/10">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onFilterChange({ ...filters, status: opt.value });
                    setStatusOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    filters.status === opt.value
                      ? 'bg-purple-600 text-white font-semibold'
                      : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
                  }`}
                >
                  <span>{opt.label}</span>
                  {filters.status === opt.value && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 5. Date Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setDateOpen(!dateOpen);
              setStationOpen(false);
              setTypeOpen(false);
              setStatusOpen(false);
            }}
            className="w-full h-10 px-3.5 rounded-xl bg-[#0f0a1d] border border-purple-500/20 flex items-center justify-between gap-2 text-xs sm:text-sm text-zinc-300 hover:text-white hover:border-purple-500/40 transition-colors cursor-pointer whitespace-nowrap"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="truncate">{selectedDateLabel}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          </button>

          {dateOpen && (
            <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-[#130b24] border border-purple-500/30 shadow-2xl p-1 z-30 divide-y divide-purple-500/10">
              {DATE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onFilterChange({ ...filters, dateRange: opt.value as any });
                    setDateOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    filters.dateRange === opt.value
                      ? 'bg-purple-600 text-white font-semibold'
                      : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
                  }`}
                >
                  <span>{opt.label}</span>
                  {filters.dateRange === opt.value && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
