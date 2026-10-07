import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Award, 
  MessageSquare, 
  PhoneCall, 
  Compass, 
  Calendar,
  CheckCircle2,
  Sparkles,
  HeartHandshake,
  Star,
  Clock,
  ArrowRight,
  Shield,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GuideProfile: React.FC = () => {
  const { setIsChatOpen, setSelectedTour, tours, addToItinerary, siteContent } = useApp();
  const [activeTab, setActiveTab] = useState<'bio' | 'specialties' | 'ledTours' | 'reviews'>('bio');
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryDate, setInquiryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [inquiryGuests, setInquiryGuests] = useState('2');
  const [inquiryExpedition, setInquiryExpedition] = useState('ATM Cave Private Expedition');
  const [inquiryNotes, setInquiryNotes] = useState('');

  const guide = siteContent.guideProfile;

  const gissellTours = tours.filter(t => 
    t.id === 'atm-cave' || 
    t.id === 'crystal-cave-challenge' || 
    t.id === 'xunantunich-ruins' || 
    t.id === 'cahal-pech-ruins' ||
    t.id === 'barton-creek-canoeing' ||
    t.id === 'nohoch-cheen-tubing-zipline'
  );

  const handleBookPrivateTourWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${guide.name}! I would like to inquire about booking a private expedition with you directly.\nDate: ${inquiryDate}\nGroup Size: ${inquiryGuests} explorer(s)\nInterest: ${inquiryExpedition}\nNotes: ${inquiryNotes || 'Please let me know your availability!'}`
    );
    const cleanPhone = guide.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone || '5016108687'}?text=${text}`, '_blank');
  };

  const handleOpenInAppChat = () => {
    setIsChatOpen(true);
  };

  return (
    <section id="operator-guide" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative glass-panel rounded-3xl p-6 sm:p-12 border border-white/20 overflow-hidden shadow-2xl bg-gradient-to-br from-[#0F382C]/40 via-[#0D1117]/90 to-[#0F382C]/25">
        
        {/* Subtle Decorative Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E0A96D]/15 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -ml-24 -mb-24" />

        {/* Section Header Kicker */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E0A96D] font-bold mb-8">
          <ShieldCheck className="w-4 h-4 text-[#E0A96D]" />
          <span>Meet Your Lead Guide & Operator</span>
          <span aria-hidden="true">·</span>
          <span>San Ignacio, Cayo District</span>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Guide Portrait Column (Col 5) */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="relative group w-full max-w-sm">
              <div className="w-full aspect-square rounded-3xl overflow-hidden border-2 border-[#E0A96D]/60 shadow-2xl relative bg-slate-900 ring-4 ring-[#0F382C]/60">
                <img
                  src={guide.photoUrl}
                  alt={`${guide.name} - ${guide.title}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as any).src = '/src/assets/images/guide_gissell_rodriguez_1791165132468.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Status indicator on photo */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-medium">San Ignacio Town Hub</span>
                  </span>
                  <span className="text-[#E0A96D] font-bold">{guide.yearsExperience} Guiding</span>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute -bottom-3 -right-3 sm:-right-4 bg-[#0F382C] border-2 border-[#E0A96D] text-[#E0A96D] p-3 rounded-2xl shadow-2xl flex items-center gap-2">
                <Award className="w-5 h-5 text-[#E0A96D]" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-white pr-1">BTB Licensed #{guide.license}</span>
              </div>
            </div>

            {/* Badges Required by User Specification */}
            <div className="flex flex-wrap gap-2.5 mt-8 justify-center sm:justify-start w-full">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-black/50 border border-white/15 text-xs text-slate-200 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#E0A96D]" />
                <span className="font-semibold">BTB Licensed Guide</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-black/50 border border-white/15 text-xs text-slate-200 shadow-sm">
                <MapPin className="w-4 h-4 text-[#E0A96D]" />
                <span className="font-semibold">San Ignacio Local Expert</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0F382C] border border-[#E0A96D]/50 text-xs text-[#E0A96D] font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-[#E0A96D]" />
                <span>ATM Cave Specialist</span>
              </div>
            </div>

            {/* Quick Testimonial Quote */}
            <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-300 italic w-full">
              "Gissell's passion and respect for ancient Maya underworld rituals made our ATM Cave trek unforgettable and totally safe for our family."
              <span className="block font-bold not-italic text-white mt-1 text-[11px]">— David & Clara M., California</span>
            </div>
          </div>

          {/* Guide Biography & Accreditations Column (Col 7) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E0A96D] text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
                  Lead Operator
                </span>
                <span className="text-slate-400 text-xs">·</span>
                <span className="text-emerald-400 text-xs font-semibold">Cayo Native & Naturalist</span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {guide.name}
              </h2>
              
              <p className="text-base sm:text-lg font-semibold text-[#E0A96D] mt-2 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#E0A96D] shrink-0" />
                <span>{guide.title}</span>
              </p>
              
              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>San Ignacio Town, Cayo District, Belize</span>
              </p>
            </div>

            {/* Bio Tabs (Interactive Tabbed Experience) */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <button
                onClick={() => setActiveTab('bio')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'bio'
                    ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Guide Bio
              </button>
              <button
                onClick={() => setActiveTab('specialties')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'specialties'
                    ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Specialties & Safety
              </button>
              <button
                onClick={() => setActiveTab('ledTours')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'ledTours'
                    ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Tours Led by Gissell ({gissellTours.length})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'reviews'
                    ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Reviews & Stories
              </button>
            </div>

            {/* Tab 1: Bio Prose */}
            {activeTab === 'bio' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  {guide.bio}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Passionate about safety, local history, and supporting small local tour businesses, {guide.name} delivers personalized, unhurried experiences that give travelers an authentic connection to the cultural and natural heritage of Cayo.
                </p>
              </div>
            )}

            {/* Tab 2: Guiding Specialties */}
            {activeTab === 'specialties' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Official Expedition Specialties
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-200">
                  {[
                    { name: 'Actun Tunichil Muknal (ATM) Cave', note: 'Certified spelunker & NICH permitted' },
                    { name: 'Maya Archaeology & Ancient History', note: 'Temple glyphs, friezes & ritual sites' },
                    { name: 'Crystal Cave & Inland Expeditions', note: 'Technical caving & mountain challenge' },
                    { name: 'Custom Cayo Family & Adventure Itineraries', note: 'Flexible pacing for all ages' }
                  ].map((spec, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-black/45 border border-white/10">
                      <div className="flex items-center gap-2 font-bold text-white mb-1">
                        <span className="w-2 h-2 rounded-full bg-[#E0A96D]" />
                        <span>{spec.name}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 pl-4 block">{spec.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Tours Led by Gissell */}
            {activeTab === 'ledTours' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#E0A96D]" />
                  Flagship Adventures Personally Handled
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {gissellTours.map(tour => (
                    <div
                      key={tour.id}
                      onClick={() => setSelectedTour(tour)}
                      className="p-3 rounded-2xl bg-black/45 border border-white/10 hover:border-[#E0A96D]/50 transition-all cursor-pointer flex gap-3 items-center group"
                    >
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="truncate flex-1">
                        <h5 className="font-bold text-xs text-white truncate group-hover:text-[#E0A96D]">
                          {tour.title}
                        </h5>
                        <span className="text-[11px] text-[#E0A96D] font-bold block mt-0.5">
                          ${tour.priceUsd} USD · {tour.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Reviews & Stories */}
            {activeTab === 'reviews' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#E0A96D] fill-[#E0A96D]" />
                  Verified Explorer Testimonials
                </h4>
                <div className="space-y-2.5">
                  {[
                    {
                      quote: "ATM Cave was the undeniable highlight of our two weeks in Belize. Gissell kept our 12-year-old daughter completely calm during the neck-deep swim and explained every Mayan artifact with reverent detail.",
                      author: "David & Clara M.",
                      origin: "California, USA",
                      expedition: "ATM Sacred Cave"
                    },
                    {
                      quote: "Her local knowledge of San Ignacio and the Maya world at Xunantunich and Cahal Pech is unmatched. We loved stopping for fresh roadside stew chicken and learning about medicinal plants.",
                      author: "Elena & Marcus R.",
                      origin: "Toronto, Canada",
                      expedition: "Xunantunich & Cahal Pech"
                    },
                    {
                      quote: "Crystal Cave was tough, but Gissell's technical spelunking expertise made us feel totally safe. She provided top-tier Petzl helmets and high-lumen headlamps. Best guide in Central America.",
                      author: "Dr. Nicholas Vance",
                      origin: "London, UK",
                      expedition: "Crystal Cave Challenge"
                    }
                  ].map((rev, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-black/45 border border-white/10 text-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-white font-bold">{rev.author} <span className="text-slate-400 font-normal">({rev.origin})</span></span>
                        <span className="text-[10px] text-[#E0A96D] px-2 py-0.5 rounded-full bg-[#0F382C] border border-[#E0A96D]/30">{rev.expedition}</span>
                      </div>
                      <p className="text-slate-300 italic leading-relaxed">"{rev.quote}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guiding Credentials Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
                <span className="text-[10px] uppercase font-bold text-[#E0A96D] block">License</span>
                <span className="text-xs font-extrabold text-white mt-0.5 block">BTB #2024-C7</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
                <span className="text-[10px] uppercase font-bold text-[#E0A96D] block">Experience</span>
                <span className="text-xs font-extrabold text-white mt-0.5 block">12+ Yrs in Cayo</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
                <span className="text-[10px] uppercase font-bold text-[#E0A96D] block">ATM Excursions</span>
                <span className="text-xs font-extrabold text-white mt-0.5 block">850+ Safe Treks</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
                <span className="text-[10px] uppercase font-bold text-[#E0A96D] block">Certifications</span>
                <span className="text-xs font-extrabold text-white mt-0.5 block">NICH & WFR First Aid</span>
              </div>
            </div>

            {/* Safety & Gear Commitment Callout */}
            <div className="p-4 rounded-2xl bg-[#0F382C]/30 border border-[#E0A96D]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#E0A96D] shrink-0" />
                <span className="text-slate-200">
                  <strong className="text-white">Gissell's Private Tour Standard:</strong> Strict 8:1 guest-to-guide limit, certified Petzl helmets, Princeton Tec 300-lumen waterproof headlamps & private 4x4 A/C transport.
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#E0A96D]/20 text-[#E0A96D] font-bold text-[10px] whitespace-nowrap shrink-0 border border-[#E0A96D]/40">
                100% Safety Record
              </span>
            </div>

            {/* Quick Actions & Private Tour Request Drawer */}
            <div className="pt-3 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setShowInquiryForm(!showInquiryForm)}
                  className="py-3.5 px-6 rounded-2xl bg-[#0F382C] hover:bg-[#164E3E] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#E0A96D]/50 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4 text-[#E0A96D]" />
                  <span>{showInquiryForm ? 'Hide Private Request Form' : 'Request Private Guided Date'}</span>
                </button>

                <button
                  onClick={handleBookPrivateTourWhatsApp}
                  className="py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-[#25D366]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PhoneCall className="w-4 h-4 fill-current" />
                  <span>Direct WhatsApp (+501 610-8687)</span>
                </button>

                <button
                  onClick={handleOpenInAppChat}
                  className="py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:border-[#E0A96D]/60"
                >
                  <MessageSquare className="w-4 h-4 text-[#E0A96D]" />
                  <span>In-App Chat</span>
                </button>
              </div>

              {/* Interactive Private Expedition Inquiry Builder */}
              {showInquiryForm && (
                <div className="p-5 rounded-3xl bg-black/60 border border-[#E0A96D]/40 shadow-2xl space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-bold text-xs uppercase text-[#E0A96D] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Direct Inquiry to Lead Guide Miss Gissell Rodriguez
                    </span>
                    <span className="text-[10px] text-slate-400">Guaranteed Response &lt; 2 Hours</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Preferred Expedition Date
                      </label>
                      <input
                        type="date"
                        value={inquiryDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setInquiryDate(e.target.value)}
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Travelers Count
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={inquiryGuests}
                        onChange={(e) => setInquiryGuests(e.target.value)}
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Expedition Interest
                      </label>
                      <input
                        type="text"
                        value={inquiryExpedition}
                        onChange={(e) => setInquiryExpedition(e.target.value)}
                        placeholder="ATM Cave, Tikal, Ruins, or Combo"
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Notes or Hotel Pickup Location
                    </label>
                    <input
                      type="text"
                      value={inquiryNotes}
                      onChange={(e) => setInquiryNotes(e.target.value)}
                      placeholder="e.g. Staying at Chaa Creek / Ka'ana, requesting private 4x4 van with child gear"
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleBookPrivateTourWhatsApp}
                      className="py-2.5 px-5 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center gap-2 hover:bg-[#20ba59] transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5 fill-current" />
                      <span>Send Direct via WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
export default GuideProfile;
