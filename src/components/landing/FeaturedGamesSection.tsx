import React from 'react';
import { useGames } from '../../hooks/useGames';
import { Flame } from 'lucide-react';

export const FeaturedGamesSection: React.FC = () => {
  const { games, loading } = useGames();

  return (
    <section id="games" className="relative py-20 bg-[#07060f] border-t border-purple-900/15 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute bottom-0 right-10 -z-10 h-72 w-72 rounded-full bg-purple-900/15 blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/20 text-purple-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-purple-400" />
            <span>Installed & Ready to Play</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Play the Hottest <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">AAA Blockbusters</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            All stations come preloaded with high-speed SSD game storage, updated with latest patches, rosters, and DLC.
          </p>
        </div>

        {/* Games Showcase Grid */}
        {loading ? (
          <div className="py-16 flex justify-center">
            <div className="w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mt-12">
            {games.map((game) => (
              <div
                key={game.id}
                className="group relative rounded-xl overflow-hidden border border-purple-500/20 bg-zinc-950 shadow-lg hover:border-purple-400/60 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col"
              >
                {/* Poster Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={game.coverUrl}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  
                  {game.badge && (
                    <div className="absolute top-2 left-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
                        {game.badge}
                      </span>
                    </div>
                  )}

                  {/* Title overlay */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-[10px] text-purple-400 uppercase font-semibold tracking-wider block">
                      {game.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2">
                      {game.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
