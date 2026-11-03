import { CustomerProfile, CustomerStatistics } from '../types/customer';
import { MOCK_CUSTOMER_PROFILE, MOCK_CUSTOMER_STATS } from '../mock-data/customer';

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

let currentProfile: CustomerProfile = { ...MOCK_CUSTOMER_PROFILE };

export const customerService = {
  async getCustomerProfile(): Promise<CustomerProfile> {
    await delay();
    return { ...currentProfile };
  },

  async updateCustomerProfile(data: Partial<CustomerProfile>): Promise<CustomerProfile> {
    await delay(200);
    currentProfile = {
      ...currentProfile,
      ...data,
      initials: data.fullName
        ? data.fullName
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : currentProfile.initials,
    };
    return { ...currentProfile };
  },

  async getCustomerStatistics(): Promise<CustomerStatistics> {
    await delay();
    return { ...MOCK_CUSTOMER_STATS };
  },
};

