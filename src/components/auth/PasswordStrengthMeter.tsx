import React from 'react';

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const calculateStrength = (pwd: string): { score: number; label: string; color: string } => {
    if (!pwd) return { score: 0, label: '', color: 'bg-zinc-700' };

    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', color: 'bg-red-500' };
      case 2:
        return { score: 2, label: 'Fair', color: 'bg-amber-500' };
      case 3:
        return { score: 3, label: 'Good', color: 'bg-cyan-500' };
      case 4:
        return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
      default:
        return { score: 0, label: '', color: 'bg-zinc-700' };
    }
  };

  const { score, label, color } = calculateStrength(password);

  if (!password) return null;

  return (
    <div className="flex items-center justify-between gap-3 text-xs pt-1 pb-1">
      <span className="text-zinc-400 font-medium">Password Strength</span>
      
      <div className="flex items-center gap-1.5 flex-1 max-w-[130px]">
        {[1, 2, 3, 4].map((seg) => (
          <div
            key={seg}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              seg <= score ? color : 'bg-zinc-800'
            }`}
          />
        ))}
      </div>

      <span
        className={`font-semibold tracking-wide text-xs transition-colors duration-200 ${
          score === 4
            ? 'text-emerald-400'
            : score === 3
            ? 'text-cyan-400'
            : score === 2
            ? 'text-amber-400'
            : 'text-red-400'
        }`}
      >
        {label}
      </span>
    </div>
  );
};
