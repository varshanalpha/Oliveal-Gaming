import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Star,
  Gamepad2,
  Ticket,
  User,
  Megaphone,
  Gift,
  ChevronRight,
  Tv,
} from 'lucide-react';
import { CustomerShell } from '../../components/customer/layout/CustomerShell';
import { BookingDetailsModal } from '../../components/customer/bookings/BookingDetailsModal';
import { customerService } from '../../services/customerService';
import { bookingService } from '../../services/bookingService';
import { announcementService } from '../../services/announcementService';
import {
  CustomerProfile,
  CustomerStatistics,
  CustomerBooking,
  Announcement,
} from '../../types/customer';
import {
  MOCK_CUSTOMER_PROFILE,
  MOCK_CUSTOMER_STATS,
  MOCK_UPCOMING_BOOKING,
  MOCK_CUSTOMER_BOOKINGS,
  MOCK_ANNOUNCEMENTS,
} from '../../mock-data/customer';

import heroRigsImg from '../../assets/dashboard/dashboard-hero-rigs.png';
import ps5ThumbImg from '../../assets/dashboard/station-ps5-thumb.png';
import rs1ThumbImg from '../../assets/dashboard/station-rs1-thumb.png';
import rs2ThumbImg from '../../assets/dashboard/station-rs2-thumb.png';

export const CustomerDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<CustomerProfile>(MOCK_CUSTOMER_PROFILE);
  const [stats, setStats] = useState<CustomerStatistics>(MOCK_CUSTOMER_STATS);
  const [upcomingBooking, setUpcomingBooking] = useState<CustomerBooking | null>(MOCK_UPCOMING_BOOKING);
  const [recentBookings, setRecentBookings] = useState<CustomerBooking[]>(
    MOCK_CUSTOMER_BOOKINGS.filter((b) => b.status === 'completed').slice(0, 3)
  );
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const [selectedBookingForModal, setSelectedBookingForModal] = useState<CustomerBooking | null>(null);

  useEffect(() => {
    customerService.getCustomerProfile().then(setProfile);
    customerService.getCustomerStatistics().then(setStats);
    bookingService.getUpcomingBooking().then(setUpcomingBooking);
    bookingService.getRecentBookings().then(setRecentBookings);
    announcementService.getAnnouncements().then(setAnnouncements);
  }, []);

  // 6 Stations matching reference image exactly
  const STATIONS = [
    {
      id: 'ALPHA',
      name: 'ALPHA',
      category: 'PlayStation 5',
      thumb: ps5ThumbImg,
      status: 'Available',
    },
    {
      id: 'BETA',
      name: 'BETA',
      category: 'PlayStation 5',
      thumb: ps5ThumbImg,
      status: 'Available',
    },
    {
      id: 'GAMMA',
      name: 'GAMMA',
      category: 'PlayStation 5',
      thumb: ps5ThumbImg,
      status: 'Available',
    },
    {
      id: 'DELTA',
      name: 'DELTA',
      category: 'PlayStation 5',
      thumb: ps5ThumbImg,
      status: 'Available',
    },
    {
      id: 'RS1',
      name: 'RS1',
      category: 'Racing Simulator',
      thumb: rs1ThumbImg,
      status: 'Available',
    },
    {
      id: 'RS2',
      name: 'RS2',
      category: 'Racing Simulator',
      thumb: rs2ThumbImg,
      status: 'Available',
    },
  ];

  return (
    <CustomerShell pageTitle="Customer Dashboard">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* ======================================================== */}
        {/* CENTER MAIN COLUMN (Hero, Stats, Stations, Recent)      */}
        {/* ======================================================== */}
        <div className="flex-1 w-full min-w-0 space-y-6">
          
          {/* Welcome Back Greeting */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              Welcome Back, <span className="text-purple-400">{profile?.fullName?.split(' ')[1] || 'Varshan'}!</span> 👋
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-sans">
              Ready for your next gaming session?
            </p>
          </div>

          {/* Hero Promo Banner Card */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#170e30] via-[#120a27] to-[#0c071d] border border-purple-500/25 p-6 sm:p-7 shadow-[0_0_35px_rgba(168,85,247,0.12)]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-md text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display text-white leading-tight">
                  Book Your Next <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-100 to-indigo-200">
                    Gaming Session
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Choose your favorite station, select a time slot, and get ready to play!
                </p>
                <div>
                  <Link
                    to="/customer/book-slot"
                    className="inline-flex items-center gap-2 mt-2 px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-display font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(168,85,247,0.45)] transition-all hover:scale-105"
                  >
                    <span>Book a Slot</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Rigs Hero Visual */}
              <div className="relative w-full sm:w-auto shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-purple-600/20 blur-3xl rounded-full" />
                <img
                  src={heroRigsImg}
                  alt="PlayStation 5 and Racing Simulator Setup"
                  className="relative w-64 sm:w-72 lg:w-80 h-auto object-contain filter drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                />
              </div>
            </div>
          </div>

          {/* 4 Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* 1. Total Bookings */}
            <div className="bg-[#0e0c1f] rounded-2xl border border-purple-500/15 p-4 flex items-center gap-3.5 hover:border-purple-500/30 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-medium text-zinc-400 block">Total Bookings</span>
                <span className="text-2xl font-black font-display text-white mt-0.5 block leading-none">
                  {stats?.totalBookings ?? 12}
                </span>
              </div>
            </div>

            {/* 2. Completed */}
            <div className="bg-[#0e0c1f] rounded-2xl border border-purple-500/15 p-4 flex items-center gap-3.5 hover:border-purple-500/30 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-medium text-zinc-400 block">Completed</span>
                <span className="text-2xl font-black font-display text-white mt-0.5 block leading-none">
                  {stats?.completed ?? 9}
                </span>
              </div>
            </div>

            {/* 3. Upcoming */}
            <div className="bg-[#0e0c1f] rounded-2xl border border-purple-500/15 p-4 flex items-center gap-3.5 hover:border-purple-500/30 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-medium text-zinc-400 block">Upcoming</span>
                <span className="text-2xl font-black font-display text-white mt-0.5 block leading-none">
                  {stats?.upcoming ?? 2}
                </span>
              </div>
            </div>

            {/* 4. Gaming Hours */}
            <div className="bg-[#0e0c1f] rounded-2xl border border-purple-500/15 p-4 flex items-center gap-3.5 hover:border-purple-500/30 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-medium text-zinc-400 block">Gaming Hours</span>
                <span className="text-2xl font-black font-display text-white mt-0.5 block leading-none">
                  {stats?.gamingHours ?? 36} hrs
                </span>
              </div>
            </div>
          </div>

          {/* Our Gaming Stations Section */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-purple-400" />
                <h3 className="font-display font-extrabold text-base sm:text-lg text-white">
                  Our <span className="text-purple-400">Gaming</span> Stations
                </h3>
              </div>

              <Link
                to="/customer/book-slot"
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
              >
                <span>View All Stations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 6 Stations Grid matching reference image */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {STATIONS.map((station) => (
                <div
                  key={station.id}
                  onClick={() => navigate('/customer/book-slot')}
                  className="bg-[#0e0c1f] hover:bg-[#15122e] border border-purple-500/15 hover:border-purple-500/40 rounded-2xl p-3 transition-all duration-200 group flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                >
                  <div className="w-full h-16 sm:h-20 rounded-xl bg-zinc-950/70 border border-purple-500/10 flex items-center justify-center overflow-hidden mb-2 relative">
                    <img
                      src={station.thumb}
                      alt={station.name}
                      className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-sm text-white tracking-wide">
                      {station.name}
                    </h4>
                    <p className="text-[10px] text-zinc-400 truncate">
                      {station.category}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-semibold text-emerald-400">
                        {station.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings Section */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-purple-400" />
                <h3 className="font-display font-extrabold text-base sm:text-lg text-white">
                  Recent Bookings
                </h3>
              </div>

              <Link
                to="/customer/bookings"
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Bookings Table / List Container */}
            <div className="rounded-2xl bg-[#0e0c1f] border border-purple-500/15 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#120f26] text-zinc-400 font-display uppercase tracking-wider text-[10px] border-b border-purple-500/10">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Station</th>
                      <th className="py-3 px-4 font-semibold">Date & Time</th>
                      <th className="py-3 px-4 font-semibold">Duration</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {recentBookings.map((bk) => (
                      <tr
                        key={bk.id}
                        className="hover:bg-purple-950/20 transition-colors"
                      >
                        {/* Station */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-purple-500/20 flex items-center justify-center shrink-0">
                              {bk.stationType === 'ps5' ? (
                                <Tv className="w-4 h-4 text-purple-400" />
                              ) : (
                                <Gamepad2 className="w-4 h-4 text-purple-400" />
                              )}
                            </div>
                            <span className="font-display font-bold text-white text-xs sm:text-sm">
                              {bk.stationName}
                            </span>
                          </div>
                        </td>

                        {/* Date & Time */}
                        <td className="py-3.5 px-4 text-zinc-300 font-medium">
                          {bk.bookingDate} • {bk.startTime}
                        </td>

                        {/* Duration */}
                        <td className="py-3.5 px-4 text-zinc-300">
                          {bk.duration}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 capitalize">
                            {bk.status}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedBookingForModal(bk)}
                            className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* RIGHT INFORMATION PANEL (Next Booking, Profile, Notifs)  */}
        {/* ======================================================== */}
        <div className="w-full lg:w-80 xl:w-84 shrink-0 space-y-5">
          
          {/* Card 1: Your Next Booking */}
          <div className="bg-[#0e0c1f] rounded-2xl border border-purple-500/20 p-5 shadow-[0_0_20px_rgba(168,85,247,0.08)] space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-purple-500/10">
              <Calendar className="w-4 h-4 text-purple-400" />
              <h3 className="font-display font-bold text-sm text-white">
                Your Next Booking
              </h3>
            </div>

            {upcomingBooking ? (
              <div className="space-y-4">
                {/* Station Banner */}
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-purple-500/20 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-zinc-950 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                    <img
                      src={ps5ThumbImg}
                      alt="Station preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-white text-base">
                      {upcomingBooking.stationName}
                    </h4>
                    <p className="text-[11px] text-purple-400 font-medium">
                      {upcomingBooking.stationType === 'ps5' ? 'PlayStation 5' : 'Racing Simulator'}
                    </p>
                  </div>
                </div>

                {/* Date & Time details */}
                <div className="space-y-2 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="font-medium text-white">{upcomingBooking.bookingDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{upcomingBooking.startTime} – {upcomingBooking.endTime} ({upcomingBooking.duration})</span>
                  </div>
                </div>

                {/* View Booking CTA */}
                <button
                  onClick={() => setSelectedBookingForModal(upcomingBooking)}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-display font-semibold text-xs sm:text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
                >
                  View Booking
                </button>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-zinc-400">
                No upcoming bookings right now.
              </div>
            )}
          </div>

          {/* Card 2: Your Profile */}
          <div className="bg-[#0e0c1f] rounded-2xl border border-purple-500/20 p-5 shadow-[0_0_20px_rgba(168,85,247,0.08)] space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-purple-500/10">
              <User className="w-4 h-4 text-purple-400" />
              <h3 className="font-display font-bold text-sm text-white">
                Your Profile
              </h3>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-display font-black text-base shadow-[0_0_15px_rgba(168,85,247,0.35)] shrink-0">
                {profile?.initials || 'RV'}
              </div>
              <div className="min-w-0">
                <h4 className="font-display font-extrabold text-sm text-white truncate">
                  {profile?.fullName || 'R Varshan'}
                </h4>
                <p className="text-xs text-zinc-400 truncate">
                  {profile?.email || 'varshan@gmail.com'}
                </p>
              </div>
            </div>

            <Link
              to="/customer/profile"
              className="block w-full text-center py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-display font-semibold text-xs sm:text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
            >
              Edit Profile
            </Link>
          </div>

          {/* Card 3: Announcements */}
          <div className="bg-[#0e0c1f] rounded-2xl border border-purple-500/20 p-5 shadow-[0_0_20px_rgba(168,85,247,0.08)] space-y-3.5">
            <div className="flex items-center gap-2 pb-2 border-b border-purple-500/10">
              <Megaphone className="w-4 h-4 text-purple-400" />
              <h3 className="font-display font-bold text-sm text-white">
                Announcements
              </h3>
            </div>

            <div className="space-y-2.5">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-3 rounded-xl bg-zinc-900/60 hover:bg-purple-950/30 border border-purple-500/10 hover:border-purple-500/30 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                      {ann.icon === 'gift' && <Gift className="w-4 h-4" />}
                      {ann.icon === 'gamepad' && <Gamepad2 className="w-4 h-4" />}
                      {ann.icon === 'calendar' && <Calendar className="w-4 h-4" />}
                    </div>
                    <div>
                      <h5 className="font-display font-bold text-xs text-white group-hover:text-purple-300 transition-colors">
                        {ann.title}
                      </h5>
                      <p className="text-[11px] text-zinc-400">
                        {ann.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-purple-300 transition-colors shrink-0" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Booking Pass Modal */}
      <BookingDetailsModal
        booking={selectedBookingForModal}
        onClose={() => setSelectedBookingForModal(null)}
      />
    </CustomerShell>
  );
};