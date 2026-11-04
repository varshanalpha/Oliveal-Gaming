import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  CalendarDays,
  Zap,
  ScanQrCode,
  ChartNoAxesColumnIncreasing,
  Settings,
  Gamepad2,
  X,
} from 'lucide-react';
import sidebarControllerImg from '../../../assets/dashboard/bookslot-sidebar-controller.png';

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  mobileOpen = false,
  onCloseMobile,
}) => {
  const location = useLocation();

  // Exactly the 5 requested primary admin navigation items
  const NAV_ITEMS = [
    {
      label: 'Bookings',
      to: '/admin/bookings',
      icon: CalendarDays,
    },
    {
      label: 'On Spot Booking',
      to: '/admin/on-spot',
      icon: Zap,
    },
    {
      label: 'Scan QR',
      to: '/admin/scan-qr',
      icon: ScanQrCode,
    },
    {
      label: 'Reports',
      to: '/admin/reports',
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      label: 'Settings',
      to: '/admin/settings',
      icon: Settings,
    },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 sm:p-5 select-none relative overflow-hidden bg-[#0a0815] border-r border-purple-500/15">
      
      {/* Top: Brand Logo & Admin Portal Badge */}
      <div>
        <div className="flex items-center justify-between pb-5 border-b border-purple-500/10">
          <div className="flex items-center gap-3">
            {/* Glowing Icon */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-purple-600/40 blur-md transition-all duration-300" />
              <div className="relative flex items-center justify-center rounded-xl border border-purple-500/40 bg-gradient-to-br from-purple-900/60 to-purple-950/90 p-2 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.35)]">
                <Gamepad2 className="w-8 h-8 text-purple-400" />
              </div>
            </div>

            {/* Brand Text + Admin Portal Pill */}
            <div className="flex flex-col">
              <span className="font-display font-extrabold uppercase text-white text-base tracking-tight leading-none">
                Oliveal
              </span>
              <span className="font-display font-bold uppercase text-purple-400 text-[11px] tracking-[0.25em] mt-0.5 leading-none">
                Gaming Zone
              </span>
              <span className="mt-1.5 inline-block text-[9px] font-mono font-bold tracking-wider uppercase text-purple-300 bg-purple-950/80 border border-purple-500/30 px-2 py-0.5 rounded-full w-max shadow-sm">
                Admin Portal
              </span>
            </div>
          </div>

          {mobileOpen && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items (Matching Reference Image exact styling) */}
        <nav className="mt-6 space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            // Bookings is active on /admin/bookings or /admin
            const isActive =
              location.pathname === item.to ||
              (item.to === '/admin/bookings' && (location.pathname === '/admin' || location.pathname === '/admin/dashboard'));

            return (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={onCloseMobile}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[15px] transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.45)] font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Visual: DualSense Controller Glow with ADMIN CONTROL */}
      <div className="relative pt-6 flex flex-col items-center">
        <div className="relative w-40 h-28 flex items-center justify-center">
          <img
            src={sidebarControllerImg}
            alt="PlayStation DualSense controller"
            className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          />
        </div>
        <div className="text-[11px] text-zinc-400 font-mono tracking-widest text-center mt-1.5 font-bold uppercase">
          ADMIN CONTROL
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden lg:block w-64 h-screen shrink-0 sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80%] h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
