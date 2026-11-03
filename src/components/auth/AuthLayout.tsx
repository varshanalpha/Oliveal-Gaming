import React from 'react';
import { Logo } from '../ui/Logo';

export type AuthScreenType = 'login' | 'signup' | 'otp' | 'admin';

interface AuthLayoutProps {
  screenType: AuthScreenType;
  badgeLabel: string;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ screenType, badgeLabel, children }) => {
  // Visual scenes customized for each screen matching reference image
  const renderLeftVisual = () => {
    switch (screenType) {
      case 'login':
        // Screen 1: PS5 Console with DualSense on glowing pedestal
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-8 overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/30 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-indigo-500/20 blur-[70px] rounded-full pointer-events-none" />

            {/* PlayStation illuminated wall decal */}
            <div className="absolute top-12 right-12 opacity-30 pointer-events-none select-none text-purple-400 font-mono text-3xl">
              ▲ ● ✖ ■
            </div>

            {/* Gaming Room Background Silhouette & Chair */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
              <div className="relative flex flex-col items-center">
                
                {/* PS5 Console & DualSense Visual */}
                <div className="relative w-64 h-80 flex flex-col items-center justify-end">
                  
                  {/* Glowing Floor Pedestal */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-56 h-10 bg-purple-500/30 rounded-full blur-md" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-6 border-2 border-purple-500/70 rounded-full shadow-[0_0_20px_#a855f7]" />

                  {/* Standing PS5 Console */}
                  <div className="relative w-36 h-64 rounded-2xl bg-gradient-to-b from-zinc-900 via-black to-zinc-950 border border-purple-500/40 shadow-[0_0_35px_rgba(168,85,247,0.4)] flex flex-col justify-between p-2">
                    {/* Curved White Aerodynamic Shell */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-white via-zinc-100 to-zinc-300 rounded-t-xl opacity-95 shadow-inner" />
                    
                    {/* Inner Neon Light Bar */}
                    <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-2.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-indigo-600 rounded-full shadow-[0_0_12px_#a855f7] animate-pulse" />
                    
                    {/* Stand base */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-28 h-2 bg-black rounded-full border border-purple-500/50" />
                  </div>

                  {/* White DualSense Controller Resting in Front */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 w-36 h-20 bg-gradient-to-b from-zinc-100 via-white to-zinc-300 rounded-3xl border border-zinc-200/90 shadow-[0_15px_30px_rgba(0,0,0,0.9),0_0_20px_rgba(168,85,247,0.5)] flex flex-col items-center justify-center p-2">
                    <div className="w-14 h-6 bg-zinc-900 rounded-md border border-purple-500/50 shadow-[0_0_8px_#a855f7] flex items-center justify-center">
                      <div className="w-8 h-1 bg-cyan-400 rounded-full" />
                    </div>
                    <div className="flex justify-between w-16 mt-1">
                      <div className="w-3.5 h-3.5 rounded-full bg-zinc-800" />
                      <div className="w-3.5 h-3.5 rounded-full bg-zinc-800" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        );

      case 'signup':
        // Screen 2: Gaming battle station with monitor showing PlayStation logo & controller
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-8 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/30 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
              {/* Monitor with glowing PlayStation logo */}
              <div className="relative w-64 h-44 rounded-xl bg-gradient-to-b from-zinc-950 to-black border-2 border-purple-500/50 shadow-[0_0_35px_rgba(168,85,247,0.4)] flex flex-col items-center justify-center p-4">
                <div className="text-white text-5xl font-black tracking-widest text-glow-purple">
                  PS
                </div>
                <div className="absolute bottom-2 text-[10px] text-purple-400 font-mono tracking-widest uppercase">
                  Oliveal BattleStation
                </div>
              </div>
              {/* Monitor stand */}
              <div className="w-6 h-10 bg-zinc-800 border-x border-zinc-700" />
              <div className="w-24 h-2 bg-zinc-900 rounded-full border border-purple-500/30 mb-2 shadow-lg" />

              {/* Controller on Desk */}
              <div className="relative z-20 w-40 h-22 bg-gradient-to-b from-zinc-100 via-white to-zinc-300 rounded-3xl border border-zinc-200 shadow-[0_15px_30px_rgba(0,0,0,0.9),0_0_20px_rgba(168,85,247,0.5)] flex flex-col items-center justify-center p-2">
                <div className="w-16 h-7 bg-zinc-900 rounded-md border border-purple-500/50 shadow-[0_0_8px_#a855f7] flex items-center justify-center">
                  <div className="w-9 h-1 bg-purple-400 rounded-full" />
                </div>
                <div className="flex justify-between w-18 mt-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-zinc-800" />
                  <div className="w-3.5 h-3.5 rounded-full bg-zinc-800" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'otp':
        // Screen 3: 3D purple glowing open envelope with checkmark badge on circular neon pedestal
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-8 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/35 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
              {/* Glowing Pedestal Ring */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-56 h-12 bg-purple-500/30 rounded-full blur-md" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 border-2 border-purple-500/70 rounded-full shadow-[0_0_25px_#a855f7]" />

              {/* 3D Envelope */}
              <div className="relative w-64 h-52 flex flex-col items-center justify-end">
                {/* Letter card popping out with '******' */}
                <div className="absolute top-2 w-48 h-28 rounded-xl bg-gradient-to-b from-zinc-100 to-zinc-300 border border-white/60 shadow-xl flex flex-col items-center justify-center p-3 animate-float-slow">
                  <span className="font-mono font-black text-2xl tracking-[0.3em] text-zinc-900">
                    ******
                  </span>
                  <span className="text-[10px] text-purple-700 font-bold uppercase tracking-wider mt-1">
                    Security Passcode
                  </span>
                </div>

                {/* Envelope Body */}
                <div className="relative z-10 w-64 h-36 rounded-2xl bg-gradient-to-br from-purple-900 via-indigo-950 to-black border-2 border-purple-500/60 shadow-[0_0_35px_rgba(168,85,247,0.5)] flex items-center justify-center">
                  {/* Purple Circular Verified Badge with Checkmark */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 border-2 border-white/70 shadow-[0_0_20px_#a855f7] flex items-center justify-center text-white text-2xl font-bold">
                    ✓
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'admin':
        // Screen 4: Ops Battlestation with ergonomic gaming chair, dual monitors, wall neon controller
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-8 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/30 blur-[100px] rounded-full pointer-events-none" />

            {/* Glowing Neon Gamepad on Wall */}
            <div className="absolute top-12 right-12 text-purple-400/40 text-4xl select-none pointer-events-none">
              🎮
            </div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
              {/* Dual Ops Monitors */}
              <div className="flex gap-2 items-center justify-center">
                <div className="w-32 h-24 rounded-lg bg-zinc-950 border border-purple-500/40 shadow-md p-1.5 flex flex-col justify-between">
                  <div className="w-full h-2 bg-purple-600/50 rounded-xs" />
                  <div className="text-[8px] text-purple-300 font-mono">RIGS // 6 ACTIVE</div>
                </div>
                <div className="w-32 h-24 rounded-lg bg-zinc-950 border border-cyan-500/40 shadow-md p-1.5 flex flex-col justify-between">
                  <div className="w-full h-2 bg-cyan-600/50 rounded-xs" />
                  <div className="text-[8px] text-cyan-300 font-mono">24/7 LIVE MATRIX</div>
                </div>
              </div>

              {/* Ergonomic Gaming Chair Silhouette */}
              <div className="mt-4 relative w-36 h-48 rounded-t-3xl bg-gradient-to-b from-purple-950 via-zinc-900 to-black border-2 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.3)] flex flex-col items-center p-3">
                <div className="w-16 h-8 rounded-full bg-purple-600/30 border border-purple-400/40 mt-1 flex items-center justify-center text-[9px] font-bold text-white uppercase tracking-wider">
                  ADMIN
                </div>
                <div className="mt-4 w-24 h-20 bg-zinc-950 rounded-xl border border-zinc-800" />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#080711] text-foreground flex flex-col selection:bg-purple-600 selection:text-white relative overflow-hidden">
      
      {/* Top Left Window Badge (Matching Reference Image exact badge header) */}
      <div className="absolute top-4 left-4 z-40">
        <span className="px-3.5 py-1.5 rounded-full bg-purple-600 text-white text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          {badgeLabel}
        </span>
      </div>

      {/* Main Split Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        
        {/* Left Side: Brand Logo + Custom Visual */}
        <div className="lg:col-span-6 relative flex flex-col justify-between p-6 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-purple-500/15 bg-gradient-to-b from-[#0b0a18] to-[#070610]">
          {/* Brand Logo at Top-Left */}
          <div className="pt-8 sm:pt-4">
            <Logo size="md" />
          </div>

          {/* Center Graphic */}
          <div className="flex-1 flex items-center justify-center py-6">
            {renderLeftVisual()}
          </div>

          {/* Bottom Ambience Text */}
          <div className="hidden sm:flex items-center justify-between text-xs text-zinc-500 pt-4 border-t border-purple-500/10">
            <span>24/7 Gaming Lounge Platform</span>
            <span>Next-Gen PS5 & Simulators</span>
          </div>
        </div>

        {/* Right Side: Form Card Container */}
        <div className="lg:col-span-6 flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-[#080711] relative">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900/15 blur-[120px] rounded-full" />

          {/* Form Card */}
          <div className="w-full max-w-md rounded-3xl bg-[#110f24]/90 border border-purple-500/25 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.8),0_0_20px_rgba(168,85,247,0.15)] backdrop-blur-2xl relative z-10">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
};
