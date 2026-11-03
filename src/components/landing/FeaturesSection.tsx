import React from 'react';
import { useContent } from '../../hooks/useContent';
import { Zap, Gauge, CalendarCheck, Armchair, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const FeaturesSection: React.FC = () => {
  const { valuePropositions, loading } = useContent();

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="w-6 h-6 text-purple-400" />;
      case 'gauge':
        return <Gauge className="w-6 h-6 text-cyan-400" />;
      case 'calendar-check':
        return <CalendarCheck className="w-6 h-6 text-indigo-400" />;
      case 'armchair':
        return <Armchair className="w-6 h-6 text-purple-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <section id="why-us" className="relative py-20 lg:py-28 bg-[#080712] border-t border-purple-900/15 overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-1/3 left-10 -z-10 h-80 w-80 rounded-full bg-purple-950/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 -z-10 h-80 w-80 rounded-full bg-indigo-950/20 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="purple" size="md">
            Uncompromising Standards
          </Badge>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why Gamers Choose <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent text-glow-purple">Oliveal</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Built by passionate gamers for competitive and casual players alike. Every station is calibrated for peak frame rates, responsive controls, and total immersion.
          </p>
        </div>

        {/* Bento Grid Feature Layout */}
        {loading ? (
          <div className="py-16 flex justify-center">
            <div className="w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mt-14">
            
            {/* Feature 1: Premium Gaming Equipment (Spans 7 cols on LG) */}
            {valuePropositions[0] && (
              <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-[#14122b] to-[#0c0a1a] border border-purple-500/25 p-6 sm:p-8 flex flex-col justify-between group hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-purple-950/70 border border-purple-500/30 w-fit">
                      {getFeatureIcon(valuePropositions[0].iconName)}
                    </div>
                    <span className="text-2xl sm:text-3xl font-display font-black text-purple-400">
                      {valuePropositions[0].highlightStat}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      {valuePropositions[0].subtitle}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                      {valuePropositions[0].title}
                    </h3>
                  </div>

                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {valuePropositions[0].description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-purple-500/10 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>OLED 4K Displays • DualSense Haptic Triggers</span>
                  </span>
                  <span className="text-purple-300 font-medium">ALPHA - DELTA</span>
                </div>
              </div>
            )}

            {/* Feature 2: Immersive Racing Experience (Spans 5 cols on LG) */}
            {valuePropositions[1] && (
              <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#0e1627] to-[#080d19] border border-cyan-500/25 p-6 sm:p-8 flex flex-col justify-between group hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-cyan-950/70 border border-cyan-500/30 w-fit">
                      {getFeatureIcon(valuePropositions[1].iconName)}
                    </div>
                    <span className="text-2xl sm:text-3xl font-display font-black text-cyan-400">
                      {valuePropositions[1].highlightStat}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      {valuePropositions[1].subtitle}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                      {valuePropositions[1].title}
                    </h3>
                  </div>

                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {valuePropositions[1].description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-cyan-500/10 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Load-Cell Pedals • 49" Ultra-wide</span>
                  </span>
                  <span className="text-cyan-300 font-medium">RS1 & RS2</span>
                </div>
              </div>
            )}

            {/* Feature 3: Easy Online Slot Booking (Spans 5 cols on LG) */}
            {valuePropositions[2] && (
              <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#13112a] to-[#0a0818] border border-indigo-500/25 p-6 sm:p-8 flex flex-col justify-between group hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-indigo-950/70 border border-indigo-500/30 w-fit">
                      {getFeatureIcon(valuePropositions[2].iconName)}
                    </div>
                    <span className="text-sm font-display font-bold text-indigo-400 uppercase tracking-wide px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40">
                      {valuePropositions[2].highlightStat}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                      {valuePropositions[2].subtitle}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                      {valuePropositions[2].title}
                    </h3>
                  </div>

                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {valuePropositions[2].description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-indigo-500/10 flex items-center justify-between text-xs text-zinc-400">
                  <span>5-min checkout lock</span>
                  <span className="text-indigo-300 font-medium">Tomorrow @ 8 PM IST</span>
                </div>
              </div>
            )}

            {/* Feature 4: Comfortable Gaming Environment (Spans 7 cols on LG) */}
            {valuePropositions[3] && (
              <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-[#15122d] to-[#0c0a1a] border border-purple-500/25 p-6 sm:p-8 flex flex-col justify-between group hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-purple-950/70 border border-purple-500/30 w-fit">
                      {getFeatureIcon(valuePropositions[3].iconName)}
                    </div>
                    <span className="text-2xl sm:text-3xl font-display font-black text-purple-400">
                      {valuePropositions[3].highlightStat}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      {valuePropositions[3].subtitle}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                      {valuePropositions[3].title}
                    </h3>
                  </div>

                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {valuePropositions[3].description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-purple-500/10 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>Ergonomic Seating • Climate Controlled • High-Speed Fiber</span>
                  </span>
                  <span className="text-purple-300 font-medium">Walk-ins & Online</span>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};

