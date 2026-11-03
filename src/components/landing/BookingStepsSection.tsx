import React from 'react';
import { useContent } from '../../hooks/useContent';
import { Monitor, Clock, QrCode, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const BookingStepsSection: React.FC = () => {
  const navigate = useNavigate();
  const { bookingSteps, loading } = useContent();

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return <Monitor className="w-6 h-6 text-purple-400" />;
      case 2:
        return <Clock className="w-6 h-6 text-purple-300" />;
      case 3:
        return <QrCode className="w-6 h-6 text-indigo-400" />;
      default:
        return <Monitor className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <section id="how-it-works" className="relative py-20 lg:py-28 bg-[#07060f] border-t border-purple-900/15 overflow-hidden">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[800px] max-w-full rounded-full bg-purple-900/10 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="purple" size="md">
            Seamless Experience
          </Badge>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent text-glow-purple">Booking</span> Works
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Reserve your gaming session in 3 straightforward steps. No waiting in line, no double bookings.
          </p>
        </div>

        {/* Steps Flow */}
        {loading ? (
          <div className="py-16 flex justify-center">
            <div className="w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="relative mt-16">
            
            {/* Desktop Horizontal Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-12 right-12 -translate-y-8 h-[2px] bg-gradient-to-r from-purple-500/10 via-purple-500/40 to-purple-500/10 -z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
              {bookingSteps.map((step) => (
                <div
                  key={step.step}
                  className="group relative rounded-2xl bg-gradient-to-b from-[#131126] to-[#0a0817] border border-purple-500/20 p-7 flex flex-col justify-between hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + Step Pill */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-purple-950/70 border border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.25)] group-hover:scale-105 transition-transform">
                        {getStepIcon(step.step)}
                      </div>
                      <span className="font-display font-black text-2xl sm:text-3xl text-purple-400/40 group-hover:text-purple-400 transition-colors">
                        0{step.step}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">
                        {step.tagline}
                      </span>
                      <h3 className="font-display text-xl font-bold text-white mt-1">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Bottom Highlight Pill */}
                  <div className="pt-5 mt-5 border-t border-purple-500/10 flex items-center justify-between text-xs">
                    <span className="text-purple-300 font-medium">
                      {step.highlight}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-purple-500 group-hover:animate-ping" />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Mini CTA */}
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/login')}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Start Your Reservation
              </Button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
