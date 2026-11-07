import React from 'react';
import { Tag } from 'lucide-react';
import { AdminPricingSettings } from '../../../types/adminSettings';

interface PricingCardProps {
  pricing: AdminPricingSettings;
  onChangePricing: (key: keyof AdminPricingSettings, val: number) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  pricing,
  onChangePricing,
}) => {
  return (
    <div className="bg-[#0e0a1d]/90 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col justify-between space-y-4 hover:border-purple-500/35 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Tag className="w-5 h-5 text-fuchsia-400 shrink-0 stroke-[2.2]" />
        <h2 className="text-base sm:text-lg font-bold text-white font-display">
          Pricing (Per Hour)
        </h2>
      </div>

      {/* Pricing Rows */}
      <div className="space-y-3.5">
        {/* PS5 1 Player */}
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="price-ps5-1p"
            className="text-xs sm:text-sm font-medium text-zinc-200"
          >
            PlayStation 5 (1 Player)
          </label>
          <div className="relative w-28 sm:w-36 flex items-center">
            <span className="absolute left-3.5 text-zinc-400 text-sm font-medium pointer-events-none">
              ₹
            </span>
            <input
              id="price-ps5-1p"
              type="number"
              min="0"
              step="10"
              value={pricing.ps5_1p}
              onChange={(e) =>
                onChangePricing('ps5_1p', Number(e.target.value) || 0)
              }
              className="w-full pl-8 pr-3.5 py-2 sm:py-2.5 rounded-xl bg-[#130d28]/90 border border-purple-500/25 text-white text-sm font-semibold focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/40 transition-all duration-200"
            />
          </div>
        </div>

        {/* PS5 2 Players */}
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="price-ps5-2p"
            className="text-xs sm:text-sm font-medium text-zinc-200"
          >
            PlayStation 5 (2 Players)
          </label>
          <div className="relative w-28 sm:w-36 flex items-center">
            <span className="absolute left-3.5 text-zinc-400 text-sm font-medium pointer-events-none">
              ₹
            </span>
            <input
              id="price-ps5-2p"
              type="number"
              min="0"
              step="10"
              value={pricing.ps5_2p}
              onChange={(e) =>
                onChangePricing('ps5_2p', Number(e.target.value) || 0)
              }
              className="w-full pl-8 pr-3.5 py-2 sm:py-2.5 rounded-xl bg-[#130d28]/90 border border-purple-500/25 text-white text-sm font-semibold focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/40 transition-all duration-200"
            />
          </div>
        </div>

        {/* Racing Simulator 1 Player */}
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="price-sim-1p"
            className="text-xs sm:text-sm font-medium text-zinc-200"
          >
            Racing Simulator (1 Player)
          </label>
          <div className="relative w-28 sm:w-36 flex items-center">
            <span className="absolute left-3.5 text-zinc-400 text-sm font-medium pointer-events-none">
              ₹
            </span>
            <input
              id="price-sim-1p"
              type="number"
              min="0"
              step="10"
              value={pricing.racingSim_1p}
              onChange={(e) =>
                onChangePricing('racingSim_1p', Number(e.target.value) || 0)
              }
              className="w-full pl-8 pr-3.5 py-2 sm:py-2.5 rounded-xl bg-[#130d28]/90 border border-purple-500/25 text-white text-sm font-semibold focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/40 transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

