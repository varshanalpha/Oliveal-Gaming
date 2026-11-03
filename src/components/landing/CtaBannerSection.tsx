import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const CtaBannerSection: React.FC = () => {
  const navigate = useNavigate();

  const handleBookSlot = () => {
    navigate('/login');
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#07060f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Glowing Banner Container */}
        <div className="relative rounded-3xl overflow-hidden border border-purple-500/40 bg-gradient-to-br from-[#1b153b] via-[#100d24] to-[#080714] p-8 sm:p-12 lg:p-16 text-center shadow-[0_0_50px_rgba(147,51,234,0.3)]">
          
          {/* Top Radial Glow within Card */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-500/30 blur-[100px] rounded-full" />
          <div className="pointer-events-none absolute bottom-0 right-10 w-[300px] h-[200px] bg-indigo-500/20 blur-[80px] rounded-full" />

          {/* Decorative Corner Decals */}
          <div className="absolute top-4 left-4 text-purple-500/30 font-mono text-xs select-none">
            + + OLV-ZONE-24/7 + +
          </div>
          <div className="absolute bottom-4 right-4 text-purple-500/30 font-mono text-xs select-none">
            SYS: ACTIVE // READY
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-200 text-xs font-semibold shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Limited 6 Rigs • 24/7 Live Availability</span>
            </div>

            {/* Headline */}
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.1]">
              Ready to Level Up Your <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent text-glow-purple">Gaming Experience?</span>
            </h2>

            {/* Subtitle */}
            <p className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Claim your PlayStation 5 station or jump inside the direct-drive racing cockpit. Zero queues, guaranteed slots, and instant QR entry.
            </p>

            {/* CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleBookSlot}
                icon={<Calendar className="w-5 h-5 text-purple-100" />}
                className="w-full sm:w-auto text-base px-9 py-4 shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] group"
              >
                <span>BOOK YOUR SLOT</span>
                <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Trust Points */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <span>Instant 5-Min Slot Hold</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span>Secure Online UPI / Card Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Counter QR Check-In</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

