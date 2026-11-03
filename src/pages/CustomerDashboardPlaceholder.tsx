import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, CheckCircle2, Gamepad2 } from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { authService } from '../services/authService';

export const CustomerDashboardPlaceholder: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#080711] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-96 w-96 rounded-full bg-purple-900/20 blur-[130px]" />

      <div className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-[#131126] to-[#0a0817] border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.25)] text-center space-y-6">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>

        <div className="mx-auto w-16 h-16 rounded-2xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.35)]">
          <User className="w-8 h-8 text-purple-300" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Authenticated Customer Session</span>
          </div>

          <h2 className="font-display font-extrabold text-2xl text-white">
            Welcome, {currentUser?.fullName || 'Gamer'}!
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Customer authentication was successful. In accordance with the sequential build plan, the <span className="text-purple-300 font-semibold">Customer Booking Flow & Pass Dashboard</span> will be implemented in the next phase.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-300 flex items-center gap-2 text-left">
          <Gamepad2 className="w-4 h-4 shrink-0 text-purple-400" />
          <span>Active user: <strong className="text-white">{currentUser?.email || 'gamer@oliveal.com'}</strong></span>
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          <Button
            variant="primary"
            fullWidth
            onClick={() => navigate('/')}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Home Page
          </Button>

          <Button
            variant="outline"
            fullWidth
            onClick={handleLogout}
            className="text-xs"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};
