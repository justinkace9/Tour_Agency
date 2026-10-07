import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  Compass, 
  Search, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  ChevronDown, 
  Check, 
  Mountain, 
  Waves, 
  Trees, 
  Flame, 
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ExpeditionOption {
  value: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ReactNode;
}

const EXPEDITIONS: ExpeditionOption[] = [
  { value: 'all', title: 'All Eco-Adventures', subtitle: 'Browse complete 10-tour inland portfolio', badge: '10 Tours', icon: <Compass className="w-4 h-4 text-[#E0A96D]" /> },
  { value: 'caves', title: 'Sacred Caves', subtitle: 'ATM Cave & Crystal Cave Challenge', badge: 'Nat Geo #1', icon: <Mountain className="w-4 h-4 text-[#E0A96D]" /> },
  { value: 'ruins', title: 'Maya Temple Ruins', subtitle: 'Caracol, Xunantunich, Cahal Pech, Tikal', badge: 'Archaeology', icon: <Sparkles className="w-4 h-4 text-[#E0A96D]" /> },
  { value: 'waterfalls', title: 'Waterfalls & Pools', subtitle: 'Mountain Pine Ridge & Big Rock Falls', badge: 'Swim & Hike', icon: <Waves className="w-4 h-4 text-[#E0A96D]" /> },
  { value: 'tubing', title: 'Tubing & Canoeing', subtitle: 'Nohoch Che’en & Barton Creek Cave', badge: 'Relaxing', icon: <Waves className="w-4 h-4 text-[#E0A96D]" /> },
  { value: 'extreme', title: 'Extreme Adrenaline', subtitle: '300-Foot Black Hole Drop Abseiling', badge: 'High Thrills', icon: <Flame className="w-4 h-4 text-orange-400" /> },
  { value: 'nature', title: 'Nature & Bird Watching', subtitle: 'Macal River medicinal flora & toucans', badge: 'Eco-Trails', icon: <Trees className="w-4 h-4 text-emerald-400" /> }
];

interface GroupSizeOption {
  value: string;
  title: string;
  subtitle: string;
  badge: string;
}

const GROUP_SIZES: GroupSizeOption[] = [
  { value: '1', title: '1 Explorer (Solo)', subtitle: 'Personalized private guide and pacing', badge: 'Solo' },
  { value: '2', title: '2 Explorers (Couple)', subtitle: 'Most popular pair eco-adventure booking', badge: 'Couple' },
  { value: '3', title: '3 - 4 Explorers', subtitle: 'Small family or close travel friends', badge: 'Small Group' },
  { value: '5', title: '5 - 8 Explorers (Group)', subtitle: 'Strict 8:1 guest-to-guide safety ratio', badge: 'Max 8:1' },
  { value: '9', title: '9+ Private Chartered', subtitle: 'Custom safari fleet & dedicated dual guides', badge: 'Charter' }
];

export const Hero: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => {
  const { setSelectedCategory, searchPreferences, setSearchPreferences, setActiveView } = useApp();
  
  const [selectedDate, setSelectedDate] = useState(() => searchPreferences.date);
  const [guestCount, setGuestCount] = useState(() => String(searchPreferences.guests));
  const [category, setCategory] = useState('all');

  // Custom Dropdown Open States
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (groupRef.current && !groupRef.current.contains(e.target as Node)) {
        setIsGroupOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selectedExpedition = EXPEDITIONS.find(e => e.value === category) || EXPEDITIONS[0];
  const selectedGroup = GROUP_SIZES.find(g => g.value === guestCount) || GROUP_SIZES[1];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedCategory(category);
    setSearchPreferences({
      date: selectedDate,
      guests: parseInt(guestCount, 10) || 2
    });
    setIsCategoryOpen(false);
    setIsGroupOpen(false);
    onExploreClick();
  };

  return (
    <div className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/src/assets/images/hero_cayo_rainforest_1790779702967.jpg" 
          alt="Lush rainforest canopy in Cayo District, Belize"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-fade-in"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/65 to-[#0D1117]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0D1117]/30 to-[#0D1117]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Trust pill/kicker - clickable to guide */}
        <button
          onClick={() => setActiveView('guide')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F382C]/90 hover:bg-[#0F382C] border border-[#E0A96D]/40 backdrop-blur-md mb-6 shadow-lg hover:border-[#E0A96D] transition-all group cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-[#E0A96D] group-hover:scale-110 transition-transform" />
          <span className="text-xs uppercase tracking-widest text-slate-200 font-semibold">
            Licensed BTB Operator · Lead Guide Miss Gissell Rodriguez
          </span>
          <span className="text-[10px] bg-[#E0A96D] text-slate-950 font-bold px-2 py-0.5 rounded-full">
            Meet Gissell →
          </span>
        </button>

        {/* Hero Title */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6 drop-shadow-md text-balance">
          Uncover the Secrets of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E0A96D] via-amber-200 to-[#E0A96D]">Cayo</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-200 max-w-2xl mb-10 leading-relaxed drop-shadow font-normal text-balance">
          Immersive eco-adventures through sacred Maya caves, jungle waterfalls, and ceremonial temples in Belize’s western heartland.
        </p>

        {/* High-End Unified Search & Booking Bar with Clean Rounded Corners */}
        <form 
          onSubmit={handleSearchSubmit}
          className="w-full max-w-4xl bg-[#0D1117]/90 backdrop-blur-2xl p-2.5 sm:p-3 rounded-3xl shadow-2xl border border-white/20 mb-8 relative z-30 ring-1 ring-white/10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-2.5 items-stretch text-left">
            
            {/* Field 1: Expedition Type Custom Dropdown (Col 4) */}
            <div ref={categoryRef} className="lg:col-span-4 relative">
              <button
                type="button"
                onClick={() => {
                  setIsCategoryOpen(!isCategoryOpen);
                  setIsGroupOpen(false);
                }}
                className={`w-full h-full p-3 sm:p-3.5 rounded-2xl transition-all text-left flex items-center justify-between gap-3 border ${
                  isCategoryOpen 
                    ? 'bg-[#0F382C]/60 border-[#E0A96D] shadow-lg shadow-emerald-950/60 ring-1 ring-[#E0A96D]/30' 
                    : 'bg-black/40 hover:bg-black/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#0F382C] border border-[#E0A96D]/40 flex items-center justify-center shrink-0">
                    {selectedExpedition.icon}
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#E0A96D] block">
                      Expedition Type
                    </span>
                    <span className="text-sm font-semibold text-white truncate block">
                      {selectedExpedition.title}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#E0A96D] transition-transform shrink-0 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Custom Popover Dropdown Menu with Neat Rounded Corners */}
              {isCategoryOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 sm:w-96 max-h-80 overflow-y-auto itinerary-scroll-container rounded-2xl bg-[#0D1117]/98 backdrop-blur-2xl border border-[#E0A96D]/40 shadow-2xl shadow-black/90 p-2 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold uppercase tracking-wider text-[#E0A96D]">Select Eco-Adventure</span>
                    <span>10 Cayo Tours</span>
                  </div>
                  {EXPEDITIONS.map(opt => {
                    const isSelected = opt.value === category;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setCategory(opt.value);
                          setIsCategoryOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-2.5 ${
                          isSelected 
                            ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm font-semibold border border-[#E0A96D]/30' 
                            : 'text-slate-200 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="shrink-0">{opt.icon}</span>
                          <div className="truncate">
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-bold truncate block">{opt.title}</span>
                              <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-black/40 text-[#E0A96D] border border-white/10">
                                {opt.badge}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 truncate block font-normal mt-0.5">
                              {opt.subtitle}
                            </span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#E0A96D] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Field 2: Preferred Date (Col 3) */}
            <div className="lg:col-span-3">
              <div className="w-full h-full p-3 sm:p-3.5 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/20 transition-all flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0F382C] border border-[#E0A96D]/40 flex items-center justify-center shrink-0 text-[#E0A96D]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#E0A96D] block">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer p-0"
                  />
                </div>
              </div>
            </div>

            {/* Field 3: Group Size Custom Dropdown (Col 3) */}
            <div ref={groupRef} className="lg:col-span-3 relative">
              <button
                type="button"
                onClick={() => {
                  setIsGroupOpen(!isGroupOpen);
                  setIsCategoryOpen(false);
                }}
                className={`w-full h-full p-3 sm:p-3.5 rounded-2xl transition-all text-left flex items-center justify-between gap-3 border ${
                  isGroupOpen 
                    ? 'bg-[#0F382C]/60 border-[#E0A96D] shadow-lg shadow-emerald-950/60 ring-1 ring-[#E0A96D]/30' 
                    : 'bg-black/40 hover:bg-black/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#0F382C] border border-[#E0A96D]/40 flex items-center justify-center shrink-0 text-[#E0A96D]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#E0A96D] block">
                      Group Size
                    </span>
                    <span className="text-sm font-semibold text-white truncate block">
                      {selectedGroup.title}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#E0A96D] transition-transform shrink-0 ${isGroupOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Custom Popover Dropdown Menu with Neat Rounded Corners */}
              {isGroupOpen && (
                <div 
                  className="absolute top-full right-0 mt-2 w-72 sm:w-80 max-h-80 overflow-y-auto itinerary-scroll-container rounded-2xl bg-[#0D1117]/98 backdrop-blur-2xl border border-[#E0A96D]/40 shadow-2xl shadow-black/90 p-2 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold uppercase tracking-wider text-[#E0A96D]">Party Size</span>
                    <span>Max 8:1 Guide Ratio</span>
                  </div>
                  {GROUP_SIZES.map(opt => {
                    const isSelected = opt.value === guestCount;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setGuestCount(opt.value);
                          setIsGroupOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-2.5 ${
                          isSelected 
                            ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm font-semibold border border-[#E0A96D]/30' 
                            : 'text-slate-200 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="truncate">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold truncate block">{opt.title}</span>
                            <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-black/40 text-[#E0A96D] border border-white/10">
                              {opt.badge}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 truncate block font-normal mt-0.5">
                            {opt.subtitle}
                          </span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#E0A96D] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Field 4: Find Expeditions CTA (Col 2) */}
            <div className="lg:col-span-2">
              <button 
                type="submit"
                className="w-full h-full min-h-[52px] rounded-2xl bg-gradient-to-r from-[#0F382C] via-[#175241] to-[#0F382C] hover:from-[#134839] hover:to-[#1f6652] border border-[#E0A96D]/60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/80 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Search className="w-4 h-4 text-[#E0A96D]" />
                <span className="whitespace-nowrap">Find Expeditions</span>
              </button>
            </div>

          </div>
        </form>

        {/* Quick Highlights / Proof Adjacency */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E0A96D]"></span>
            <span>Small Group Limit: Strict 8:1 Ratio</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>All NICH Archaeological Permits & Lunch Included</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E0A96D]"></span>
            <span>San Ignacio Hotel Roundtrip Pickup</span>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Hero;
