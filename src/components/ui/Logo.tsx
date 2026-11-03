import React from 'react';
import { Gamepad2 } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  const subTextSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[11px] tracking-[0.25em]',
    lg: 'text-xs tracking-[0.28em]',
  };

  return (
    <a
      href="#home"
      className={`group flex items-center gap-3 transition-opacity hover:opacity-95 ${className}`}
      aria-label="Oliveal Gaming Zone Home"
    >
      <div className="relative flex items-center justify-center">
        {/* Glow backdrop */}
        <div className="absolute inset-0 rounded-xl bg-purple-600/40 blur-md transition-all duration-300 group-hover:bg-purple-500/60" />
        <div className="relative flex items-center justify-center rounded-xl border border-purple-500/40 bg-gradient-to-br from-purple-900/60 to-purple-950/90 p-2 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.35)] transition-transform duration-200 group-hover:scale-105">
          <Gamepad2 className={`${iconSizes[size]} text-purple-400 group-hover:text-purple-200`} />
        </div>
      </div>

      <div className="flex flex-col">
        <span className={`font-display font-extrabold uppercase text-white ${textSizes[size]} tracking-tight leading-none`}>
          Oliveal
        </span>
        <span className={`font-display font-bold uppercase text-purple-400 ${subTextSizes[size]} mt-0.5 leading-none`}>
          Gaming Zone
        </span>
      </div>
    </a>
  );
};

