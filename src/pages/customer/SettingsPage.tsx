import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { CustomerShell } from '../../components/customer/layout/CustomerShell';
import { authService } from '../../services/authService';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  // Notification Toggles
  const [notifyConfirmations, setNotifyConfirmations] = useState(true);
  const [notifyReminders, setNotifyReminders] = useState(true);
  const [notifyAnnouncements, setNotifyAnnouncements] = useState(true);
  const [prefsSaved, setPrefsSaved] = useState(false);

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Sign out confirmation modal
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSavePreferences = () => {
    setPrefsSaved(true);
    setTimeout(() => setPrefsSaved(false), 2500);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleConfirmLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <CustomerShell pageTitle="Settings">
      <div className="space-y-6 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="pb-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
            Account & <span className="text-purple-400">Settings</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage your lounge notification preferences, password security, and active session.
          </p>
        </div>

        {/* Section 1: Notification Preferences */}
        <div className="bg-[#0e0c1f] rounded-3xl border border-purple-500/15 p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-purple-500/10">
            <div className="flex items-center gap-2.5">
              <Bell className="w-5 h-5 text-purple-400" />
              <div>
                <h3 className="font-display font-bold text-base text-white">
                  Notification Preferences
                </h3>
                <p className="text-xs text-zinc-400">
                  Control how you receive session alerts and promotional news.
                </p>
              </div>
            </div>

            {prefsSaved && (
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Saved</span>
              </span>
            )}
          </div>

          <div className="space-y-4">
            {/* Toggle 1: Booking Confirmations */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/50 border border-purple-500/10">
              <div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-white">
                  Booking Confirmations & Passes
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Receive instant confirmation emails and QR check-in passes immediately after reservation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNotifyConfirmations(!notifyConfirmations);
                  handleSavePreferences();
                }}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  notifyConfirmations ? 'bg-purple-600' : 'bg-zinc-800'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white shadow-md transform transition-transform absolute top-1 ${
                    notifyConfirmations ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: 1-Hour Reminder */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/50 border border-purple-500/10">
              <div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-white">
                  Session Reminders (1 Hour Prior)
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Get notified 60 minutes before your gaming slot begins to ensure on-time arrival.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNotifyReminders(!notifyReminders);
                  handleSavePreferences();
                }}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  notifyReminders ? 'bg-purple-600' : 'bg-zinc-800'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white shadow-md transform transition-transform absolute top-1 ${
                    notifyReminders ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3: Offers & Hardware */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/50 border border-purple-500/10">
              <div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-white">
                  Exclusive Lounge Offers & New Rigs
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Stay updated on weekend gaming deals, discount codes, and new hardware arrivals.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNotifyAnnouncements(!notifyAnnouncements);
                  handleSavePreferences();
                }}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  notifyAnnouncements ? 'bg-purple-600' : 'bg-zinc-800'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white shadow-md transform transition-transform absolute top-1 ${
                    notifyAnnouncements ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Security & Password */}
        <div className="bg-[#0e0c1f] rounded-3xl border border-purple-500/15 p-6 sm:p-7 space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-purple-500/10">
            <Lock className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Security & Password
              </h3>
              <p className="text-xs text-zinc-400">
                Update your account password to protect your bookings.
              </p>
            </div>
          </div>

          {passwordSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Password updated successfully!</span>
            </div>
          )}

          {passwordError && (
            <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
            {/* Current Password */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-zinc-900/80 border border-purple-500/20 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-3 text-zinc-400 hover:text-white"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-zinc-900/80 border border-purple-500/20 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3 text-zinc-400 hover:text-white"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-purple-500/20 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-display font-semibold text-xs sm:text-sm shadow-[0_0_15px_rgba(168,85,247,0.35)] transition-all cursor-pointer"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Section 3: Active Session & Logout */}
        <div className="bg-[#0e0c1f] rounded-3xl border border-rose-500/20 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-display font-bold text-sm text-white">
              Sign Out of Account
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              Securely end your current customer session on this device.
            </p>
          </div>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowLogoutModal(false)}
            />
            <div className="relative w-full max-w-sm rounded-3xl bg-[#110f24] border border-purple-500/30 p-6 shadow-2xl z-10 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
                <LogOut className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-white">
                  Confirm Sign Out
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Are you sure you want to end your current session?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-900/50 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </CustomerShell>
  );
};