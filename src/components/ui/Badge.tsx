import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'purple' | 'cyan' | 'zinc' | 'emerald';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'purple',
  size = 'md',
  ...props
}) => {
  const variants = {
    purple:
      'bg-purple-950/60 border border-purple-500/30 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
    cyan:
      'bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]',
    zinc:
      'bg-zinc-900/70 border border-zinc-700/60 text-zinc-300',
    emerald:
      'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 font-medium rounded-full',
    md: 'text-xs px-3 py-1 font-medium rounded-full',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 uppercase tracking-wider',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
