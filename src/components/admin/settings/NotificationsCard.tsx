import React from 'react';
import { Bell } from 'lucide-react';
import { AdminNotificationSettings } from '../../../types/adminSettings';

interface NotificationsCardProps {
  notifications: AdminNotificationSettings;
  onToggleNotification: (key: keyof AdminNotificationSettings) => void;
}

export const NotificationsCard: React.FC<NotificationsCardProps> = ({
  notifications,
  onToggleNotification,
}) => {
  return (
    <div className="bg-[#0e0a1d]/90 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col justify-between space-y-4 hover:border-purple-500/35 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Bell className="w-5 h-5 text-fuchsia-400 shrink-0 stroke-[2.2]" />
        <h2 className="text-base sm:text-lg font-bold text-white font-display">
          Notifications
        </h2>
      </div>

      {/* Notification Toggle Rows */}
      <div className="space-y-4">
        {/* Booking Confirmations */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-200">
              Booking Confirmations
            </h3>
            <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">
              Receive notifications for new bookings
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={notifications.bookingConfirmations}
            aria-label="Toggle booking confirmation notifications"
            onClick={() => onToggleNotification('bookingConfirmations')}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400/50 ${
              notifications.bookingConfirmations
                ? 'bg-purple-600 shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                : 'bg-zinc-800 border-zinc-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                notifications.bookingConfirmations ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* System Updates */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-200">
              System Updates
            </h3>
            <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">
              Receive important system updates
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={notifications.systemUpdates}
            aria-label="Toggle system updates notifications"
            onClick={() => onToggleNotification('systemUpdates')}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400/50 ${
              notifications.systemUpdates
                ? 'bg-purple-600 shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                : 'bg-zinc-800 border-zinc-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                notifications.systemUpdates ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

