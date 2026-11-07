import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Gamepad2, CheckCircle2 } from 'lucide-react';
import { CheckInRecord } from '../../../types/checkIn';

interface RecentCheckInsTableProps {
  checkIns: CheckInRecord[];
}

export const RecentCheckInsTable: React.FC<RecentCheckInsTableProps> = ({ checkIns }) => {
  return (
    <div className="rounded-3xl bg-[#0e0a1d]/90 border border-purple-500/25 p-4 sm:p-5 lg:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl h-full flex flex-col justify-between">
      <div>
        {/* Card Header: Clock Icon + Title + View All Link */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Clock className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white">
              Recent Check-ins
            </h2>
          </div>

          <Link
            to="/admin/bookings"
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Table Content */}
        <div className="mt-3 overflow-x-auto scrollbar-thin">
          {checkIns.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 space-y-2">
              <CheckCircle2 className="w-8 h-8 mx-auto text-zinc-600" />
              <p className="text-sm font-medium">No check-ins recorded yet.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[520px]">
              <thead>
                <tr className="border-b border-purple-500/15 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">
                  <th className="py-3 px-2 text-center w-8">#</th>
                  <th className="py-3 px-3">Booking ID</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Station</th>
                  <th className="py-3 px-3">Check-in Time</th>
                  <th className="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10 text-xs sm:text-[13px]">
                {checkIns.map((rec) => (
                  <tr
                    key={rec.id + rec.bookingId}
                    className="hover:bg-purple-950/20 transition-colors duration-150 group"
                  >
                    {/* # Serial */}
                    <td className="py-3 px-2 text-center font-mono font-bold text-zinc-400">
                      {rec.serialNumber}
                    </td>

                    {/* Booking ID */}
                    <td className="py-3 px-3 font-mono font-bold text-white tracking-wide">
                      {rec.bookingId}
                    </td>

                    {/* Customer with Initials Badge */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full bg-gradient-to-br ${
                            rec.customerAvatarColor || 'from-purple-600 to-indigo-600'
                          } text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-sm`}
                        >
                          {rec.customerInitials}
                        </div>
                        <span className="font-semibold text-white truncate max-w-[130px]">
                          {rec.customerName}
                        </span>
                      </div>
                    </td>

                    {/* Station */}
                    <td className="py-3 px-3 font-bold text-white tracking-wide">
                      <div className="flex items-center gap-1.5">
                        <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
                        <span>{rec.stationName}</span>
                      </div>
                    </td>

                    {/* Check-in Time */}
                    <td className="py-3 px-3 text-zinc-300 font-mono whitespace-nowrap">
                      {rec.checkInTime}
                    </td>

                    {/* Status: Checked In */}
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                        <span>Checked In</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Footer Counter */}
      <div className="pt-4 mt-4 border-t border-purple-500/10 flex items-center justify-between text-xs text-zinc-400">
        <span>Showing {checkIns.length} verified check-in{checkIns.length === 1 ? '' : 's'}</span>
        <span className="font-mono text-purple-400/90">24/7 Access Point</span>
      </div>
    </div>
  );
};

