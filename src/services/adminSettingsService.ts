import { AdminSettings, SaveSettingsResponse } from '../types/adminSettings';

const SETTINGS_STORAGE_KEY = 'oliveal_admin_settings';

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  zoneName: 'Oliveal Gaming Zone',
  description: 'Premium gaming experience, 24/7',
  pricing: {
    ps5_1p: 150,
    ps5_2p: 200,
    racingSim_1p: 200,
  },
  operatingHours: {
    openTime: '12:00 AM',
    closeTime: '11:59 PM',
  },
  notifications: {
    bookingConfirmations: true,
    systemUpdates: true,
  },
  updatedAt: new Date().toISOString(),
};

class AdminSettingsService {
  /**
   * Synchronously get admin settings from localStorage or fall back to defaults
   */
  public getSettingsSync(): AdminSettings {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore JSON parse errors
    }
    return DEFAULT_ADMIN_SETTINGS;
  }

  /**
   * Asynchronously get admin settings
   */
  public async getSettings(): Promise<AdminSettings> {
    await new Promise((res) => setTimeout(res, 80));
    return this.getSettingsSync();
  }

  /**
   * Save updated admin settings to persistent storage
   */
  public async saveSettings(newSettings: AdminSettings): Promise<SaveSettingsResponse> {
    await new Promise((res) => setTimeout(res, 400));
    const toSave: AdminSettings = {
      ...newSettings,
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(toSave));
    } catch (err) {
      console.error('Failed to write admin settings to localStorage:', err);
    }

    return {
      success: true,
      settings: toSave,
      message: 'Settings saved successfully',
    };
  }

  /**
   * Reset settings back to initial reference defaults
   */
  public resetToDefaults(): AdminSettings {
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
    return DEFAULT_ADMIN_SETTINGS;
  }
}

export const adminSettingsService = new AdminSettingsService();

