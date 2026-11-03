import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Send,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { CustomerShell } from '../../components/customer/layout/CustomerShell';
import { supportService } from '../../services/supportService';
import { FAQItem } from '../../types/customer';
import { MOCK_FAQS } from '../../mock-data/customer';

export const SupportPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>(MOCK_FAQS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  // Support Form State
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'booking' | 'hardware' | 'payment' | 'other'>('booking');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    supportService.getFAQs().then(setFaqs);
  }, []);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    setIsSubmitting(true);
    await supportService.submitSupportTicket({
      subject,
      category,
      description: message,
    });
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  return (
    <CustomerShell pageTitle="Help & Support">
      <div className="space-y-6 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="pb-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
            Help & <span className="text-purple-400">Support</span> Center
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Browse frequently asked questions regarding reservations, hardware, and lounge rules, or send our desk lead a message.
          </p>
        </div>

        {/* Quick Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-[#0e0c1f] border border-purple-500/15 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider block">
                Direct Line & WhatsApp
              </span>
              <span className="font-display font-bold text-white text-xs sm:text-sm">
                +91 98765 43210
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e0c1f] border border-purple-500/15 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider block">
                Customer Email
              </span>
              <span className="font-display font-bold text-white text-xs sm:text-sm">
                support@olivealgaming.com
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e0c1f] border border-purple-500/15 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider block">
                Gaming Lounge
              </span>
              <span className="font-display font-bold text-white text-xs sm:text-sm truncate block">
                Race Course Road, Coimbatore
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Searchable FAQ Accordion */}
        <div className="bg-[#0e0c1f] rounded-3xl border border-purple-500/15 p-6 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-purple-500/10">
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              <div>
                <h3 className="font-display font-bold text-base text-white">
                  Frequently Asked Questions
                </h3>
                <p className="text-xs text-zinc-400">
                  Instant answers to common queries about slots, policies, and gear.
                </p>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900/80 border border-purple-500/20 text-white text-xs focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All FAQs' },
              { id: 'booking', label: 'Booking' },
              { id: 'policies', label: 'Policies' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'stations', label: 'Stations' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-2.5">
            {filteredFaqs.length === 0 ? (
              <div className="py-8 text-center text-xs text-zinc-500">
                No matching questions found for "{searchQuery}".
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl bg-zinc-900/50 border border-purple-500/10 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                      className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-zinc-900/80"
                    >
                      <span className="font-display font-bold text-xs sm:text-sm text-white pr-4">
                        {faq.question}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-purple-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 text-xs text-zinc-300 leading-relaxed border-t border-purple-500/5 font-sans">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Section 2: Contact Support Desk Form */}
        <div className="bg-[#0e0c1f] rounded-3xl border border-purple-500/15 p-6 sm:p-7 space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-purple-500/10">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Contact Customer Support
              </h3>
              <p className="text-xs text-zinc-400">
                Need specialized assistance or have lounge feedback? Reach out directly.
              </p>
            </div>
          </div>

          {submitSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Your message has been dispatched to operations! Our support team will reply within 30 minutes.
              </span>
            </div>
          )}

          <form onSubmit={handleTicketSubmit} className="space-y-4 max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Subject */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Question regarding Station RS1"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-purple-500/20 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-purple-500/20 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="booking">Booking / Schedule Assistance</option>
                  <option value="hardware">Hardware & Station Feedback</option>
                  <option value="payment">Payment & Billing Query</option>
                  <option value="other">General Inquiries</option>
                </select>
              </div>
            </div>

            {/* Message Description */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Message Description
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your question or issue in detail..."
                className="w-full p-4 rounded-xl bg-zinc-900/80 border border-purple-500/20 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-display font-semibold text-xs sm:text-sm shadow-[0_0_15px_rgba(168,85,247,0.35)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

      </div>
    </CustomerShell>
  );
};