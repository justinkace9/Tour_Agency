import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Clock, ArrowRight, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    tours, 
    setSelectedTour, 
    setActiveView 
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = tours.filter(tour => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      tour.title.toLowerCase().includes(q) ||
      tour.shortDescription.toLowerCase().includes(q) ||
      tour.location.toLowerCase().includes(q) ||
      tour.badge.toLowerCase().includes(q) ||
      tour.physicalRating.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-2xl glass-modal rounded-3xl overflow-hidden shadow-2xl border border-white/20 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#E0A96D] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ATM cave, ruins, tubing, waterfalls..."
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Badges */}
        <div className="px-5 py-2.5 bg-black/30 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs text-slate-400">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Quick:</span>
          {['ATM Cave', 'Xunantunich', 'Caracol', 'Cahal Pech', 'Crystal Cave', 'Black Hole Drop', 'Tikal', 'Barton Creek', 'Tubing'].map(tag => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#E0A96D]/20 hover:text-[#E0A96D] transition-colors whitespace-nowrap text-slate-300"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-3">
          {results.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No expeditions found matching "{query}". Try searching "cave" or "ruins".
            </div>
          ) : (
            results.map(tour => (
              <div
                key={tour.id}
                onClick={() => {
                  setSelectedTour(tour);
                  setIsSearchOpen(false);
                }}
                className="glass-card rounded-2xl p-3 sm:p-4 border border-white/10 hover:border-[#E0A96D]/50 cursor-pointer flex gap-4 items-center group transition-all"
              >
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold text-[#E0A96D] tracking-wider">
                      {tour.badge}
                    </span>
                    <span className="text-slate-500 text-xs">·</span>
                    <span className="text-xs text-slate-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {tour.duration}
                    </span>
                  </div>

                  <h4 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-[#E0A96D] transition-colors truncate">
                    {tour.title}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E0A96D]" />
                      <span className="truncate max-w-[150px]">{tour.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-[#E0A96D]" />
                      <span>{tour.physicalRating}</span>
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-display font-bold text-base text-white tabular-nums block">
                    ${tour.priceUsd}
                  </span>
                  <span className="text-[10px] text-[#E0A96D]">USD / person</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-black/40 border-t border-white/10 text-center text-xs text-slate-400">
          Showing {results.length} licensed Cayo eco-tours
        </div>

      </div>
    </div>
  );
};
