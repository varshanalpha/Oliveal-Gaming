import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Bell,
  ChevronDown,
  LogOut,
  Shield,
  Settings,
  Menu,
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

interface AdminHeaderProps {
  pageTitle: string;
  onOpenMobileMenu?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  pageTitle,
  onOpenMobileMenu,
}) => {
  const navigate = useNavigate();
  const { user, profile: authProfile, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = authProfile?.fullName || 'Admin';
  const displayEmail = authProfile?.email || user?.email || 'admin@oliveal.com';
  const displayInitials = authProfile?.fullName
    ? authProfile.fullName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'AD';

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#080610]/95 backdrop-blur-xl border-b border-purple-500/15 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      
      {/* Left: Mobile Trigger + Breadcrumb Title */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-purple-500/20 text-zinc-300 hover:text-white"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2.5 text-sm sm:text-[15px] text-zinc-400">
          <Home className="w-4.5 h-4.5 text-purple-400 shrink-0" />
          <span className="text-zinc-600 font-semibold">/</span>
          <span className="font-semibold text-white tracking-wide">{pageTitle}</span>
        </div>
      </div>

      {/* Right: Notifications & Admin Profile Pill */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-full bg-zinc-900/80 border border-purple-500/20 hover:border-purple-500/40 text-zinc-300 hover:text-white transition-all cursor-pointer"
            aria-label="Admin Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          </button>

          {/* Simple Notifications Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#110b1d] border border-purple-500/30 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-purple-500/15">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Admin Alerts
                </span>
                <span className="text-[10px] text-purple-400 font-mono">Live Sync</span>
              </div>
              <div className="py-2 space-y-2 text-xs">
                <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/20">
                  <p className="font-semibold text-white">New Booking BK-1001</p>
                  <p className="text-[11px] text-zinc-400">Station ALPHA booked for 06:00 PM – 07:00 PM</p>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900/40 border border-zinc-800">
                  <p className="font-semibold text-zinc-300">Station BETA Completed</p>
                  <p className="text-[11px] text-zinc-500">Session BK-0994 completed on time</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Pill */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 sm:px-3 sm:py-1.5 rounded-2xl bg-zinc-900/80 border border-purple-500/20 hover:border-purple-500/40 hover:bg-zinc-800/80 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white font-display font-bold text-xs shadow-[0_0_10px_rgba(168,85,247,0.4)]">
              {displayInitials}
            </div>

            <span className="hidden sm:block text-sm font-semibold text-zinc-200">
              {displayName}
            </span>
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#110b1d] border border-purple-500/30 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-purple-500/15">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  <span>Operations Manager</span>
                </div>
                <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                  {displayEmail}
                </p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/admin/settings');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-purple-950/40 transition-colors cursor-pointer text-left"
                >
                  <Settings className="w-3.5 h-3.5 text-purple-400" />
                  <span>Admin Settings</span>
                </button>
              </div>

              <div className="pt-1 border-t border-purple-500/15">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
