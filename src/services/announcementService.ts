import { Announcement } from '../types/customer';
import { MOCK_ANNOUNCEMENTS } from '../mock-data/customer';

const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

export const announcementService = {
  async getAnnouncements(): Promise<Announcement[]> {
    await delay();
    return [...MOCK_ANNOUNCEMENTS];
  },
};

