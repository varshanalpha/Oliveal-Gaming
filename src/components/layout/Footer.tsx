import React from 'react';
import { Logo } from '../ui/Logo';
import { Badge } from '../ui/Badge';
import { MapPin, Mail, Phone, Clock, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative border-t border-purple-500/15 bg-[#06050d] pt-16 pb-12 overflow-hidden">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute bottom-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-purple-900/10 blur-[100px]" />
      <div className="pointer-events-none absolute top-10 right-10 -z-10 h-64 w-64 rounded-full bg-indigo-900/10 blur-[90px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-zinc-800/80">
          {/* Brand Info (Cols 1 & 2 on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Oliveal Gaming Zone is your premier 24/7 gaming destination. Featuring 4 competitive PlayStation 5 rigs and 2 immersive direct-drive racing simulators with zero-wait online booking.
            </p>

            <div className="inline-flex items-center gap-2 pt-2">
              <Badge variant="emerald" size="sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open 24/7 • Non-Stop Gaming
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-zinc-400 hover:text-purple-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#stations" className="text-zinc-400 hover:text-purple-300 transition-colors">
                  Gaming Stations
                </a>
              </li>
              <li>
                <a href="#games" className="text-zinc-400 hover:text-purple-300 transition-colors">
                  Featured Games
                </a>
              </li>
              <li>
                <a href="#why-us" className="text-zinc-400 hover:text-purple-300 transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-zinc-400 hover:text-purple-300 transition-colors">
                  How Booking Works
                </a>
              </li>
            </ul>
          </div>

          {/* Dedicated Stations */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase">
              Our Stations
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#stations" className="text-zinc-400 hover:text-purple-300 transition-colors flex items-center justify-between">
                  <span>PS5 ALPHA</span>
                  <span className="text-xs text-purple-400/80">₹150/hr</span>
                </a>
              </li>
              <li>
                <a href="#stations" className="text-zinc-400 hover:text-purple-300 transition-colors flex items-center justify-between">
                  <span>PS5 BETA</span>
                  <span className="text-xs text-purple-400/80">₹150/hr</span>
                </a>
              </li>
              <li>
                <a href="#stations" className="text-zinc-400 hover:text-purple-300 transition-colors flex items-center justify-between">
                  <span>PS5 GAMMA</span>
                  <span className="text-xs text-purple-400/80">₹150/hr</span>
                </a>
              </li>
              <li>
                <a href="#stations" className="text-zinc-400 hover:text-purple-300 transition-colors flex items-center justify-between">
                  <span>PS5 DELTA</span>
                  <span className="text-xs text-purple-400/80">₹150/hr</span>
                </a>
              </li>
              <li>
                <a href="#stations" className="text-zinc-400 hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>Simulator RS1</span>
                  <span className="text-xs text-cyan-400/80">₹200/hr</span>
                </a>
              </li>
              <li>
                <a href="#stations" className="text-zinc-400 hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>Simulator RS2</span>
                  <span className="text-xs text-cyan-400/80">₹200/hr</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Placeholders & Rules */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase">
              Lounge Location
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>Oliveal Gaming Lounge, City Center Hub, Main Esports Street</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Operating 24/7 • 365 Days a Year</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <span>+91 90000 00000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>support@olivealgaming.example</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policy Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2 text-center md:text-left">
            <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              Strict Policy: All confirmed slot reservations are final. No cancellations or refunds permitted.
            </span>
          </div>

          <p className="text-center md:text-right">
            &copy; {currentYear} Oliveal Gaming Zone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
