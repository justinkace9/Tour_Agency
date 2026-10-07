import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Calendar, 
  Users, 
  Plus, 
  ShieldCheck, 
  ArrowRight, 
  Utensils, 
  Sparkles, 
  DollarSign, 
  UserPlus, 
  UserCheck, 
  ChevronRight,
  MapPin,
  Camera,
  Droplet,
  Truck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CompanionMember } from '../types/tour';

const DIETARY_TAGS = [
  'Belizean Rice & Beans',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Nut Allergy'
];

export const ItineraryDrawer: React.FC = () => {
  const {
    isItineraryOpen,
    setIsItineraryOpen,
    itinerary,
    removeFromItinerary,
    clearItinerary,
    companions,
    addCompanion,
    removeCompanion,
    addOns,
    toggleAddOn,
    currency,
    setCurrency,
    setIsCheckoutOpen,
    createBookingFromCart,
    currentUser
  } = useApp();

  // Companion form state
  const [showAddCompanion, setShowAddCompanion] = useState(false);
  const [newCompName, setNewCompName] = useState('');
  const [newCompAge, setNewCompAge] = useState<'Adult' | 'Child'>('Adult');
  const [newCompDietary, setNewCompDietary] = useState<string[]>(['Belizean Rice & Beans']);
  const [newCompNotes, setNewCompNotes] = useState('');
  const [pickupHotel, setPickupHotel] = useState('San Ignacio Town Hotel');

  // Prevent background page dual-scroll bar while Itinerary Drawer is active
  React.useEffect(() => {
    if (isItineraryOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isItineraryOpen]);

  if (!isItineraryOpen) return null;

  // Real-time pricing calculations
  const toursTotalUsd = itinerary.reduce((acc, item) => acc + item.priceUsd * item.guestsCount, 0);
  const addOnsTotalUsd = addOns.filter(a => a.selected).reduce((acc, a) => acc + a.priceUsd, 0);
  const subtotalUsd = toursTotalUsd + addOnsTotalUsd;
  const taxesUsd = Math.round(subtotalUsd * 0.09 * 100) / 100; // 9% General Sales Tax
  const grandTotalUsd = Math.round((subtotalUsd + taxesUsd) * 100) / 100;

  // Belize Dollars (fixed 2:1 pegged rate)
  const grandTotalBzd = grandTotalUsd * 2;
  const subtotalBzd = subtotalUsd * 2;
  const taxesBzd = taxesUsd * 2;

  const handleCreateCompanion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName.trim()) return;
    addCompanion({
      fullName: newCompName.trim(),
      ageGroup: newCompAge,
      dietaryRestrictions: newCompDietary,
      notes: newCompNotes.trim()
    });
    setNewCompName('');
    setNewCompNotes('');
    setNewCompDietary(['Belizean Rice & Beans']);
    setShowAddCompanion(false);
  };

  const handleDietarySelect = (tag: string) => {
    setNewCompDietary(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleProceedToCheckout = () => {
    createBookingFromCart(
      {
        fullName: currentUser?.displayName || companions[0]?.fullName || 'Lead Traveler',
        email: currentUser?.email || 'traveler@cayoecotours.com',
        phone: '+501 610-8687'
      },
      pickupHotel
    );
    setIsItineraryOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#0D1117] h-full border-l border-white/15 p-5 sm:p-7 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E0A96D]" />
              <h2 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                Trip Builder & Itinerary
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">
              {itinerary.length} {itinerary.length === 1 ? 'Expedition' : 'Expeditions'} Selected · San Ignacio, Cayo
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Currency Toggle (BZD / USD) */}
            <div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/10 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded-lg transition-colors ${
                  currency === 'USD' ? 'bg-[#0F382C] text-[#E0A96D]' : 'text-slate-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('BZD')}
                className={`px-2 py-0.5 rounded-lg transition-colors ${
                  currency === 'BZD' ? 'bg-[#0F382C] text-[#E0A96D]' : 'text-slate-400 hover:text-white'
                }`}
              >
                BZD ($2:1)
              </button>
            </div>

            <button
              onClick={() => setIsItineraryOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close trip builder"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body - Refined custom luxury scrollbar, no ugly OS scrollbar */}
        <div 
          className="flex-1 overflow-y-auto py-5 space-y-6 pr-1.5 itinerary-scroll-container"
        >
          
          {/* Section 1: Selected Tours */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-xs uppercase tracking-wider font-bold text-[#E0A96D] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Selected Cayo Expeditions ({itinerary.length})</span>
              </h3>
              {itinerary.length > 0 && (
                <button
                  onClick={clearItinerary}
                  className="text-[10px] text-rose-400 hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {itinerary.length === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-black/40 border border-white/10 text-slate-400 text-xs">
                No tours added to your draft itinerary yet. Browse tours and click "Add to Custom Itinerary".
              </div>
            ) : (
              <div className="space-y-3">
                {itinerary.map((item, idx) => (
                  <div
                    key={item.id}
                    className="glass-card rounded-2xl p-4 border border-white/10 hover:border-[#E0A96D]/40 transition-all flex flex-col justify-between gap-3 relative group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-md bg-[#0F382C] text-[#E0A96D] text-[10px] font-bold">
                            Day {idx + 1}
                          </span>
                          <span className="text-xs font-semibold text-[#E0A96D] flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.selectedDate}
                          </span>
                        </div>
                        <h4 className="font-display text-sm font-bold text-white leading-snug">
                          {item.tourTitle}
                        </h4>
                      </div>

                      <button
                        onClick={() => removeFromItinerary(item.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded-lg transition-colors"
                        aria-label="Remove tour"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-300 space-y-1 bg-black/30 p-2.5 rounded-xl border border-white/5">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Party Size:</span>
                        <span className="font-medium text-white">{item.guestsCount} Explorers</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Rate per Person:</span>
                        <span className="font-medium text-white">
                          ${currency === 'BZD' ? item.priceUsd * 2 : item.priceUsd} {currency}
                        </span>
                      </div>
                      {item.dietaryPreferences && item.dietaryPreferences.length > 0 && (
                        <div className="pt-1 border-t border-white/5 flex items-start gap-1">
                          <Utensils className="w-3 h-3 text-[#E0A96D] shrink-0 mt-0.5" />
                          <span className="text-slate-300 truncate">
                            Diet: {item.dietaryPreferences.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-white/5">
                      <span className="text-[11px] text-slate-400">Experience Total:</span>
                      <span className="font-display font-bold text-sm text-white tabular-nums">
                        ${currency === 'BZD' ? item.priceUsd * item.guestsCount * 2 : item.priceUsd * item.guestsCount} {currency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Companion / Group Member Manager */}
          <div className="glass-panel rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-xs uppercase tracking-wider font-bold text-[#E0A96D] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Travel Companions & Group ({companions.length})</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddCompanion(!showAddCompanion)}
                className="text-xs text-[#E0A96D] font-bold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Companion</span>
              </button>
            </div>

            {/* Companions List */}
            <div className="space-y-2 mb-3">
              {companions.map(comp => (
                <div
                  key={comp.id}
                  className="bg-black/40 rounded-xl p-2.5 border border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#0F382C] border border-[#E0A96D]/40 text-[#E0A96D] flex items-center justify-center font-bold text-[11px]">
                      {comp.fullName[0]?.toUpperCase() || 'C'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{comp.fullName}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-white/10 text-slate-300">
                          {comp.ageGroup}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        {comp.dietaryRestrictions.join(', ') || 'No restrictions'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeCompanion(comp.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                    aria-label="Remove companion"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Inline Add Companion Form */}
            {showAddCompanion && (
              <form onSubmit={handleCreateCompanion} className="p-3 rounded-xl bg-black/60 border border-[#E0A96D]/30 space-y-3 animate-in fade-in">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Companion Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Miller"
                    value={newCompName}
                    onChange={(e) => setNewCompName(e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Age Category
                    </label>
                    <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/15">
                      <button
                        type="button"
                        onClick={() => setNewCompAge('Adult')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                          newCompAge === 'Adult'
                            ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm font-bold border border-[#E0A96D]/40'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Adult (12+)
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewCompAge('Child')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                          newCompAge === 'Child'
                            ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm font-bold border border-[#E0A96D]/40'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Child (Under 12)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Special Notes
                    </label>
                    <input
                      type="text"
                      placeholder="Shoe size, swimming level"
                      value={newCompNotes}
                      onChange={(e) => setNewCompNotes(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Dietary Restrictions
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {DIETARY_TAGS.map(tag => {
                      const sel = newCompDietary.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleDietarySelect(tag)}
                          className={`px-2 py-1 rounded text-[10px] font-medium border transition-colors ${
                            sel ? 'bg-[#0F382C] border-[#E0A96D] text-white' : 'bg-black/30 border-white/10 text-slate-400'
                          }`}
                        >
                          {sel ? '✓ ' : ''}{tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddCompanion(false)}
                    className="px-3 py-1 rounded-lg border border-white/10 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1 rounded-lg bg-[#0F382C] border border-[#E0A96D]/50 text-white text-xs font-bold hover:scale-[1.02]"
                  >
                    Save Member
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Section 3: Add-on Selection */}
          <div className="glass-panel rounded-2xl p-4 border border-white/10 space-y-3">
            <h3 className="font-display text-xs uppercase tracking-wider font-bold text-[#E0A96D] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended Expedition Add-ons</span>
            </h3>

            <div className="space-y-2">
              {addOns.map(addon => {
                const icon = 
                  addon.id.includes('shuttle') ? <Truck className="w-4 h-4 text-[#E0A96D]" /> :
                  addon.id.includes('gopro') ? <Camera className="w-4 h-4 text-cyan-400" /> :
                  <Droplet className="w-4 h-4 text-emerald-400" />;

                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      addon.selected
                        ? 'bg-[#0F382C]/50 border-[#E0A96D] shadow-sm'
                        : 'bg-black/30 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-black/40 border border-white/10 shrink-0 mt-0.5">
                        {icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-white">{addon.name}</h4>
                          {addon.selected && (
                            <span className="text-[9px] uppercase font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                              Added
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1 leading-relaxed mt-0.5">
                          {addon.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-bold text-xs text-white block tabular-nums">
                        +${currency === 'BZD' ? addon.priceUsd * 2 : addon.priceUsd} {currency}
                      </span>
                      <button
                        type="button"
                        className={`text-[10px] font-bold ${addon.selected ? 'text-rose-400' : 'text-[#E0A96D]'}`}
                      >
                        {addon.selected ? 'Remove' : '+ Add'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hotel Pickup Location Input */}
          <div className="bg-black/30 p-3 rounded-2xl border border-white/10">
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#E0A96D]" />
              <span>Primary San Ignacio Accommodation (For Pickup Manifest)</span>
            </label>
            <input
              type="text"
              value={pickupHotel}
              onChange={(e) => setPickupHotel(e.target.value)}
              placeholder="e.g. San Ignacio Resort Hotel, Ka’ana, or Cahal Pech Village"
              className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
            />
          </div>

        </div>

        {/* Bottom Checkout & Grand Total Section */}
        <div className="pt-4 border-t border-white/15 space-y-3 shrink-0">
          
          {/* Subtotal, Tax and Grand Total Breakdown */}
          <div className="space-y-1 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Expeditions Subtotal:</span>
              <span className="tabular-nums font-medium text-white">
                ${currency === 'BZD' ? toursTotalUsd * 2 : toursTotalUsd} {currency}
              </span>
            </div>

            {addOnsTotalUsd > 0 && (
              <div className="flex justify-between">
                <span>Selected Add-ons:</span>
                <span className="tabular-nums font-medium text-[#E0A96D]">
                  +${currency === 'BZD' ? addOnsTotalUsd * 2 : addOnsTotalUsd} {currency}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Belize Tourism Tax & Park Permits (9%):</span>
              <span className="tabular-nums text-slate-400">
                ${currency === 'BZD' ? taxesBzd : taxesUsd} {currency}
              </span>
            </div>

            <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
              <div>
                <span className="font-bold text-white text-sm">Grand Total:</span>
                <span className="text-[10px] text-[#E0A96D] block">
                  {currency === 'USD' ? `Pegged at $${grandTotalBzd} BZD` : `Equates to $${grandTotalUsd} USD`}
                </span>
              </div>
              <div className="text-right">
                <span className="font-display text-2xl font-extrabold text-white tabular-nums">
                  ${currency === 'BZD' ? grandTotalBzd : grandTotalUsd} {currency}
                </span>
              </div>
            </div>
          </div>

          {/* Action: Proceed to Atlantic Bank Manual Payment Flow */}
          <button
            onClick={handleProceedToCheckout}
            disabled={itinerary.length === 0}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#0F382C] via-[#164E3E] to-[#0F382C] hover:from-[#134839] hover:to-[#1a5b48] border border-[#E0A96D]/50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.01]"
          >
            <span>Proceed to Atlantic Bank Wire / Verification</span>
            <ChevronRight className="w-4 h-4 text-[#E0A96D]" />
          </button>

        </div>

      </div>
    </div>
  );
};
