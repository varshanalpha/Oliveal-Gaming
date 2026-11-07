import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Home,
  Calendar,
  Bell,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Check,
  Menu,
} from 'lucide-react';
import { customerService } from '../../../services/customerService';
import { notificationService } from '../../../services/notificationService';
import { useAuth } from '../../../hooks/useAuth';
import { CustomerProfile, NotificationItem } from '../../../types/customer';

interface CustomerHeaderProps {
  pageTitle: string;
  onOpenMobileMenu?: () => void;
}

export const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  pageTitle,
  onOpenMobileMenu,
}) => {
  const navigate = useNavigate();
  const { user, profile: authProfile, logout } = useAuth();
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    customerService.getCustomerProfile().then(setProfile);
    notificationService.getNotifications().then(setNotifications);

    // Click outside listeners
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

  const displayName = authProfile?.fullName || profile?.fullName || user?.email?.split('@')[0] || 'Gamer';
  const displayEmail = authProfile?.email || profile?.email || user?.email || 'gamer@oliveal.com';
  const displayInitials = authProfile?.fullName
    ? authProfile.fullName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : profile?.initials || 'OG';

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = async () => {
    await notificationService.markAllNotificationsAsRead();
    const updated = await notificationService.getNotifications();
    setNotifications(updated);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#080711]/90 backdrop-blur-xl border-b border-purple-500/15 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      
      {/* Left: Mobile Menu Trigger + Breadcrumb Title */}
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
          {pageTitle === 'Book Slot' ? (
            <Calendar className="w-4.5 h-4.5 text-purple-400 shrink-0" />
          ) : (
            <Home className="w-4.5 h-4.5 text-purple-400 shrink-0" />
          )}
          <span className="text-zinc-600 font-semibold">/</span>
          <span className="font-semibold text-white tracking-wide">{pageTitle}</span>
        </div>
      </div>

      {/* Right: Notifications & Profile Pill */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl bg-zinc-900/80 border border-purple-500/20 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 animate-pulse ring-2 ring-background" />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#110f24] border border-purple-500/30 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-purple-500/10">
                <div className="flex items-center gap-2">
                  <h4 className="font-display font-bold text-sm text-white">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3 h-3" />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              <div className="divide-y divide-purple-500/10 max-h-72 overflow-y-auto mt-2">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-zinc-500">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`py-3 px-2 rounded-xl transition-colors ${
                        notif.isRead ? 'opacity-70' : 'bg-purple-950/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-white">
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-zinc-500 whitespace-nowrap">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Pill Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 sm:px-3 sm:py-1.5 rounded-2xl bg-zinc-900/80 border border-purple-500/20 hover:border-purple-500/40 hover:bg-zinc-800/80 transition-all cursor-pointer"
          >
            {/* Avatar Circle with Initials */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white font-display font-bold text-xs shadow-[0_0_10px_rgba(168,85,247,0.4)]">
              {displayInitials}
            </div>

            <span className="hidden sm:block text-sm font-semibold text-zinc-200">
              {displayName}
            </span>
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          </button>

          {/* Profile Dropdown Options */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#110f24] border border-purple-500/30 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-purple-500/10">
                <p className="text-xs font-bold text-white truncate">
                  {displayName}
                </p>
                <p className="text-[11px] text-zinc-400 truncate">
                  {displayEmail}
                </p>
              </div>

              <div className="py-1">
                <Link
                  to="/customer/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-purple-950/40 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-purple-400" />
                  <span>My Profile</span>
                </Link>

                <Link
                  to="/customer/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-purple-950/40 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-purple-400" />
                  <span>Settings</span>
                </Link>

                <Link
                  to="/customer/support"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-purple-950/40 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                  <span>Help & Support</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-purple-500/10">
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

