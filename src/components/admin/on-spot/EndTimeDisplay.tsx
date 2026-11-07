import React from 'react';
import { Clock } from 'lucide-react';

interface EndTimeDisplayProps {
  endTime: string; // e.g. "12:29 PM"
}

export const EndTimeDisplay: React.FC<EndTimeDisplayProps> = ({ endTime }) => {
  return (
    <div className="w-full h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl bg-[#0d091a]/70 border border-purple-500/20 text-zinc-300 font-medium flex items-center justify-between select-none cursor-not-allowed">
      <div className="flex items-center gap-2.5">
        <Clock className="w-4.5 h-4.5 text-purple-400/80 shrink-0" />
        <span className="text-sm sm:text-base font-semibold tracking-wide text-zinc-200">
          {endTime}
        </span>
      </div>
      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded-md">
        Auto
      </span>
    </div>
  );
};
