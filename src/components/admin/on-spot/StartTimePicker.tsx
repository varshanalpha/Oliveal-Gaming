import React, { useState, useRef, useEffect } from 'react';
import { Clock, ChevronDown, Check, Zap } from 'lucide-react';

interface StartTimePickerProps {
  value: string; // e.g. "11:29 AM"
  onChange: (newTime: string) => void;
  disabled?: boolean;
}

export const StartTimePicker: React.FC<StartTimePickerProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse current value (e.g. "11:29 AM")
  const parseTime = (timeStr: string) => {
    const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) {
      return { hour: 11, minute: 29, period: 'AM' as 'AM' | 'PM' };
    }
    return {
      hour: parseInt(match[1], 10),
      minute: parseInt(match[2], 10),
      period: match[3].toUpperCase() as 'AM' | 'PM',
    };
  };

  const parsed = parseTime(value);
  const [selectedHour, setSelectedHour] = useState<number>(parsed.hour);
  const [selectedMinute, setSelectedMinute] = useState<number>(parsed.minute);
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>(parsed.period);
  const [customMinuteInput, setCustomMinuteInput] = useState<string>(
    String(parsed.minute).padStart(2, '0')
  );

  // Sync state when external value changes
  useEffect(() => {
    const p = parseTime(value);
    setSelectedHour(p.hour);
    setSelectedMinute(p.minute);
    setSelectedPeriod(p.period);
    setCustomMinuteInput(String(p.minute).padStart(2, '0'));
  }, [value]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const updateTime = (h: number, m: number, p: 'AM' | 'PM') => {
    const formattedHour = String(h).padStart(2, '0');
    const formattedMinute = String(m).padStart(2, '0');
    const newTimeString = `${formattedHour}:${formattedMinute} ${p}`;
    onChange(newTimeString);
  };

  const handleHourSelect = (h: number) => {
    setSelectedHour(h);
    updateTime(h, selectedMinute, selectedPeriod);
  };

  const handleMinuteSelect = (m: number) => {
    setSelectedMinute(m);
    setCustomMinuteInput(String(m).padStart(2, '0'));
    updateTime(selectedHour, m, selectedPeriod);
  };

  const handlePeriodToggle = (p: 'AM' | 'PM') => {
    setSelectedPeriod(p);
    updateTime(selectedHour, selectedMinute, p);
  };

  const handleCustomMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setCustomMinuteInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0 && num <= 59) {
      setSelectedMinute(num);
      updateTime(selectedHour, num, selectedPeriod);
    }
  };

  const handleSetCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const period: 'AM' | 'PM' = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    setSelectedHour(hours);
    setSelectedMinute(minutes);
    setSelectedPeriod(period);
    setCustomMinuteInput(String(minutes).padStart(2, '0'));
    updateTime(hours, minutes, period);
  };

  // Quick preset timestamps commonly used in admin test cases
  const PRESETS = [
    '11:00 AM',
    '11:17 AM',
    '11:29 AM',
    '12:43 PM',
    '01:00 PM',
    '02:17 PM',
    '03:10 PM',
    '06:15 PM',
    '06:43 PM',
  ];

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger Button Display */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl bg-[#120d24] border border-purple-500/30 hover:border-purple-500/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white font-medium flex items-center justify-between transition-all duration-200 cursor-pointer shadow-inner"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          <Clock className="w-4.5 h-4.5 text-purple-400 shrink-0" />
          <span className="text-sm sm:text-base font-semibold tracking-wide text-white">
            {value}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-purple-400' : ''
          }`}
        />
      </button>

      {/* Time Picker Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 mt-2 z-50 w-80 sm:w-88 rounded-2xl bg-[#0f0b21] border border-purple-500/40 p-4 shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header & Current Time Action */}
          <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Select Start Time (Minute Precision)
            </span>
            <button
              type="button"
              onClick={handleSetCurrentTime}
              className="flex items-center gap-1 text-[11px] font-semibold text-purple-300 hover:text-white bg-purple-950/60 border border-purple-500/30 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <Zap className="w-3 h-3 text-purple-400" />
              <span>Now</span>
            </button>
          </div>

          {/* Time Dial / Selectors */}
          <div className="py-3.5 space-y-3">
            <div className="grid grid-cols-12 gap-2 items-center">
              
              {/* Hours Column (1..12) */}
              <div className="col-span-5">
                <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Hour
                </label>
                <div className="grid grid-cols-4 gap-1 max-h-32 overflow-y-auto pr-1 scrollbar-thin">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => {
                    const isSelected = selectedHour === h;
                    return (
                      <button
                        key={h}
                        type="button"
                        onClick={() => handleHourSelect(h)}
                        className={`h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                            : 'bg-zinc-900/70 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                        }`}
                      >
                        {h}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Minute Column (Minute-level precision) */}
              <div className="col-span-4">
                <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Minute (00–59)
                </label>
                <div className="space-y-1.5">
                  <div className="flex items-center">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={customMinuteInput}
                      onChange={handleCustomMinuteChange}
                      placeholder="MM"
                      maxLength={2}
                      className="w-full h-8 px-2 text-center rounded-lg bg-zinc-900 border border-purple-500/30 text-white font-mono font-bold text-sm focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                  {/* Quick minute increments */}
                  <div className="grid grid-cols-3 gap-1">
                    {[0, 15, 29, 30, 45].map((m) => {
                      const isSelected = selectedMinute === m;
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => handleMinuteSelect(m)}
                          className={`h-6 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-purple-600 text-white'
                              : 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                          }`}
                        >
                          :{String(m).padStart(2, '0')}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* AM/PM Column */}
              <div className="col-span-3 flex flex-col justify-end gap-1.5">
                <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1 text-center">
                  Period
                </label>
                {(['AM', 'PM'] as const).map((p) => {
                  const isSelected = selectedPeriod === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handlePeriodToggle(p)}
                      className={`h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                          : 'bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Test Presets */}
            <div className="pt-2 border-t border-purple-500/15">
              <span className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                Quick Presets
              </span>
              <div className="flex flex-wrap gap-1">
                {PRESETS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      const p = parseTime(t);
                      setSelectedHour(p.hour);
                      setSelectedMinute(p.minute);
                      setSelectedPeriod(p.period);
                      setCustomMinuteInput(String(p.minute).padStart(2, '0'));
                      onChange(t);
                    }}
                    className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      value === t
                        ? 'bg-purple-600 text-white font-bold'
                        : 'bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Done Button */}
          <div className="pt-2 border-t border-purple-500/20 flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Done</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
