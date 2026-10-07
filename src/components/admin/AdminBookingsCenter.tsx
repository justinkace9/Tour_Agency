import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Building2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Calendar, 
  Users, 
  FileText, 
  Download,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BookingDetails } from '../../types/tour';
import { PaymentVerificationModal } from './PaymentVerificationModal';

export const AdminBookingsCenter: React.FC = () => {
  const { allBookings } = useApp();

  const [statusFilter, setStatusFilter] = useState<'all' | 'under_review' | 'verified' | 'rejected'>('all');
  const [search, setSearch] = useState('');
  const [selectedBookingForInspect, setSelectedBookingForInspect] = useState<BookingDetails | null>(null);

  const filteredBookings = allBookings.filter(b => {
    const matchesStatus = statusFilter === 'all' || b.paymentStatus === statusFilter;
    const q = search.toLowerCase().trim();
    const matchesSearch = !q || 
      b.bookingReference.toLowerCase().includes(q) ||
      b.leadTraveler.fullName.toLowerCase().includes(q) ||
      b.leadTraveler.email.toLowerCase().includes(q) ||
      b.tours.some(t => t.tourTitle.toLowerCase().includes(q));

    return matchesStatus && matchesSearch;
  });

  const pendingCount = allBookings.filter(b => b.paymentStatus === 'under_review').length;
  const verifiedCount = allBookings.filter(b => b.paymentStatus === 'verified').length;
  const rejectedCount = allBookings.filter(b => b.paymentStatus === 'rejected').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Controls: Filter Pills & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              statusFilter === 'all'
                ? 'bg-[#E0A96D] text-slate-950 shadow-md font-bold'
                : 'bg-black/40 text-slate-300 hover:text-white border border-white/10'
            }`}
          >
            All Bookings ({allBookings.length})
          </button>

          <button
            onClick={() => setStatusFilter('under_review')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              statusFilter === 'under_review'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-black/40 text-amber-400 hover:text-amber-300 border border-amber-900/40'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Review ({pendingCount})</span>
          </button>

          <button
            onClick={() => setStatusFilter('verified')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              statusFilter === 'verified'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-black/40 text-emerald-400 hover:text-emerald-300 border border-emerald-900/40'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approved ({verifiedCount})</span>
          </button>

          <button
            onClick={() => setStatusFilter('rejected')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              statusFilter === 'rejected'
                ? 'bg-rose-600 text-white font-bold'
                : 'bg-black/40 text-rose-400 hover:text-rose-300 border border-rose-900/40'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Rejected ({rejectedCount})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Ref ID, customer, tour..."
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
          />
        </div>

      </div>

      {/* Bookings Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-black/50 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4">Booking Ref</th>
                <th className="p-4">Lead Traveler</th>
                <th className="p-4">Expeditions & Dates</th>
                <th className="p-4">Group Size</th>
                <th className="p-4">Amount Due</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No bookings found matching current filter.
                  </td>
                </tr>
              ) : (
                filteredBookings.map(b => (
                  <tr key={b.bookingReference} className="hover:bg-white/5 transition-colors">
                    
                    {/* Booking Reference */}
                    <td className="p-4 font-mono font-bold text-white">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#E0A96D]">{b.bookingReference}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-normal block">
                        {b.createdAt?.split('T')[0] || 'Today'}
                      </span>
                    </td>

                    {/* Lead Traveler */}
                    <td className="p-4">
                      <span className="font-bold text-white block">{b.leadTraveler.fullName}</span>
                      <span className="text-[10px] text-slate-400 block">{b.leadTraveler.email}</span>
                      <span className="text-[10px] text-emerald-400 block">{b.leadTraveler.phone}</span>
                    </td>

                    {/* Tours & Dates */}
                    <td className="p-4 max-w-xs">
                      {b.tours.map(t => (
                        <div key={t.id} className="truncate">
                          <span className="font-medium text-slate-200">{t.tourTitle}</span>
                          <span className="text-[10px] text-slate-400 block">{t.selectedDate}</span>
                        </div>
                      ))}
                    </td>

                    {/* Group Size */}
                    <td className="p-4 tabular-nums">
                      <div className="flex items-center gap-1 text-slate-200">
                        <Users className="w-3.5 h-3.5 text-[#E0A96D]" />
                        <span>{b.companions.length + 1} Explorers</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        {b.companions.length > 0 ? `+${b.companions.length} companions` : 'Solo traveler'}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="p-4 font-mono">
                      <div className="font-bold text-white tabular-nums">
                        ${b.totalBzd} BZD
                      </div>
                      <span className="text-[10px] text-slate-400 tabular-nums">
                        (${b.totalUsd} USD)
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                        b.paymentStatus === 'verified'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                          : b.paymentStatus === 'rejected'
                          ? 'bg-rose-950 text-rose-400 border border-rose-600'
                          : 'bg-amber-950 text-amber-400 border border-amber-600'
                      }`}>
                        {b.paymentStatus === 'verified' && <CheckCircle2 className="w-3 h-3" />}
                        {b.paymentStatus === 'under_review' && <Clock className="w-3 h-3" />}
                        {b.paymentStatus === 'rejected' && <XCircle className="w-3 h-3" />}
                        <span>{b.paymentStatus.replace('_', ' ')}</span>
                      </span>
                    </td>

                    {/* Action: Inspect Receipt */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedBookingForInspect(b)}
                        className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                          b.paymentStatus === 'under_review'
                            ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md font-extrabold'
                            : 'bg-white/10 hover:bg-white/20 text-slate-200'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{b.paymentStatus === 'under_review' ? 'Review Receipt' : 'Inspect'}</span>
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side-by-side Inspection Modal */}
      {selectedBookingForInspect && (
        <PaymentVerificationModal
          booking={selectedBookingForInspect}
          onClose={() => setSelectedBookingForInspect(null)}
        />
      )}

    </div>
  );
};
