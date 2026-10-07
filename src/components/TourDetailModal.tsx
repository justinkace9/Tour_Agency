import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  Activity, 
  MapPin, 
  Check, 
  AlertCircle, 
  Calendar, 
  Users, 
  Heart, 
  MessageCircle, 
  ShieldCheck,
  Star,
  Utensils,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CustomDropdown, DropdownOption } from './common/CustomDropdown';

const GUEST_OPTIONS_MODAL: DropdownOption[] = [
  { value: '1', label: '1 Explorer', sublabel: 'Solo expedition' },
  { value: '2', label: '2 Explorers', sublabel: 'Couple / pair' },
  { value: '3', label: '3 Explorers', sublabel: 'Small party' },
  { value: '4', label: '4 Explorers', sublabel: 'Family / group' },
  { value: '5', label: '5 Explorers', sublabel: 'Group' },
  { value: '6', label: '6 Explorers', sublabel: 'Group' },
  { value: '7', label: '7 Explorers', sublabel: 'Group' },
  { value: '8', label: '8 Explorers', sublabel: 'Max guide ratio' },
  { value: '10', label: '10+ Explorers', sublabel: 'Private charter' }
];

const DIETARY_OPTIONS = [
  'Traditional Belizean Rice & Beans',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Nut Allergy'
];

export const TourDetailModal: React.FC = () => {
  const { 
    selectedTour, 
    setSelectedTour, 
    favorites, 
    toggleFavorite, 
    addToItinerary,
    setIsItineraryOpen,
    currency,
    searchPreferences
  } = useApp();

  const [date, setDate] = useState(() => searchPreferences?.date || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);
  const [guests, setGuests] = useState(() => searchPreferences?.guests || 2);
  const [pickup, setPickup] = useState('San Ignacio Town Hotel');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([
    'Traditional Belizean Rice & Beans'
  ]);
  const [packedLunchNotes, setPackedLunchNotes] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isBookedSuccess, setIsBookedSuccess] = useState(false);

  // Sync with searchPreferences whenever a tour is opened
  React.useEffect(() => {
    if (selectedTour && searchPreferences) {
      setDate(searchPreferences.date);
      setGuests(searchPreferences.guests);
    }
  }, [selectedTour, searchPreferences]);

  if (!selectedTour) return null;

  const isFavorited = favorites.includes(selectedTour.id);
  const totalUsd = selectedTour.priceUsd * guests;
  const totalBzd = totalUsd * 2;

  const handleDietaryToggle = (item: string) => {
    setSelectedDietary(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleAddToItinerary = () => {
    addToItinerary(
      selectedTour, 
      date, 
      guests, 
      pickup, 
      specialRequests,
      selectedDietary,
      packedLunchNotes
    );
    setIsBookedSuccess(true);
    setTimeout(() => {
      setIsBookedSuccess(false);
      setSelectedTour(null);
      setIsItineraryOpen(true);
    }, 900);
  };

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      `Hello Cayo Eco-Tours! I am booking the "${selectedTour.title}" for ${guests} guest(s) on ${date}.\nDietary preferences: ${selectedDietary.join(', ')}.\nPacked lunch note: ${packedLunchNotes || 'Standard'}.\nPickup at: ${pickup}.`
    );
    window.open(`https://wa.me/5016108687?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-modal rounded-3xl overflow-hidden shadow-2xl my-8 border border-white/20 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Full-bleed close button */}
        <button
          onClick={() => setSelectedTour(null)}
          aria-label="Close tour details"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 text-white hover:bg-black/95 flex items-center justify-center transition-colors border border-white/25 shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Full-bleed Image Header */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={selectedTour.image}
            alt={selectedTour.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/50 to-black/30" />

          {/* Badge */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3.5 py-1 rounded-full bg-[#0F382C]/90 border border-[#E0A96D]/50 text-[#E0A96D] text-xs font-bold uppercase tracking-wider shadow-md">
              {selectedTour.badge}
            </span>
          </div>

          {/* Header Title & Location Info */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div className="max-w-xl">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-1.5">
                <span className="flex items-center gap-1 font-semibold text-emerald-400">
                  <MapPin className="w-3.5 h-3.5 text-[#E0A96D]" />
                  <span>San Ignacio, Cayo District</span>
                </span>
                <span>·</span>
                <span className="truncate">{selectedTour.location}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#E0A96D] fill-[#E0A96D]" />
                  {selectedTour.rating} ({selectedTour.reviewsCount} reviews)
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {selectedTour.title}
              </h2>
            </div>

            <button
              onClick={() => toggleFavorite(selectedTour.id)}
              className="p-3 rounded-full bg-black/70 border border-white/25 text-white hover:text-[#E0A96D] transition-colors shrink-0 ml-2"
              aria-label="Toggle favorite"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#E0A96D] text-[#E0A96D]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content - Custom luxury scrollbar */}
        <div className="p-6 sm:p-8 max-h-[62vh] overflow-y-auto space-y-6 text-slate-200 itinerary-scroll-container">
          
          {/* Lead Operator Accreditation Banner */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0F382C]/60 border border-[#E0A96D]/40">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#E0A96D] shrink-0">
                <img 
                  src="/src/assets/images/guide_gissell_rodriguez_1791165132468.jpg" 
                  alt="Miss Gissell Rodriguez"
                  className="w-full h-full object-cover" 
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-black" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">Lead Operator: Miss Gissell Rodriguez</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/50 text-[#E0A96D] border border-white/10 font-semibold">
                    BTB Licensed
                  </span>
                </div>
                <span className="text-[11px] text-slate-300 block">
                  Cayo Native Specialist · Strict 8:1 Guest-to-Guide Ratio
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const text = encodeURIComponent(
                  `Hello Miss Gissell! I am inquiring about booking a private excursion for "${selectedTour.title}".`
                );
                window.open(`https://wa.me/5016108687?text=${text}`, '_blank');
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-300 border border-[#25D366]/40 text-xs font-semibold transition-colors"
            >
              <span>Ask Gissell</span>
            </button>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Duration</span>
              <span className="text-xs sm:text-sm font-semibold text-white flex items-center justify-center gap-1 mt-1">
                <Clock className="w-3.5 h-3.5 text-[#E0A96D]" />
                {selectedTour.duration}
              </span>
            </div>

            <div className="bg-white/5 rounded-2xl p-3 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Physical Rating</span>
              <span className="text-xs sm:text-sm font-semibold text-white flex items-center justify-center gap-1 mt-1">
                <Activity className="w-3.5 h-3.5 text-[#E0A96D]" />
                {selectedTour.physicalRating}
              </span>
            </div>

            <div className="bg-white/5 rounded-2xl p-3 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Min Age</span>
              <span className="text-xs sm:text-sm font-semibold text-white mt-1 block">
                {selectedTour.minAge}+ Years
              </span>
            </div>

            <div className="bg-white/5 rounded-2xl p-3 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Daily Departure</span>
              <span className="text-xs sm:text-sm font-semibold text-white mt-1 block">
                {selectedTour.departureTime}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2">
              Expedition Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {selectedTour.fullDescription}
            </p>
          </div>

          {/* Inclusions & What to Bring */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Inclusions */}
            <div className="bg-[#0F382C]/30 rounded-2xl p-4 border border-[#0F382C]">
              <h4 className="font-display text-xs sm:text-sm font-bold text-[#E0A96D] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E0A96D]" />
                Included Items (Guaranteed)
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedTour.included.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gear Guide */}
            <div className="bg-black/30 rounded-2xl p-4 border border-white/10">
              <h4 className="font-display text-xs sm:text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#E0A96D]" />
                What to Bring & Wear
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedTour.whatToBring.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E0A96D] shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Date, Guest Count & Dietary Preferences */}
          <div className="glass-card rounded-2xl p-5 border border-white/15 space-y-4">
            <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
              <Utensils className="w-4 h-4 text-[#E0A96D]" />
              <span>Configure Expedition & Dietary Preferences</span>
            </h4>

            {/* Date, Guests, Pickup */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">
                  Expedition Date
                </label>
                <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white">
                  <Calendar className="w-3.5 h-3.5 text-[#E0A96D]" />
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent text-xs text-white focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <CustomDropdown
                  label="Guest Count"
                  value={String(guests)}
                  options={GUEST_OPTIONS_MODAL}
                  onChange={(val) => setGuests(Number(val))}
                  icon={<Users className="w-3.5 h-3.5 text-[#E0A96D]" />}
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">
                  San Ignacio Hotel Pickup
                </label>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Hotel / Lodge name"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>
            </div>

            {/* Dietary Preferences Checkboxes */}
            <div className="pt-2">
              <label className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">
                Belizean Jungle Lunch - Dietary Requirements
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DIETARY_OPTIONS.map(opt => {
                  const isChecked = selectedDietary.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleDietaryToggle(opt)}
                      className={`px-3 py-2 rounded-xl text-left text-xs font-medium border transition-all flex items-center gap-2 ${
                        isChecked 
                          ? 'bg-[#0F382C] border-[#E0A96D] text-white shadow-sm' 
                          : 'bg-black/30 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ${
                        isChecked ? 'bg-[#E0A96D] border-[#E0A96D] text-slate-950 font-bold' : 'border-slate-500'
                      }`}>
                        {isChecked && '✓'}
                      </span>
                      <span className="truncate">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Packed Lunch Special Requests */}
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">
                Packed Lunch Requests / Allergies
              </label>
              <input
                type="text"
                value={packedLunchNotes}
                onChange={(e) => setPackedLunchNotes(e.target.value)}
                placeholder="e.g. Extra fried plantains, habanero sauce on the side, severe peanut allergy"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
              />
            </div>

            {/* Pricing Summary & Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold text-white tabular-nums">
                    ${currency === 'BZD' ? totalBzd : totalUsd} {currency}
                  </span>
                  <span className="text-xs text-slate-400">
                    (${selectedTour.priceUsd} x {guests} {guests === 1 ? 'guest' : 'guests'})
                  </span>
                </div>
                <span className="text-[11px] text-[#E0A96D] font-medium block">
                  {currency === 'USD' ? `≈ $${totalBzd} BZD` : `≈ $${totalUsd} USD`} (All permits & lunch included)
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#25D366]/20 border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddToItinerary}
                  className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg ${
                    isBookedSuccess 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gradient-to-r from-[#0F382C] via-[#164E3E] to-[#0F382C] text-white hover:scale-[1.02] border border-[#E0A96D]/50'
                  }`}
                >
                  <Plus className="w-4 h-4 text-[#E0A96D]" />
                  <span>{isBookedSuccess ? 'Added to Itinerary!' : 'Add to Custom Itinerary'}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
