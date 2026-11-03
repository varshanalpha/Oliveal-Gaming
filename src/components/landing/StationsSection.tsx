import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStations } from '../../hooks/useStations';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatINR } from '../../lib/utils';
import { Users, User, Check, ArrowRight, Gamepad2, Gauge } from 'lucide-react';

export const StationsSection: React.FC = () => {
  const navigate = useNavigate();
  const { filteredStations, filter, setFilter, loading, error } = useStations();

  const handleBookStation = (_stationId: string) => {
    navigate('/login');
  };

  return (
    <section id="stations" className="relative py-20 lg:py-28 bg-[#090815]/90 border-t border-purple-900/20">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-[900px] max-w-full rounded-full bg-purple-950/20 blur-[140px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Accent Lines (As seen in Reference Image) */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-purple-500/60" />
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Our <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent text-glow-purple">Gaming</span> Stations
            </h2>
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-purple-500/60" />
          </div>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Choose from our high-performance PS5 setups and immersive racing simulators. Operating 24/7 with zero buffer between slots.
          </p>

          {/* Station Category Filter Tabs */}
          <div className="inline-flex p-1.5 rounded-full bg-zinc-900/80 border border-purple-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] mt-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                filter === 'all'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Stations (6)
            </button>
            <button
              onClick={() => setFilter('ps5')}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                filter === 'ps5'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>PlayStation 5 (4)</span>
            </button>
            <button
              onClick={() => setFilter('simulator')}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                filter === 'simulator'
                  ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>Racing Simulators (2)</span>
            </button>
          </div>
        </div>

        {/* Stations Content Cards */}
        {loading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="py-12 text-center text-red-400 text-sm">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
            {filteredStations.map((station) => {
              const isSimulator = station.type === 'simulator';

              return (
                <div
                  key={station.id}
                  className={`group relative flex flex-col rounded-2xl overflow-hidden bg-gradient-to-b from-[#131127] to-[#0c0a1a] border transition-all duration-300 hover:-translate-y-1 ${
                    isSimulator
                      ? 'border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_10px_35px_-10px_rgba(6,182,212,0.3)]'
                      : 'border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_10px_35px_-10px_rgba(168,85,247,0.3)]'
                  }`}
                >
                  {/* Station Image & Top Overlay Badges */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-950">
                    <img
                      src={station.imageUrl}
                      alt={station.displayName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a1a] via-[#0c0a1a]/40 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <Badge variant={isSimulator ? 'cyan' : 'purple'} size="sm">
                        {isSimulator ? <Gauge className="w-3 h-3" /> : <Gamepad2 className="w-3 h-3" />}
                        {station.name}
                      </Badge>
                      <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-zinc-900/80 text-zinc-300 border border-zinc-700/50 backdrop-blur-sm">
                        {station.badge}
                      </span>
                    </div>

                    {/* Capacity Indicator Pill */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs text-zinc-200">
                      {station.maxPlayers === 2 ? (
                        <>
                          <Users className="w-3.5 h-3.5 text-purple-400" />
                          <span>1-2 Players</span>
                        </>
                      ) : (
                        <>
                          <User className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Single Driver Cockpit</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Name & Tagline */}
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-display font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
                          {station.displayName}
                        </h3>
                      </div>
                      <p className="text-xs text-purple-400/90 font-medium mt-0.5">
                        {station.tagline}
                      </p>

                      <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
                        {station.description}
                      </p>

                      {/* Specs List */}
                      <div className="mt-4 pt-3 border-t border-purple-500/10 space-y-1.5">
                        {station.specs.slice(0, 3).map((spec, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                            <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isSimulator ? 'text-cyan-400' : 'text-purple-400'}`} />
                            <span className="truncate">{spec}</span>
                          </div>
                        ))}
                      </div>

                      {/* Popular Games Tags */}
                      <div className="mt-4 pt-3 border-t border-purple-500/10">
                        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">
                          Installed Titles:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {station.popularGames.map((game, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-900/80 border border-zinc-800 text-zinc-300"
                            >
                              {game}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pricing Footer & CTA */}
                    <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display font-black text-xl text-white">
                            {formatINR(station.hourlyRate1p)}
                          </span>
                          <span className="text-xs text-zinc-400 font-medium">/ 60m</span>
                        </div>
                        {station.hourlyRate2p && (
                          <p className="text-[11px] text-zinc-400">
                            2 Players: <span className="text-purple-300 font-semibold">{formatINR(station.hourlyRate2p)}</span>/hr
                          </p>
                        )}
                        {isSimulator && (
                          <p className="text-[11px] text-cyan-400/90 font-medium">
                            Pro Direct-Drive Rig
                          </p>
                        )}
                      </div>

                      <Button
                        variant={isSimulator ? 'outline' : 'primary'}
                        size="sm"
                        onClick={() => handleBookStation(station.id)}
                        className={`text-xs ${
                          isSimulator
                            ? 'border-cyan-500/40 text-cyan-200 hover:bg-cyan-950/40 hover:border-cyan-400'
                            : ''
                        }`}
                        icon={<ArrowRight className="w-3.5 h-3.5" />}
                        iconPosition="right"
                      >
                        Book Slot
                      </Button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
