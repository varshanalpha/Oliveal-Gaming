import React, { useState } from 'react';
import {
  Gamepad2,
  Tv,
  Clock,
  Users,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  X,
  QrCode,
} from 'lucide-react';
import { CustomerShell } from '../../components/customer/layout/CustomerShell';
import { formatINR } from '../../lib/utils';
import ps5ThumbImg from '../../assets/dashboard/station-ps5-thumb.png';
import rs1ThumbImg from '../../assets/dashboard/station-rs1-thumb.png';
import rs2ThumbImg from '../../assets/dashboard/station-rs2-thumb.png';

interface StationSpec {
  id: string;
  name: string;
  category: 'ps5' | 'simulator';
  categoryLabel: string;
  hourlyRate1P: number;
  hourlyRate2P?: number;
  specs: string[];
  games: string[];
  thumb: string;
  isPopular?: boolean;
}

const STATIONS_DATA: StationSpec[] = [
  {
    id: 'st-alpha',
    name: 'Station ALPHA',
    category: 'ps5',
    categoryLabel: 'PlayStation 5 Setup',
    hourlyRate1P: 150,
    hourlyRate2P: 200,
    specs: ['PlayStation 5 Disc Edition', '4K 120Hz HDR Gaming Display', 'DualSense Haptic Wireless Controllers', 'SteelSeries Arctis Headset'],
    games: ['EA FC 25', 'Spider-Man 2', 'God of War Ragnarök', 'GTA V', 'Mortal Kombat 1'],
    thumb: ps5ThumbImg,
    isPopular: true,
  },
  {
    id: 'st-beta',
    name: 'Station BETA',
    category: 'ps5',
    categoryLabel: 'PlayStation 5 Setup',
    hourlyRate1P: 150,
    hourlyRate2P: 200,
    specs: ['PlayStation 5 Disc Edition', '4K 120Hz OLED Display', 'DualSense Wireless Controllers', 'Tempest 3D Audio Headset'],
    games: ['EA FC 25', 'Tekken 8', 'Spider-Man 2', 'Call of Duty: MW3', 'Gran Turismo 7'],
    thumb: ps5ThumbImg,
  },
  {
    id: 'st-gamma',
    name: 'Station GAMMA',
    category: 'ps5',
    categoryLabel: 'PlayStation 5 Setup',
    hourlyRate1P: 150,
    hourlyRate2P: 200,
    specs: ['PlayStation 5 Digital Edition', '55" Ultra-Low Latency Display', 'DualSense Controllers (2x)', 'Acoustic Surround Sound'],
    games: ['WWE 2K24', 'EA FC 25', 'NBA 2K25', 'Rocket League', 'It Takes Two'],
    thumb: ps5ThumbImg,
  },
  {
    id: 'st-delta',
    name: 'Station DELTA',
    category: 'ps5',
    categoryLabel: 'PlayStation 5 Setup',
    hourlyRate1P: 150,
    hourlyRate2P: 200,
    specs: ['PlayStation 5 Disc Edition', '4K 120Hz Gaming Display', 'DualSense Edge Pro Controller', 'HyperX Cloud III Headset'],
    games: ['Spider-Man 2', 'EA FC 25', 'Ghost of Tsushima', 'Black Myth: Wukong', 'FIFA 23'],
    thumb: ps5ThumbImg,
  },
  {
    id: 'st-rs1',
    name: 'Simulator RS1',
    category: 'simulator',
    categoryLabel: 'Pro Racing Simulator',
    hourlyRate1P: 200,
    specs: ['Fanatec Direct Drive 8Nm Wheelbase', 'Heusinkveld Load-Cell Pedals', 'Curved Triple Ultrawide Displays', 'Sparco FIA Bucket Racing Seat'],
    games: ['Assetto Corsa Competizione', 'F1 24', 'Forza Motorsport', 'Dirt Rally 2.0', 'iRacing'],
    thumb: rs1ThumbImg,
    isPopular: true,
  },
  {
    id: 'st-rs2',
    name: 'Simulator RS2',
    category: 'simulator',
    categoryLabel: 'Motion Racing Simulator',
    hourlyRate1P: 200,
    specs: ['Direct Drive Force Feedback System', 'H-Pattern & Sequential Shifter', 'Dual QHD Cockpit Panoramic Displays', 'Next-Gen Tactile Bass Shakers'],
    games: ['Gran Turismo 7', 'F1 24', 'Assetto Corsa EVO', 'Automobilista 2', 'WRC Generations'],
    thumb: rs2ThumbImg,
  },
];

export const BookSlotPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'ps5' | 'simulator'>('all');
  const [selectedStation, setSelectedStation] = useState<StationSpec | null>(null);

  // Booking Flow modal states
  const [selectedDuration, setSelectedDuration] = useState<60 | 90 | 120>(60);
  const [selectedPlayers, setSelectedPlayers] = useState<1 | 2>(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('06:00 PM – 07:00 PM');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [generatedPassCode, setGeneratedPassCode] = useState<string>('');

  const filteredStations = STATIONS_DATA.filter((s) => {
    if (filter === 'all') return true;
    return s.category === filter;
  });

  const handleOpenBooking = (station: StationSpec) => {
    setSelectedStation(station);
    setSelectedDuration(60);
    setSelectedPlayers(1);
    setSelectedTimeSlot('06:00 PM – 07:00 PM');
    setBookingConfirmed(false);
  };

  const calculateTotal = () => {
    if (!selectedStation) return 0;
    const baseRate =
      selectedStation.category === 'ps5' && selectedPlayers === 2
        ? (selectedStation.hourlyRate2P || 200)
        : selectedStation.hourlyRate1P;

    const multiplier = selectedDuration / 60;
    return Math.round(baseRate * multiplier);
  };

  const handleConfirmReservation = () => {
    const code = `OLV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${selectedStation?.name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase()}`;
    setGeneratedPassCode(code);
    setBookingConfirmed(true);
  };

  return (
    <CustomerShell pageTitle="Book Slot">
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Header & 8:00 PM Rule Notice */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              Reserve Your <span className="text-purple-400">Gaming Station</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Select your high-performance station, pick your duration, and reserve with instant verification.
            </p>
          </div>

          {/* 8:00 PM IST Schedule Rule Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <Clock className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              <strong>8:00 PM Daily Rule:</strong> Tomorrow's slots unlock at 20:00 IST every night.
            </span>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center gap-2 border-b border-purple-500/15 pb-4 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-semibold transition-all cursor-pointer shrink-0 ${
              filter === 'all'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            All Stations (6)
          </button>
          <button
            onClick={() => setFilter('ps5')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-semibold transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
              filter === 'ps5'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>PlayStation 5 (4)</span>
          </button>
          <button
            onClick={() => setFilter('simulator')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-semibold transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
              filter === 'simulator'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Racing Simulators (2)</span>
          </button>
        </div>

        {/* Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStations.map((station) => (
            <div
              key={station.id}
              className="bg-[#0e0c1f] rounded-3xl border border-purple-500/15 hover:border-purple-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.18)] relative overflow-hidden group"
            >
              {station.isPopular && (
                <div className="absolute top-4 right-4 z-10 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-bold font-display shadow-md">
                  POPULAR
                </div>
              )}

              {/* Top Station Thumbnail */}
              <div>
                <div className="w-full h-40 rounded-2xl bg-zinc-950/80 border border-purple-500/10 flex items-center justify-center p-3 relative overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-purple-600/10 blur-xl rounded-full" />
                  <img
                    src={station.thumb}
                    alt={station.name}
                    className="relative max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-900/90 border border-purple-500/20 text-[10px] text-emerald-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Station Available</span>
                  </div>
                </div>

                {/* Station Info */}
                <div className="space-y-1 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                    {station.categoryLabel}
                  </span>
                  <h3 className="text-xl font-display font-extrabold text-white">
                    {station.name}
                  </h3>
                </div>

                {/* Pricing pill */}
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-purple-500/15 mb-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-zinc-400 text-[11px]">1 Player</span>
                    <p className="font-display font-bold text-white text-sm">
                      {formatINR(station.hourlyRate1P)} <span className="text-[10px] text-zinc-400 font-normal">/ hr</span>
                    </p>
                  </div>
                  {station.hourlyRate2P && (
                    <div className="text-right border-l border-zinc-800 pl-4">
                      <span className="text-zinc-400 text-[11px]">2 Players</span>
                      <p className="font-display font-bold text-white text-sm">
                        {formatINR(station.hourlyRate2P)} <span className="text-[10px] text-zinc-400 font-normal">/ hr</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Specs List */}
                <div className="space-y-1.5 text-xs text-zinc-400 mb-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Hardware Specifications
                  </span>
                  <ul className="space-y-1">
                    {station.specs.slice(0, 3).map((spec, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="truncate">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom CTA Button */}
              <button
                onClick={() => handleOpenBooking(station)}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-display font-semibold text-xs sm:text-sm shadow-[0_0_15px_rgba(168,85,247,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Book Station</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Policy Alert Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/30 border border-purple-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-300">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-display font-bold text-white text-sm">
                Strict Booking Guarantee & Policies
              </h5>
              <p className="text-zinc-400 text-xs mt-0.5">
                All confirmed slot reservations are strictly non-cancellable and non-refundable. Each booking receives a 5-minute checkout lock during slot selection.
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE BOOKING MODAL (Mock Entry Workflow)         */}
        {/* ======================================================== */}
        {selectedStation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md animate-in fade-in"
              onClick={() => setSelectedStation(null)}
            />

            <div className="relative w-full max-w-lg rounded-3xl bg-[#110f24] border border-purple-500/30 p-6 sm:p-7 shadow-[0_0_50px_rgba(168,85,247,0.3)] z-10 animate-in zoom-in-95 duration-200">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">
                    Slot Reservation Entry
                  </span>
                  <h3 className="font-display font-bold text-lg text-white">
                    {selectedStation.name}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedStation(null)}
                  className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!bookingConfirmed ? (
                /* Slot Selection Form */
                <div className="space-y-4 pt-4">
                  {/* Select Duration */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-2">
                      1. Select Session Duration
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {([60, 90, 120] as const).map((duration) => (
                        <button
                          key={duration}
                          type="button"
                          onClick={() => setSelectedDuration(duration)}
                          className={`py-2 px-3 rounded-xl text-xs font-display font-semibold transition-all cursor-pointer ${
                            selectedDuration === duration
                              ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                              : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                          }`}
                        >
                          {duration} Minutes
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Players (if PS5) */}
                  {selectedStation.category === 'ps5' && (
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-2">
                        2. Number of Players
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedPlayers(1)}
                          className={`py-2 px-3 rounded-xl text-xs font-display font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            selectedPlayers === 1
                              ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                              : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                          }`}
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>1 Player (₹150/hr)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedPlayers(2)}
                          className={`py-2 px-3 rounded-xl text-xs font-display font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            selectedPlayers === 2
                              ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                              : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                          }`}
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>2 Players (₹200/hr)</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Select Time Slot */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-2">
                      {selectedStation.category === 'ps5' ? '3.' : '2.'} Select Available Slot (Today)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        '05:00 PM – 06:00 PM',
                        '06:00 PM – 07:00 PM',
                        '07:00 PM – 08:00 PM',
                        '08:00 PM – 09:00 PM',
                      ].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-3 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                            selectedTimeSlot === slot
                              ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)] font-semibold'
                              : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Summary */}
                  <div className="p-3.5 rounded-2xl bg-zinc-950 border border-purple-500/20 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-zinc-400 block">Total Amount</span>
                      <span className="text-xl font-display font-black text-emerald-400">
                        {formatINR(calculateTotal())}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono text-purple-400 block">
                        5-Min Checkout Lock
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        Non-cancellable
                      </span>
                    </div>
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={handleConfirmReservation}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-display font-semibold text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
                  >
                    Confirm & Reserve Slot
                  </button>
                </div>
              ) : (
                /* Success Pass Preview */
                <div className="space-y-4 pt-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-lg text-white">
                      Reservation Confirmed!
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 font-mono text-purple-400">
                      Pass Code: {generatedPassCode}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-950 border border-purple-500/30 flex flex-col items-center justify-center space-y-2">
                    <div className="w-28 h-28 rounded-xl bg-white p-2 shadow-lg flex items-center justify-center">
                      <QrCode className="w-20 h-20 text-purple-600" />
                    </div>
                    <span className="text-[11px] text-zinc-300 font-medium">
                      {selectedStation.name} • {selectedTimeSlot}
                    </span>
                    <span className="text-[10px] text-emerald-400">
                      Amount Paid: {formatINR(calculateTotal())}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedStation(null)}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-display font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </CustomerShell>
  );
};