import React from 'react';
import { Clock, Tag, CheckCircle2, Loader2 } from 'lucide-react';
import { StationCategory, WalkInDuration, WalkInPlayerCount } from '../../../types/walkInBooking';
import { formatINR } from '../../../lib/utils';

interface BookingPriceSummaryProps {
  duration: WalkInDuration;
  amount: number;
  category: StationCategory;
  playerCount: WalkInPlayerCount;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export const BookingPriceSummary: React.FC<BookingPriceSummaryProps> = ({
  duration,
  amount,
  category,
  playerCount,
  isSubmitting,
  onSubmit,
}) => {
  const categoryLabel = category === 'ps5' ? 'PS5' : 'Racing';
  const playerLabel = category === 'simulator' ? '1 Player' : `${playerCount} Player${playerCount > 1 ? 's' : ''}`;

  return (
    <div className="pt-1.5">
      <div className="rounded-2xl bg-[#110c22] border border-purple-500/30 p-3 sm:p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        
        {/* Left Side: Duration & Price metrics */}
        <div className="flex items-center gap-5 sm:gap-7 w-full sm:w-auto justify-around sm:justify-start">
          
          {/* Duration Metric */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 leading-none">
                Duration
              </p>
              <p className="text-xs sm:text-sm font-extrabold text-white mt-0.5 leading-none">
                {duration} Minutes
              </p>
            </div>
          </div>

          {/* Amount Metric */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Tag className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 leading-none">
                Amount
              </p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-lg sm:text-xl font-black text-white leading-none">
                  {formatINR(amount)}
                </span>
                <span className="text-[10px] sm:text-[11px] text-zinc-400 font-medium">
                  ({categoryLabel} • {playerLabel})
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Create Booking Action Button */}
        <div className="w-full sm:w-auto">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onSubmit}
            className="w-full sm:w-auto min-w-[170px] h-10.5 sm:h-11 px-5 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.45)] hover:shadow-[0_0_25px_rgba(168,85,247,0.65)] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Create Booking</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
