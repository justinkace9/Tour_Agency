import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Clock, 
  Activity, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { Tour } from '../types/tour';
import { useApp } from '../context/AppContext';

export const HorizontalTours: React.FC = () => {
  const { 
    tours, 
    favorites, 
    toggleFavorite, 
    setSelectedTour, 
    addToItinerary, 
    selectedCategory, 
    setSelectedCategory 
  } = useApp();
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredTours = tours.filter(tour => {
    if (selectedCategory === 'all') return true;
    return tour.category === selectedCategory;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="tours-section" className="py-16 sm:py-20 w-full overflow-hidden relative">
      
      {/* Section Header - Constrained to Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E0A96D] font-bold mb-2">
              <span>Flagship Cayo Expeditions</span>
              <span aria-hidden="true">·</span>
              <span>Licensed BTB Guides</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Top Rated Eco-Adventures
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Category Filter Pills (Functional Buttons) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: 'All Expeditions' },
                { id: 'caves', label: 'Sacred Caves' },
                { id: 'ruins', label: 'Maya Ruins' },
                { id: 'waterfalls', label: 'Waterfalls' },
                { id: 'tubing', label: 'Tubing & Canoeing' },
                { id: 'extreme', label: 'Extreme Adrenaline' },
                { id: 'nature', label: 'Nature & Birds' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === tab.id
                      ? 'bg-[#E0A96D] text-slate-950 shadow-md shadow-[#E0A96D]/20'
                      : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Desktop Carousel Controls */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                onClick={() => scroll('left')}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-white hover:border-[#E0A96D] transition-colors focus-visible:ring-2 focus-visible:ring-[#E0A96D]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-white hover:border-[#E0A96D] transition-colors focus-visible:ring-2 focus-visible:ring-[#E0A96D]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Bleed Edge-to-Edge Sliding Track (With Generous Headroom to Prevent Hover Edge Clipping) */}
      <div className="w-full relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar py-6 px-4 sm:px-6 lg:px-8 xl:px-12 snap-x snap-mandatory scroll-smooth touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredTours.map((tour, idx) => {
            const isFavorited = favorites.includes(tour.id);

            return (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="flex-none w-[310px] sm:w-[360px] snap-start py-2"
              >
                <div className="h-full rounded-2xl glass-card overflow-hidden flex flex-col group transition-all duration-300 shadow-xl border border-white/10 hover:border-[#E0A96D]/60 hover:shadow-2xl hover:shadow-[#E0A96D]/15 hover:-translate-y-1.5 relative">
                  
                  {/* Image Container with Badges & Favorite Heart */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-black/30" />

                    {/* Badge Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-[#0F382C]/90 backdrop-blur-md border border-[#E0A96D]/40 text-[#E0A96D] text-[11px] font-bold uppercase tracking-wider shadow-md">
                        {tour.badge}
                      </span>
                    </div>

                    {/* Heart / Favorite Toggle Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(tour.id);
                      }}
                      aria-label={`Save ${tour.title} to favorites`}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-[#E0A96D] hover:bg-black/80 transition-all focus:outline-none"
                    >
                      <Heart
                        className={`w-4 h-4 transition-all duration-300 ${
                          isFavorited ? 'fill-[#E0A96D] text-[#E0A96D] scale-110' : 'text-white'
                        }`}
                      />
                    </button>

                    {/* Location Tag */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                      <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                        <MapPin className="w-3.5 h-3.5 text-[#E0A96D]" />
                        <span className="truncate max-w-[170px]">{tour.location}</span>
                      </div>

                      <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10 font-medium">
                        <Star className="w-3 h-3 text-[#E0A96D] fill-[#E0A96D]" />
                        <span>{tour.rating}</span>
                        <span className="text-slate-400 text-[10px]">({tour.reviewsCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Tour Title */}
                      <h3 className="font-display font-bold text-lg text-white mb-2 leading-snug group-hover:text-[#E0A96D] transition-colors">
                        {tour.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed font-normal">
                        {tour.shortDescription}
                      </p>

                      {/* Lead Guide Accreditation Tag */}
                      <div className="flex items-center gap-2 mb-3 px-2.5 py-1.5 rounded-xl bg-black/40 border border-white/10 text-[11px] text-slate-200">
                        <div className="w-4 h-4 rounded-full overflow-hidden border border-[#E0A96D] shrink-0">
                          <img 
                            src="/src/assets/images/guide_gissell_rodriguez_1791165132468.jpg" 
                            alt="Miss Gissell Rodriguez"
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <span className="truncate">Guide: <strong className="text-white font-semibold">Miss Gissell Rodriguez</strong> (BTB Lic)</span>
                      </div>

                      {/* Tour Metadata (Duration & Physical Rating) */}
                      <div className="grid grid-cols-2 gap-2 text-xs py-2.5 border-y border-white/10 mb-4 text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
                          <span className="truncate">{tour.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
                          <span className="truncate">{tour.physicalRating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="pt-2">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <span className="text-xs text-slate-400 block font-normal">From</span>
                          <div className="flex items-baseline gap-1">
                            <span className="font-display text-2xl font-bold text-white tabular-nums">
                              ${tour.priceUsd}
                            </span>
                            <span className="text-xs text-slate-400">USD / person</span>
                          </div>
                          <span className="text-[10px] text-[#E0A96D] font-medium">
                            ≈ ${tour.priceUsd * 2} BZD
                          </span>
                        </div>

                        <button
                          onClick={() => setSelectedTour(tour)}
                          className="text-xs text-[#E0A96D] hover:underline font-semibold flex items-center gap-1 py-1"
                        >
                          <span>Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSelectedTour(tour)}
                          className="py-2.5 px-3 rounded-xl border border-white/20 text-slate-200 hover:text-white hover:bg-white/10 text-xs font-semibold transition-colors flex items-center justify-center"
                        >
                          Overview
                        </button>
                        
                        <button
                          onClick={() => {
                            const tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 2);
                            addToItinerary(
                              tour, 
                              tomorrow.toISOString().split('T')[0], 
                              2, 
                              'San Ignacio Town Center'
                            );
                          }}
                          className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0F382C] to-[#164E3E] hover:from-[#134839] hover:to-[#1f6652] border border-[#E0A96D]/40 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1 shadow-md shadow-emerald-950/40"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#E0A96D]" />
                          <span>Add Itinerary</span>
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Swipe/Scroll hint on mobile */}
      <div className="sm:hidden text-center mt-2 text-xs text-slate-400 flex items-center justify-center gap-1">
        <span>← Swipe horizontally across all expeditions →</span>
      </div>

    </section>
  );
};
export default HorizontalTours;
