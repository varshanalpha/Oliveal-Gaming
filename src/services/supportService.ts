import { FAQItem, SupportTicketInput, CustomerPreferences } from '../types/customer';
import { MOCK_FAQS, MOCK_PREFERENCES } from '../mock-data/customer';

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

let currentPrefs: CustomerPreferences = { ...MOCK_PREFERENCES };

export const supportService = {
  async getFAQs(searchQuery = '', category = 'all'): Promise<FAQItem[]> {
    await delay();
    let result = [...MOCK_FAQS];
    if (category !== 'all') {
      result = result.filter((f) => f.category === category);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      );
    }
    return result;
  },

  async submitSupportTicket(ticket: SupportTicketInput): Promise<{ success: boolean; ticketId: string; message: string }> {
    await delay(350);
    const ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      success: true,
      ticketId,
      message: `Your inquiry regarding "${ticket.subject}" has been logged with ticket ID ${ticketId}. Our front-desk desk team will follow up via email.`,
    };
  },
};

export const preferencesService = {
  async getPreferences(): Promise<CustomerPreferences> {
    await delay();
    return { ...currentPrefs };
  },

  async updatePreferences(prefs: Partial<CustomerPreferences>): Promise<CustomerPreferences> {
    await delay(150);
    currentPrefs = { ...currentPrefs, ...prefs };
    return { ...currentPrefs };
  },
};
