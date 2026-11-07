import React, { useState } from 'react';
import { Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { AdminShell } from '../../components/admin/layout/AdminShell';
import { GamingZoneDetailsCard } from '../../components/admin/settings/GamingZoneDetailsCard';
import { PricingCard } from '../../components/admin/settings/PricingCard';
import { OperatingHoursCard } from '../../components/admin/settings/OperatingHoursCard';
import { NotificationsCard } from '../../components/admin/settings/NotificationsCard';
import { adminSettingsService } from '../../services/adminSettingsService';
import {
  AdminSettings,
  AdminPricingSettings,
  AdminOperatingHoursSettings,
  AdminNotificationSettings,
} from '../../types/adminSettings';

import headerPs5Img from '../../assets/dashboard/bookslot-header-ps5.png';

export const AdminSettingsPage: React.FC = () => {
  // Synchronous state initialization for instant visual rendering without flicker
  const [settings, setSettings] = useState<AdminSettings>(() =>
    adminSettingsService.getSettingsSync()
  );

  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Change handlers for Gaming Zone Details
  const handleZoneNameChange = (zoneName: string) => {
    setSettings((prev) => ({ ...prev, zoneName }));
  };

  const handleDescriptionChange = (description: string) => {
    setSettings((prev) => ({ ...prev, description }));
  };

  // Change handler for Pricing
  const handlePricingChange = (key: keyof AdminPricingSettings, val: number) => {
    setSettings((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [key]: val,
      },
    }));
  };

  // Change handler for Operating Hours
  const handleHoursChange = (key: keyof AdminOperatingHoursSettings, val: string) => {
    setSettings((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [key]: val,
      },
    }));
  };

  // Toggle handler for Notifications
  const handleToggleNotification = (key: keyof AdminNotificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  // Save Settings Action
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!settings.zoneName.trim()) {
      setToastType('error');
      setToastMessage('Zone Name is required.');
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setIsSaving(true);
    setToastMessage(null);

    try {
      const res = await adminSettingsService.saveSettings(settings);
      if (res.success) {
        setSettings(res.settings);
        setToastType('success');
        setToastMessage('Settings saved successfully!');
      } else {
        setToastType('error');
        setToastMessage('Failed to save settings.');
      }
    } catch {
      setToastType('error');
      setToastMessage('An unexpected error occurred while saving.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  return (
    <AdminShell pageTitle="Settings">
      <div className="space-y-4 sm:space-y-5 w-full max-w-7xl mx-auto pb-6">
        
        {/* ======================================================== */}
        {/* PAGE HEADER: TITLE + DESCRIPTION + PS5 LASER RIGS VISUAL */}
        {/* ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 relative">
          <div className="space-y-0.5 max-w-xl">
            <h1 className="text-2xl sm:text-3xl lg:text-[30px] font-extrabold font-display tracking-tight leading-tight text-white">
              Set<span className="text-purple-400">tings</span>
            </h1>
            <p className="text-xs sm:text-[13px] text-zinc-300 font-sans">
              Manage your gaming zone preferences.
            </p>
          </div>

          {/* Right Header Visual: PS5 Console + Controller with Purple Neon Glow */}
          <div className="hidden lg:flex items-center justify-end shrink-0">
            <div className="relative w-44 h-16 flex items-center justify-center">
              <div className="absolute inset-0 bg-purple-600/20 blur-xl rounded-full" />
              <img
                src={headerPs5Img}
                alt="PS5 Gaming Setup"
                className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SETTINGS FORM: TWO-COLUMN 4-CARD BALANCED GRID */}
        {/* ======================================================== */}
        <form onSubmit={handleSaveSettings} className="space-y-6 sm:space-y-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            {/* Top-Left: Gaming Zone Details Card */}
            <GamingZoneDetailsCard
              zoneName={settings.zoneName}
              description={settings.description}
              onChangeZoneName={handleZoneNameChange}
              onChangeDescription={handleDescriptionChange}
            />

            {/* Top-Right: Pricing (Per Hour) Card */}
            <PricingCard
              pricing={settings.pricing}
              onChangePricing={handlePricingChange}
            />

            {/* Bottom-Left: Operating Hours Card */}
            <OperatingHoursCard
              operatingHours={settings.operatingHours}
              onChangeHours={handleHoursChange}
            />

            {/* Bottom-Right: Notifications Card */}
            <NotificationsCard
              notifications={settings.notifications}
              onToggleNotification={handleToggleNotification}
            />
          </div>

          {/* ======================================================== */}
          {/* CENTERED ACTION BUTTON: SAVE SETTINGS */}
          {/* ======================================================== */}
          <div className="flex flex-col items-center justify-center pt-2 sm:pt-3">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 sm:px-10 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 hover:from-purple-500 hover:via-fuchsia-500 hover:to-purple-500 text-white font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(232,121,249,0.7)] flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Saving Settings...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Settings</span>
                </>
              )}
            </button>

            {/* Feedback notification toast / banner */}
            {toastMessage && (
              <div
                className={`mt-4 px-4 py-2.5 rounded-xl border flex items-center gap-2.5 text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-200 ${
                  toastType === 'success'
                    ? 'bg-purple-950/80 border-purple-500/40 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                    : 'bg-red-950/80 border-red-500/40 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                }`}
              >
                {toastType === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-fuchsia-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span>{toastMessage}</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </AdminShell>
  );
};
