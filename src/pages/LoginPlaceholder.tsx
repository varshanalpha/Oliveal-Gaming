import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Sparkles } from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';

export const LoginPlaceholder: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080711] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-96 w-96 rounded-full bg-purple-900/20 blur-[120px]" />

      <div className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-[#131126] to-[#0a0817] border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.25)] text-center space-y-6">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>

        <div className="mx-auto w-14 h-14 rounded-2xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <Lock className="w-6 h-6 text-purple-400" />
        </div>

        <div className="space-y-2">
          <h2 className="font-display font-bold text-2xl text-white">
            Authentication Entry Point
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Per the sequential implementation plan, full customer & multi-admin authentication (Google OAuth & Supabase Auth) is scheduled for <span className="text-purple-300 font-semibold">Stage 3</span>.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-300 flex items-center gap-2 text-left">
          <Sparkles className="w-4 h-4 shrink-0 text-purple-400" />
          <span>This placeholder enables full landing-page CTA and navigation flow verification.</span>
        </div>

        <Button
          variant="primary"
          fullWidth
          onClick={() => navigate('/')}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Return to Landing Page
        </Button>
      </div>
    </div>
  );
};
