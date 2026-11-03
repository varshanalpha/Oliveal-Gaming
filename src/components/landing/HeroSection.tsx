import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, Gamepad2, Gauge, Clock, Users } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate('/login');
  };

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const stationsEl = document.getElementById('stations');
    if (stationsEl) {
      stationsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const FEATURE_PILLS = [
    { icon: <Gamepad2 className="w-4 h-4 text-purple-400" />, label: 'PS5 Stations' },
    { icon: <Gauge className="w-4 h-4 text-cyan-400" />, label: 'Racing Simulators' },
    { icon: <Clock className="w-4 h-4 text-purple-400" />, label: '24/7 Access' },
    { icon: <Users className="w-4 h-4 text-indigo-400" />, label: 'Solo or Multiplayer' },
  ];

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Ambient Lighting & Glow Gradients */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[800px] max-w-full rounded-full bg-purple-900/20 blur-[130px]" />
      <div className="pointer-events-none absolute top-12 right-0 -z-10 h-[400px] w-[450px] rounded-full bg-indigo-900/25 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 left-4 -z-10 h-64 w-64 rounded-full bg-cyan-900/15 blur-[100px]" />

      {/* Subtle gaming geometric decals in background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-15 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Description, CTAs, Feature Bar */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            {/* Top Pill Announcement */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-medium tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span>Next-Gen Gaming Lounge • Open 24/7</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold tracking-tight text-white leading-[1.08]">
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-normal italic drop-shadow-md">
                Enter the World of
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent font-black tracking-tight text-glow-purple mt-1">
                Gaming
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Premium PS5 and Simulator gaming experience at Oliveal Gaming Zone. Book your slot, play your favorite titles, and game without limits — 24/7.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleBookClick}
                icon={<Calendar className="w-5 h-5 text-purple-100" />}
                className="w-full sm:w-auto shadow-[0_0_25px_rgba(168,85,247,0.5)] group"
              >
                <span>Book a Slot Now</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleExploreClick}
                icon={<Gamepad2 className="w-5 h-5 text-purple-400" />}
                className="w-full sm:w-auto"
              >
                Explore Gaming Stations
              </Button>
            </div>

            {/* Feature Pills Bar */}
            <div className="pt-6 border-t border-purple-500/15 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {FEATURE_PILLS.map((pill) => (
                <div
                  key={pill.label}
                  className="flex items-center justify-center lg:justify-start gap-2 px-3 py-2 rounded-xl bg-zinc-900/40 border border-purple-500/10 backdrop-blur-sm"
                >
                  <span className="shrink-0">{pill.icon}</span>
                  <span className="text-xs font-medium text-zinc-300 whitespace-nowrap">
                    {pill.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual with Console, Controller, and Floating Game Cards */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-4 lg:pt-0">
            {/* Ambient background glow ring */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-cyan-500/20 blur-[70px] animate-pulse-subtle" />
            </div>

            {/* Visual Container */}
            <div className="relative w-full max-w-[540px] aspect-[4/3.5] flex items-center justify-center">
              
              {/* Background PlayStation Controller Symbols */}
              <div className="absolute -top-6 right-8 text-purple-500/20 text-4xl font-mono select-none pointer-events-none">
                ▲
              </div>
              <div className="absolute top-20 -left-4 text-purple-500/20 text-3xl font-mono select-none pointer-events-none">
                ●
              </div>
              <div className="absolute bottom-16 right-4 text-purple-500/20 text-3xl font-mono select-none pointer-events-none">
                ✖
              </div>

              {/* Main PS5 Console Artwork & Pedestal */}
              <div className="relative z-10 flex flex-col items-center">
                
                {/* PS5 Console & Controller Mockup Image Graphic */}
                <div className="relative w-64 sm:w-72 md:w-80 h-72 sm:h-80 flex items-end justify-center">
                  
                  {/* Console Body SVG / Illustrated Precision Render */}
                  <div className="relative w-44 sm:w-52 h-64 sm:h-72">
                    {/* Shadow & Floor Reflection */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 sm:w-56 h-8 bg-purple-600/30 blur-xl rounded-full" />
                    
                    {/* Console Silhouette with White Wings and Blue/Purple Inner Light */}
                    <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-purple-500/30 shadow-[0_0_40px_rgba(147,51,234,0.35)] overflow-hidden flex flex-col justify-between p-3">
                      {/* Top Curved Aerodynamic Wing Accent */}
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-white via-zinc-100 to-zinc-300 rounded-t-xl opacity-95 shadow-inner clip-wing" />
                      
                      {/* Inner PS5 Blue/Purple Glowing Channel */}
                      <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-3 sm:w-4 bg-gradient-to-b from-cyan-400 via-purple-500 to-indigo-600 rounded-full shadow-[0_0_15px_#a855f7] animate-pulse" />
                      
                      {/* Disc Drive Slot */}
                      <div className="absolute right-4 top-1/3 w-1.5 h-16 bg-zinc-800 rounded-sm border-l border-zinc-900" />
                      
                      {/* Front Ports & Power Bar */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20">
                        <div className="w-1.5 h-3 bg-zinc-700 rounded-xs" />
                        <div className="w-1 h-2 bg-zinc-600 rounded-full" />
                      </div>

                      {/* Stand Base */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 h-3 bg-zinc-950 rounded-full border border-purple-500/40 shadow-lg" />
                    </div>
                  </div>

                  {/* DualSense Controller in Front */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 w-36 sm:w-44 h-24 bg-gradient-to-b from-zinc-100 via-white to-zinc-300 rounded-3xl border border-zinc-200/90 shadow-[0_15px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(168,85,247,0.4)] flex flex-col items-center justify-center p-2">
                    {/* Controller Touchpad & Lightbar */}
                    <div className="w-16 h-8 bg-zinc-900 rounded-md border border-purple-500/50 shadow-[0_0_10px_#a855f7] flex items-center justify-center">
                      <div className="w-10 h-1 bg-cyan-400 rounded-full shadow-[0_0_6px_#06b6d4]" />
                    </div>
                    {/* Analog Sticks */}
                    <div className="flex justify-between w-20 mt-1">
                      <div className="w-4 h-4 rounded-full bg-zinc-800 border border-zinc-600 shadow-sm" />
                      <div className="w-4 h-4 rounded-full bg-zinc-800 border border-zinc-600 shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Neon Game Cards (Matching the reference image!) */}
              
              {/* Card 1: EA FC 25 (Top Left) */}
              <div className="absolute -top-2 left-0 sm:left-2 z-20 w-32 sm:w-36 h-40 sm:h-44 rounded-xl overflow-hidden border-2 border-purple-500/60 bg-zinc-950 shadow-[0_0_25px_rgba(168,85,247,0.5)] transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=400&q=80"
                  alt="EA Sports FC 25"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2.5">
                  <span className="text-[10px] font-bold text-purple-300 tracking-wider">EA SPORTS</span>
                  <span className="text-xs font-black text-white tracking-wide leading-tight">FC 25</span>
                </div>
              </div>

              {/* Card 2: Spider-Man 2 (Top Right) */}
              <div className="absolute -top-4 right-0 sm:right-2 z-20 w-32 sm:w-36 h-40 sm:h-44 rounded-xl overflow-hidden border-2 border-purple-500/60 bg-zinc-950 shadow-[0_0_25px_rgba(168,85,247,0.5)] transform rotate-8 hover:rotate-0 hover:scale-105 transition-all duration-300 group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80"
                  alt="Marvel's Spider-Man 2"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2.5">
                  <span className="text-[9px] font-bold text-red-400 tracking-wider">MARVEL</span>
                  <span className="text-xs font-black text-white tracking-wide leading-tight">SPIDER-MAN 2</span>
                </div>
              </div>

              {/* Card 3: God of War Ragnarök (Bottom Left) */}
              <div className="absolute -bottom-6 left-2 sm:left-6 z-20 w-32 sm:w-36 h-40 sm:h-44 rounded-xl overflow-hidden border-2 border-purple-500/60 bg-zinc-950 shadow-[0_0_25px_rgba(168,85,247,0.5)] transform rotate-4 hover:rotate-0 hover:scale-105 transition-all duration-300 group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=400&q=80"
                  alt="God of War Ragnarök"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2.5">
                  <span className="text-[9px] font-bold text-cyan-300 tracking-wider">PLAYSTATION</span>
                  <span className="text-xs font-black text-white tracking-wide leading-tight">GOD OF WAR</span>
                </div>
              </div>

              {/* Card 4: GTA V (Bottom Right) */}
              <div className="absolute -bottom-8 right-2 sm:right-6 z-20 w-32 sm:w-36 h-40 sm:h-44 rounded-xl overflow-hidden border-2 border-purple-500/60 bg-zinc-950 shadow-[0_0_25px_rgba(168,85,247,0.5)] transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80"
                  alt="Grand Theft Auto V"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2.5">
                  <span className="text-[9px] font-bold text-yellow-400 tracking-wider">ROCKSTAR</span>
                  <span className="text-xs font-black text-white tracking-wide leading-tight">GRAND THEFT AUTO</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

