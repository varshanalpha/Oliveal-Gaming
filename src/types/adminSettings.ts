export interface AdminPricingSettings {
  ps5_1p: number; // e.g. 150
  ps5_2p: number; // e.g. 200
  racingSim_1p: number; // e.g. 200
}

export interface AdminOperatingHoursSettings {
  openTime: string; // e.g. "12:00 AM"
  closeTime: string; // e.g. "11:59 PM"
}

export interface AdminNotificationSettings {
  bookingConfirmations: boolean;
  systemUpdates: boolean;
}

export interface AdminSettings {
  zoneName: string;
  description: string;
  pricing: AdminPricingSettings;
  operatingHours: AdminOperatingHoursSettings;
  notifications: AdminNotificationSettings;
  updatedAt?: string;
}

export interface SaveSettingsResponse {
  success: boolean;
  settings: AdminSettings;
  message?: string;
}

