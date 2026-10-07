import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Utensils, 
  DollarSign, 
  Calendar, 
  Edit3, 
  Check, 
  MessageCircle, 
  ShieldCheck 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CustomerProfile } from '../../types/tour';

export const CustomerProfiles: React.FC = () => {
  const { customers, updateCustomerNotes } = useApp();

  const [search, setSearch] = useState('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  const filteredCustomers = customers.filter(c => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return c.fullName.toLowerCase().includes(q) ||
           c.email.toLowerCase().includes(q) ||
           c.phone.toLowerCase().includes(q) ||
           c.pickupHotel.toLowerCase().includes(q);
  });

  const handleStartEditNotes = (c: CustomerProfile) => {
    setEditingNotesId(c.id);
    setTempNotes(c.notes);
  };

  const handleSaveNotes = (id: string) => {
    updateCustomerNotes(id, tempNotes);
    setEditingNotesId(null);
  };

  const openWhatsApp = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(`Hello ${name}! This is the Cayo Eco-Tours dispatch desk in San Ignacio.`);
    window.open(`https://wa.me/${cleanPhone || '5016108687'}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer name, email, or lodge..."
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
          />
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <Users className="w-4 h-4 text-[#E0A96D]" />
          <span>{customers.length} Verified Explorer Profiles in CRM</span>
        </div>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCustomers.map(customer => (
          <div
            key={customer.id}
            className="glass-card rounded-2xl p-5 border border-white/10 hover:border-[#E0A96D]/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#0F382C] border border-[#E0A96D]/40 text-[#E0A96D] flex items-center justify-center font-bold text-sm shrink-0">
                    {customer.fullName[0]?.toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">{customer.fullName}</h4>
                    <span className="text-[11px] text-slate-400 block">{customer.email}</span>
                  </div>
                </div>

                <button
                  onClick={() => openWhatsApp(customer.phone, customer.fullName)}
                  className="p-2 rounded-xl bg-[#25D366]/20 border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/30 text-xs flex items-center gap-1.5 transition-colors"
                  title="Direct WhatsApp Message"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline font-bold">WhatsApp</span>
                </button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 my-3 text-center text-xs">
                <div className="bg-black/30 p-2 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Bookings</span>
                  <span className="font-bold text-white text-xs tabular-nums">{customer.totalBookings} Tours</span>
                </div>
                <div className="bg-black/30 p-2 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Lifetime Value</span>
                  <span className="font-mono font-bold text-[#E0A96D] text-xs tabular-nums">${customer.totalSpentBzd} BZD</span>
                </div>
                <div className="bg-black/30 p-2 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Joined</span>
                  <span className="font-mono text-slate-300 text-[10px]">{customer.joinedAt}</span>
                </div>
              </div>

              {/* Info Details */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
                  <span>Preferred Lodge: <strong className="text-white">{customer.pickupHotel}</strong></span>
                </div>

                <div className="flex items-start gap-2">
                  <Utensils className="w-3.5 h-3.5 text-[#E0A96D] shrink-0 mt-0.5" />
                  <span>Dietary Requirements: <strong className="text-white">{customer.dietaryRestrictions.join(', ') || 'None'}</strong></span>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#E0A96D] shrink-0 mt-0.5" />
                  <span className="truncate">Past Tours: {customer.pastTours.join(' · ')}</span>
                </div>
              </div>
            </div>

            {/* Editable Staff Notes */}
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-[#E0A96D]">Internal Staff / Guide Notes</span>
                {editingNotesId !== customer.id && (
                  <button
                    onClick={() => handleStartEditNotes(customer)}
                    className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {editingNotesId === customer.id ? (
                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={tempNotes}
                    onChange={(e) => setTempNotes(e.target.value)}
                    className="w-full bg-black/50 border border-[#E0A96D] rounded-xl p-2 text-xs text-white focus:outline-none resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingNotesId(null)}
                      className="px-2.5 py-1 rounded-lg border border-white/10 text-[10px] text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveNotes(customer.id)}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      <span>Save Note</span>
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic bg-black/30 p-2.5 rounded-xl border border-white/5">
                  "{customer.notes || 'No staff notes on file.'}"
                </p>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
