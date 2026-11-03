import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Gamepad2,
  Save,
  Edit2,
  Award,
} from 'lucide-react';
import { CustomerShell } from '../../components/customer/layout/CustomerShell';
import { customerService } from '../../services/customerService';
import { CustomerProfile, CustomerStatistics } from '../../types/customer';
import { MOCK_CUSTOMER_PROFILE, MOCK_CUSTOMER_STATS } from '../../mock-data/customer';

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<CustomerProfile>(MOCK_CUSTOMER_PROFILE);
  const [stats, setStats] = useState<CustomerStatistics>(MOCK_CUSTOMER_STATS);

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(MOCK_CUSTOMER_PROFILE.fullName);
  const [email, setEmail] = useState(MOCK_CUSTOMER_PROFILE.email);
  const [phone, setPhone] = useState(MOCK_CUSTOMER_PROFILE.phone);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    customerService.getCustomerProfile().then((data) => {
      setProfile(data);
      setFullName(data.fullName);
      setEmail(data.email);
      setPhone(data.phone);
    });
    customerService.getCustomerStatistics().then(setStats);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updated = await customerService.updateCustomerProfile({
      fullName,
      phone,
    });
    setProfile(updated);
    setIsSubmitting(false);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <CustomerShell pageTitle="Profile">
      <div className="space-y-6 max-w-5xl mx-auto">
        
        {/* Profile Hero Header */}
        <div className="relative rounded-3xl overflow-hidden bg-[#0e0c1f] border border-purple-500/20 p-6 sm:p-8 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            {/* Avatar Pill */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 flex items-center justify-center text-white font-display font-black text-2xl sm:text-3xl shadow-[0_0_25px_rgba(168,85,247,0.4)] shrink-0 ring-4 ring-purple-500/20">
              {profile?.initials || 'RV'}
            </div>

            {/* Profile Meta */}
            <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight truncate">
                  {profile?.fullName || 'R Varshan'}
                </h1>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-semibold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-purple-400" />
                    <span>Lounge Member</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                {profile?.email} • Member since {profile?.memberSince || 'September 2026'}
              </p>
            </div>

            {/* Edit Profile Button */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-display font-semibold text-xs sm:text-sm shadow-[0_0_15px_rgba(168,85,247,0.35)] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Profile details updated successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Personal Details Form (Left 2 cols) */}
          <div className="lg:col-span-2 bg-[#0e0c1f] rounded-3xl border border-purple-500/15 p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-purple-500/10">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-purple-400" />
                <h3 className="font-display font-bold text-base text-white">
                  Personal Information
                </h3>
              </div>
              <span className="text-[11px] text-zinc-400 font-mono">
                ACCOUNT ID: {profile?.id || 'usr-varshan-01'}
              </span>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-purple-500/20 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500 disabled:opacity-60 transition-colors"
                  />
                </div>
              </div>

              {/* Email Address (Always read-only verified) */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full pl-10 pr-20 py-2.5 rounded-xl bg-zinc-900/50 border border-purple-500/10 text-zinc-400 text-xs sm:text-sm cursor-not-allowed"
                  />
                  <span className="absolute right-3.5 top-2.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    VERIFIED
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 mt-1">
                  Email verification is tied to your login credentials.
                </p>
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-purple-500/20 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500 disabled:opacity-60 transition-colors"
                  />
                </div>
                <p className="text-[10px] text-zinc-500 mt-1">
                  Used for instantaneous SMS booking confirmation alerts.
                </p>
              </div>

              {/* Form Action Buttons */}
              {isEditing && (
                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-display font-semibold text-xs sm:text-sm shadow-[0_0_15px_rgba(168,85,247,0.35)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFullName(profile?.fullName || '');
                      setPhone(profile?.phone || '');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Account Overview & Gaming Stats (Right col) */}
          <div className="space-y-5">
            {/* Gaming Metrics Box */}
            <div className="bg-[#0e0c1f] rounded-3xl border border-purple-500/15 p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-purple-500/10">
                <Gamepad2 className="w-4 h-4 text-purple-400" />
                <h4 className="font-display font-bold text-sm text-white">
                  Gaming Activity
                </h4>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-purple-500/10 text-xs">
                  <span className="text-zinc-400">Total Bookings</span>
                  <span className="font-display font-bold text-white text-sm">
                    {stats?.totalBookings ?? 12}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-purple-500/10 text-xs">
                  <span className="text-zinc-400">Completed Sessions</span>
                  <span className="font-display font-bold text-emerald-400 text-sm">
                    {stats?.completed ?? 9}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-purple-500/10 text-xs">
                  <span className="text-zinc-400">Total Gaming Time</span>
                  <span className="font-display font-bold text-amber-400 text-sm">
                    {stats?.gamingHours ?? 36} Hours
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-purple-500/10 text-xs">
                  <span className="text-zinc-400">Favorite Station</span>
                  <span className="font-display font-bold text-purple-300 text-sm">
                    PS5 Station BETA
                  </span>
                </div>
              </div>
            </div>

            {/* Account Security Card */}
            <div className="bg-[#0e0c1f] rounded-3xl border border-purple-500/15 p-6 space-y-3 text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-purple-500/10">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <h4 className="font-display font-bold text-sm text-white">
                  Security Status
                </h4>
              </div>

              <div className="space-y-2 text-zinc-300">
                <div className="flex items-center justify-between">
                  <span>Authentication</span>
                  <span className="text-purple-300 font-medium">Email + Password</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>2FA Email OTP</span>
                  <span className="text-emerald-400 font-medium">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Session Status</span>
                  <span className="text-emerald-400 font-medium">Active</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </CustomerShell>
  );
};