import React from 'react';
import { Logo } from '../ui/Logo';

// Import extracted high-resolution visual assets
import customerLoginVisual from '../../assets/auth/customer-login-visual.png';
import customerSignupVisual from '../../assets/auth/customer-signup-visual.png';
import emailOtpVisual from '../../assets/auth/email-otp-visual.png';
import adminLoginVisual from '../../assets/auth/admin-login-visual.png';

export type AuthScreenType = 'login' | 'signup' | 'otp' | 'admin';

interface AuthLayoutProps {
  screenType: AuthScreenType;
  badgeLabel: string;
  children: React.ReactNode;
}

interface ScreenVisualMeta {
  imageSrc: string;
  altText: string;
  captionTitle: string;
  captionSubtitle: string;
  ambientColor: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ screenType, badgeLabel, children }) => {
  const getScreenMeta = (): ScreenVisualMeta => {
    switch (screenType) {
      case 'login':
        return {
          imageSrc: customerLoginVisual,
          altText: 'PlayStation 5 console and DualSense controller at Oliveal Gaming Zone',
          captionTitle: 'PS5 Flagship Battlestations',
          captionSubtitle: 'ALPHA, BETA, GAMMA, DELTA • 4K 120Hz Displays',
          ambientColor: 'rgba(168, 85, 247, 0.35)',
        };
      case 'signup':
        return {
          imageSrc: customerSignupVisual,
          altText: 'Next-gen gaming monitor, controller and audio setup',
          captionTitle: 'Instant 24/7 Slot Access',
          captionSubtitle: 'Join the premier esports and casual gaming lounge',
          ambientColor: 'rgba(139, 92, 246, 0.35)',
        };
      case 'otp':
        return {
          imageSrc: emailOtpVisual,
          altText: 'Neon illuminated verification passcode security pass',
          captionTitle: 'Encrypted Security Passcode',
          captionSubtitle: 'Instant automated authentication verification',
          ambientColor: 'rgba(147, 51, 234, 0.4)',
        };
      case 'admin':
        return {
          imageSrc: adminLoginVisual,
          altText: 'Oliveal Gaming Zone Operations desk and dual-monitor setup',
          captionTitle: '24/7 Operations Hub',
          captionSubtitle: '6 Station Master Matrix • Counter Walk-ins POS',
          ambientColor: 'rgba(99, 102, 241, 0.35)',
        };
    }
  };

  const meta = getScreenMeta();

  return (
    <div className="min-h-screen bg-[#080711] text-foreground flex flex-col selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      
      {/* Top Left Window Badge (Matching Reference Image exact badge header) */}
      <div className="absolute top-4 left-4 z-40">
        <span className="px-3.5 py-1.5 rounded-full bg-purple-600 text-white text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          {badgeLabel}
        </span>
      </div>

      {/* Main Split Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        
        {/* Left Side: Brand Logo + Dedicated High-Resolution Visual */}
        <div className="lg:col-span-6 relative flex flex-col justify-between p-6 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-purple-500/15 bg-gradient-to-b from-[#0b0a1a] via-[#090815] to-[#06050e] overflow-hidden">
          
          {/* Ambient background glow behind image */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full blur-[130px] opacity-40 -z-0"
            style={{ backgroundColor: meta.ambientColor }}
          />

          {/* Brand Logo at Top-Left */}
          <div className="pt-8 sm:pt-4 z-10">
            <Logo size="md" />
          </div>

          {/* Visual Showcase Container */}
          <div className="my-6 lg:my-auto flex flex-col items-center justify-center z-10 w-full max-w-lg mx-auto">
            
            {/* Image Frame with Glassmorphic Border and Glow */}
            <div className="group relative w-full aspect-[508/285] rounded-2xl sm:rounded-3xl overflow-hidden border border-purple-500/30 bg-[#0d0c1c] shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.25)] transition-all duration-300 hover:border-purple-400/50 hover:shadow-[0_20px_55px_rgba(0,0,0,0.9),0_0_40px_rgba(168,85,247,0.35)]">
              
              {/* The Actual Extracted High-Resolution Visual */}
              <img
                src={meta.imageSrc}
                alt={meta.altText}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-102"
              />

              {/* Subtle Ambient Edge Vignette so the photo blends seamlessly into dark theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Corner Decorative Tech Markers */}
              <div className="absolute top-3 left-3 text-[10px] font-mono font-bold text-purple-300/80 bg-black/60 px-2 py-0.5 rounded border border-purple-500/30 backdrop-blur-sm">
                OLV // RIG-VIEW
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 border border-purple-500/30 backdrop-blur-sm text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Visual Caption Details */}
            <div className="mt-4 text-center px-4">
              <h3 className="font-display font-bold text-sm sm:text-base text-zinc-200">
                {meta.captionTitle}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {meta.captionSubtitle}
              </p>
            </div>
          </div>

          {/* Bottom Ambience Specs */}
          <div className="hidden sm:flex items-center justify-between text-xs text-zinc-500 pt-4 border-t border-purple-500/10 z-10">
            <span className="font-medium text-purple-400/80">Oliveal Gaming Zone</span>
            <span>24/7 PS5 & Racing Simulators</span>
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
