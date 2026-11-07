import React from 'react';
import { Store } from 'lucide-react';

interface GamingZoneDetailsCardProps {
  zoneName: string;
  description: string;
  onChangeZoneName: (val: string) => void;
  onChangeDescription: (val: string) => void;
}

export const GamingZoneDetailsCard: React.FC<GamingZoneDetailsCardProps> = ({
  zoneName,
  description,
  onChangeZoneName,
  onChangeDescription,
}) => {
  return (
    <div className="bg-[#0e0a1d]/90 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col justify-between space-y-4 hover:border-purple-500/35 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Store className="w-5 h-5 text-fuchsia-400 shrink-0 stroke-[2.2]" />
        <h2 className="text-base sm:text-lg font-bold text-white font-display">
          Gaming Zone Details
        </h2>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {/* Zone Name */}
        <div>
          <label
            htmlFor="admin-zone-name"
            className="block text-xs sm:text-sm font-medium text-zinc-300 mb-1.5"
          >
            Zone Name <span className="text-fuchsia-400">*</span>
          </label>
          <input
            id="admin-zone-name"
            type="text"
            value={zoneName}
            onChange={(e) => onChangeZoneName(e.target.value)}
            placeholder="e.g. Oliveal Gaming Zone"
            className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-[#130d28]/90 border border-purple-500/25 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/40 transition-all duration-200 font-sans"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="admin-zone-description"
            className="block text-xs sm:text-sm font-medium text-zinc-300 mb-1.5"
          >
            Description
          </label>
          <textarea
            id="admin-zone-description"
            rows={2}
            value={description}
            onChange={(e) => onChangeDescription(e.target.value)}
            placeholder="e.g. Premium gaming experience, 24/7"
            className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-[#130d28]/90 border border-purple-500/25 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/40 transition-all duration-200 font-sans resize-y leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
