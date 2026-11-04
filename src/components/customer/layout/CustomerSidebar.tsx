import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarPlus,
  Ticket,
  UserRound,
  Settings,
  HelpCircle,
  X,
} from 'lucide-react';
import { Logo } from '../../ui/Logo';
import sidebarControllerImg from '../../../assets/dashboard/bookslot-sidebar-controller.png';

interface CustomerSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  hideDashboard?: boolean;
}

export const CustomerSidebar: React.FC<CustomerSidebarProps> = ({
  mobileOpen = false,
  onCloseMobile,
  hideDashboard = false,
}) => {
  const location = useLocation();

  const isBookSlotPage = location.pathname === '/customer/book-slot' || hideDashboard;

  const ALL_NAV_ITEMS = [
    {
      label: 'Dashboard',
      to: '/customer/dashboard',
      icon: LayoutDashboard,
      hideOnBookSlot: true,
    },
    {
      label: 'Book Slot',
      to: '/customer/book-slot',
      icon: CalendarPlus,
    },
    {
      label: 'My Bookings',
      to: '/customer/bookings',
      icon: Ticket,
    },
    {
      label: 'Profile',
      to: '/customer/profile',
      icon: UserRound,
    },
    {
      label: 'Settings',
      to: '/customer/settings',
      icon: Settings,
    },
    {
      label: 'Help & Support',
      to: '/customer/support',
      icon: HelpCircle,
    },
  ];

  const NAV_ITEMS = isBookSlotPage
    ? ALL_NAV_ITEMS.filter((item) => !item.hideOnBookSlot)
    : ALL_NAV_ITEMS;

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 sm:p-5 select-none relative overflow-hidden bg-[#0a0815] border-r border-purple-500/15">
      
      {/* Top: Brand Logo */}
      <div>
        <div className="flex items-center justify-between pb-6 border-b border-purple-500/10">
          <Logo size="md" />
          {mobileOpen && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items (Matching Reference Image exact styling) */}
        <nav className="mt-6 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;

            return (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Visual: DualSense Controller Glow (Directly from reference image) */}
      <div className="relative pt-6 flex flex-col items-center">
        <div className="relative w-36 h-28 flex items-center justify-center">
          <img
            src={sidebarControllerImg}
            alt="PlayStation DualSense controller"
            className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          />
        </div>
        <div className="text-[10px] text-zinc-500 font-mono tracking-wider text-center mt-1">
          OLIVEAL // 24/7 GAMING
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

