import { NotificationItem } from '../types/customer';
import { MOCK_NOTIFICATIONS } from '../mock-data/customer';

const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

let notifications: NotificationItem[] = [...MOCK_NOTIFICATIONS];

export const notificationService = {
  async getNotifications(): Promise<NotificationItem[]> {
    await delay();
    return [...notifications];
  },

  async markNotificationAsRead(id: string): Promise<void> {
    await delay(50);
    notifications = notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
  },

  async markAllNotificationsAsRead(): Promise<void> {
    await delay(50);
    notifications = notifications.map((n) => ({ ...n, isRead: true }));
  },
};
