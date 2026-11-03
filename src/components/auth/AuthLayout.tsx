import React from 'react';
import { Logo } from '../ui/Logo';

// Import the 4 exact 9:16 portrait gaming images
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
  objectPosition: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ screenType, badgeLabel, children }) => {
  const getScreenMeta = (): ScreenVisualMeta => {
    switch (screenType) {
      case 'login':
        return {
          imageSrc: customerLoginVisual,
          altText: 'PS5 console and next-generation gaming setup at Oliveal Gaming Zone',
          captionTitle: 'PlayStation 5 Flagship Setup',
          captionSubtitle: 'ALPHA, BETA, GAMMA, DELTA • 4K 120Hz',
          objectPosition: 'object-[45%_40%]',
        };
      case 'signup':
        return {
          imageSrc: customerSignupVisual,
          altText: 'Gaming monitor, DualSense controller and headset battlestation',
          captionTitle: 'Next-Gen Esports Battlestation',
          captionSubtitle: 'Join Oliveal Gaming Zone • 24/7 Access',
          objectPosition: 'object-[50%_55%]',
        };
      case 'otp':
        return {
          imageSrc: emailOtpVisual,
          altText: 'Purple neon email envelope with verification symbol on glowing pedestal',
          captionTitle: 'Encrypted Email Verification',
          captionSubtitle: 'Secure Passcode Verification',
          objectPosition: 'object-center',
        };
      case 'admin':
        return {
          imageSrc: adminLoginVisual,
          altText: 'Gaming control center with gaming chair, triple monitors and RGB PC setup',
          captionTitle: 'Admin Operations Control Center',
          captionSubtitle: '24/7 Live Rig Matrix & Counter POS',
          objectPosition: 'object-[38%_45%]',
        };
    }
  };

  const meta = getScreenMeta();

  return (
    <div className="min-h-screen lg:h-screen bg-[#080711] text-foreground flex flex-col lg:flex-row overflow-x-hidden selection:bg-purple-600 selection:text-white relative">
      
      {/* Top Left Window Badge (Matching Reference Image exact badge header) */}
      <div className="absolute top-4 left-4 z-40">
        <span className="px-3.5 py-1.5 rounded-full bg-purple-600 text-white text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          {badgeLabel}
        </span>
      </div>

      {/* LEFT HALF: Full-Bleed 100% Visual Panel (Zero Empty Gaps) */}
      <div className="w-full lg:w-1/2 h-72 sm:h-96 lg:h-full relative overflow-hidden bg-black shrink-0">
        
        {/* The Exact Uploaded 9:16 Portrait Image Filling 100% of the Visual Panel */}
        <img
          src={meta.imageSrc}
          alt={meta.altText}
          className={`w-full h-full object-cover ${meta.objectPosition} block select-none transform transition-transform duration-700 hover:scale-[1.02]`}
        />

        {/* Ambient Dark Gradient Overlays for Logo Legibility and Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080711] via-transparent to-black/60 pointer-events-none lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#080711]/60" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Floating Brand Logo at Top-Left */}
        <div className="absolute top-14 left-4 sm:top-14 sm:left-6 lg:top-8 lg:left-8 z-30">
          <Logo size="md" />
        </div>

        {/* Floating Rig Status Badge at Bottom-Left of Visual Panel */}
        <div className="hidden sm:flex absolute bottom-4 left-6 lg:bottom-8 lg:left-8 z-30 items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-purple-500/30 text-xs text-zinc-200 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-purple-300">{meta.captionTitle}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">{meta.captionSubtitle}</span>
        </div>
      </div>

      {/* RIGHT HALF: Form Card Container (50% on Desktop, perfectly centered) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 lg:overflow-y-auto relative bg-[#080711] flex-1">
        
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900/15 blur-[120px] rounded-full" />

        {/* Form Card */}
        <div className="w-full max-w-md rounded-3xl bg-[#110f24]/95 border border-purple-500/25 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.8),0_0_20px_rgba(168,85,247,0.15)] backdrop-blur-2xl relative z-10 my-auto">
          {children}
        </div>
      </div>

    </div>
  );
};
