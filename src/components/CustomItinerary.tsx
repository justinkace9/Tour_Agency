import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Trash2, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Plus,
  Building2,
  Sparkles,
  Utensils,
  ChevronRight,
  Camera,
  Truck,
  Droplet
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CustomItinerary: React.FC = () => {
  const { 
    itinerary, 
    removeFromItinerary, 
    clearItinerary, 
    setActiveView, 
    tours, 
    createBookingInquiry,
    companions,
    addCompanion,
    removeCompanion,
    addOns,
    toggleAddOn,
    currency,
    setCurrency,
    createBookingFromCart,
    setIsCheckoutOpen,
    setIsItineraryOpen
  } = useApp();

  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [pickupHotel, setPickupHotel] = useState('San Ignacio Town Hotel');
  const [submitted, setSubmitted] = useState(false);

  // Calculations
  const toursTotalUsd = itinerary.reduce((acc, item) => acc + item.priceUsd * item.guestsCount, 0);
  const addOnsTotalUsd = addOns.filter(a => a.selected).reduce((acc, a) => acc + a.priceUsd, 0);
  const subtotalUsd = toursTotalUsd + addOnsTotalUsd;
  const taxesUsd = Math.round(subtotalUsd * 0.09 * 100) / 100;
  const grandTotalUsd = Math.round((subtotalUsd + taxesUsd) * 100) / 100;

  const grandTotalBzd = grandTotalUsd * 2;
  const subtotalBzd = subtotalUsd * 2;
  const taxesBzd = taxesUsd * 2;

  const handleProceedToAtlanticBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (itinerary.length === 0) return;

    createBookingFromCart(
      {
        fullName: leadName || 'Lead Explorer',
        email: leadEmail || 'guest@cayoecotours.com',
        phone: leadPhone || '+501 610-8687'
      },
      pickupHotel
    );

    setIsCheckoutOpen(true);
  };

  const handleWhatsAppExport = () => {
    let message = `Hello Cayo Eco-Tours! I am booking the following Cayo itinerary:\n\n`;
    itinerary.forEach((item, idx) => {
      message += `${idx + 1}. ${item.tourTitle}\n   - Date: ${item.selectedDate}\n   - Guests: ${item.guestsCount}\n   - Dietary: ${item.dietaryPreferences?.join(', ') || 'Standard'}\n   - Subtotal: $${item.priceUsd * item.guestsCount} USD\n\n`;
    });
    message += `Add-ons: ${addOns.filter(a => a.selected).map(a => a.name).join(', ') || 'None'}\n`;
    message += `Total: $${grandTotalUsd} USD / $${grandTotalBzd} BZD.\nLead Guest: ${leadName || 'Inquirer'} (${leadPhone || 'via WhatsApp'}).\nPickup: ${pickupHotel}.\nPlease confirm guide availability!`;

    window.open(`https://wa.me/5016108687?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E0A96D] font-bold mb-2">
            <span>Interactive Trip & Itinerary Builder</span>
            <span aria-hidden="true">·</span>
            <span>San Ignacio, Cayo District</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Your Custom Itinerary
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Currency Toggle */}
          <div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/10 text-xs font-bold">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                currency === 'USD' ? 'bg-[#0F382C] text-[#E0A96D]' : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('BZD')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                currency === 'BZD' ? 'bg-[#0F382C] text-[#E0A96D]' : 'text-slate-400 hover:text-white'
              }`}
            >
              BZD (Fixed $2:1)
            </button>
          </div>

          {itinerary.length > 0 && (
            <button
              onClick={clearItinerary}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-rose-900/40 hover:bg-rose-950/30 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {itinerary.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center border border-white/10 max-w-xl mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-[#0F382C] border border-[#E0A96D]/40 flex items-center justify-center mx-auto mb-4 text-[#E0A96D]">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="font-display text-xl font-bold text-white mb-2">
            Your Itinerary is Empty
          </h3>
          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            Browse our licensed Cayo eco-tours (ATM Cave, Xunantunich, Caracol, Barton Creek) to build your personalized adventure schedule.
          </p>
          <button
            onClick={() => setActiveView('tours')}
            className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#0F382C] via-[#164E3E] to-[#0F382C] text-white font-semibold text-sm border border-[#E0A96D]/40 hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <span>Explore Tours</span>
            <ArrowRight className="w-4 h-4 text-[#E0A96D]" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Tours + Companions + Add-ons */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Selected Tours */}
            <div className="space-y-4">
              {itinerary.map((item, index) => (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl p-5 border border-white/10 hover:border-[#E0A96D]/40 transition-all flex flex-col sm:flex-row justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-full bg-[#0F382C] text-[#E0A96D] text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg text-white">
                        {item.tourTitle}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 mt-3 pt-3 border-t border-white/10">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#E0A96D]" />
                        <span>{item.selectedDate}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#E0A96D]" />
                        <span>{item.guestsCount} Explorers</span>
                      </div>

                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#E0A96D]" />
                        <span className="truncate">{item.pickupLocation}</span>
                      </div>
                    </div>

                    {item.dietaryPreferences && item.dietaryPreferences.length > 0 && (
                      <div className="mt-2 text-xs text-slate-300 flex items-center gap-1.5 bg-black/30 p-2 rounded-xl border border-white/5">
                        <Utensils className="w-3.5 h-3.5 text-[#E0A96D]" />
                        <span>Dietary: {item.dietaryPreferences.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Subtotal & Delete */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-5 gap-2">
                    <div className="text-right">
                      <span className="font-display text-lg font-bold text-white tabular-nums">
                        ${currency === 'BZD' ? item.priceUsd * item.guestsCount * 2 : item.priceUsd * item.guestsCount} {currency}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        (${item.priceUsd} x {item.guestsCount})
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromItinerary(item.id)}
                      aria-label="Remove tour"
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setActiveView('tours')}
                className="w-full py-3 rounded-2xl border border-dashed border-[#E0A96D]/40 text-[#E0A96D] hover:bg-[#E0A96D]/10 text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Cayo Adventure</span>
              </button>
            </div>

            {/* Companions Manager Card */}
            <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#E0A96D]" />
                    <span>Travel Companions & Group ({companions.length})</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Assign names, age tiers, and dietary restrictions for lunch catering.
                  </p>
                </div>
                <button
                  onClick={() => setIsItineraryOpen(true)}
                  className="text-xs text-[#E0A96D] hover:underline font-bold"
                >
                  Manage Roster →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {companions.map(comp => (
                  <div key={comp.id} className="p-3 rounded-xl bg-black/40 border border-white/5 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white block">{comp.fullName}</span>
                      <span className="text-[10px] text-slate-400">
                        {comp.ageGroup} · {comp.dietaryRestrictions.join(', ') || 'No restrictions'}
                      </span>
                    </div>
                    <button
                      onClick={() => removeCompanion(comp.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons Selector */}
            <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
              <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E0A96D]" />
                <span>Expedition Upgrades & Equipment Rentals</span>
              </h3>

              <div className="space-y-2.5">
                {addOns.map(addon => (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      addon.selected
                        ? 'bg-[#0F382C]/50 border-[#E0A96D]'
                        : 'bg-black/30 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-black/40 border border-white/10 shrink-0 mt-0.5">
                        {addon.id.includes('shuttle') ? <Truck className="w-4 h-4 text-[#E0A96D]" /> :
                         addon.id.includes('gopro') ? <Camera className="w-4 h-4 text-cyan-400" /> :
                         <Droplet className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-white">{addon.name}</h4>
                          {addon.selected && (
                            <span className="text-[9px] uppercase font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{addon.description}</p>
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
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Pricing Breakdown & Checkout Action */}
          <div className="glass-panel rounded-3xl p-6 border border-white/15 h-fit shadow-xl space-y-5">
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#E0A96D]" />
              <span>Itinerary Investment</span>
            </h3>

            <div className="space-y-2.5 text-xs text-slate-300 pb-4 border-b border-white/10">
              <div className="flex justify-between">
                <span>Expeditions Total:</span>
                <span className="tabular-nums font-bold text-white">
                  ${currency === 'BZD' ? toursTotalUsd * 2 : toursTotalUsd} {currency}
                </span>
              </div>
              {addOnsTotalUsd > 0 && (
                <div className="flex justify-between">
                  <span>Selected Add-ons:</span>
                  <span className="tabular-nums font-bold text-[#E0A96D]">
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
              <div className="flex justify-between text-emerald-400">
                <span>San Ignacio Town Shuttle:</span>
                <span className="font-semibold">Included FREE</span>
              </div>
            </div>

            <div className="py-2 border-b border-white/10">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-slate-200">Grand Total:</span>
                <span className="font-display text-2xl font-extrabold text-white tabular-nums">
                  ${currency === 'BZD' ? grandTotalBzd : grandTotalUsd} {currency}
                </span>
              </div>
              <div className="text-right text-xs text-[#E0A96D] mt-0.5">
                {currency === 'USD' ? `≈ $${grandTotalBzd} BZD` : `≈ $${grandTotalUsd} USD`} (Pegged 2:1)
              </div>
            </div>

            {/* Direct Checkout Form */}
            <form onSubmit={handleProceedToAtlanticBank} className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase font-semibold text-slate-300 mb-1">
                  Lead Explorer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-semibold text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-semibold text-slate-300 mb-1">
                  WhatsApp / Phone
                </label>
                <input
                  type="tel"
                  placeholder="+501 610-8687"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-semibold text-slate-300 mb-1">
                  San Ignacio Accommodation
                </label>
                <input
                  type="text"
                  placeholder="San Ignacio Resort Hotel / Ka’ana"
                  value={pickupHotel}
                  onChange={(e) => setPickupHotel(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0F382C] via-[#164E3E] to-[#0F382C] border border-[#E0A96D]/50 text-white font-bold text-xs hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 shadow-lg"
                >
                  <Building2 className="w-4 h-4 text-[#E0A96D]" />
                  <span>Atlantic Bank Wire Checkout</span>
                  <ChevronRight className="w-4 h-4 text-[#E0A96D]" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppExport}
                  className="w-full py-2.5 rounded-xl bg-[#25D366]/20 border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/30 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Export to WhatsApp Booking</span>
                </button>
              </div>
            </form>

          </div>

        </div>
      )}

    </div>
  );
};
