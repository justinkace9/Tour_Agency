import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  Search, 
  SlidersHorizontal, 
  Clock, 
  Activity, 
  MapPin, 
  Star, 
  Heart, 
  Plus, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Calendar, 
  Users,
  Grid,
  List,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { Tour } from '../types/tour';
import { useApp } from '../context/AppContext';
import { CustomDropdown, DropdownOption } from './common/CustomDropdown';
import { GuideProfile } from './GuideProfile';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Expeditions' },
  { id: 'caves', label: 'Sacred Caves' },
  { id: 'ruins', label: 'Maya Ruins' },
  { id: 'waterfalls', label: 'Waterfalls & Pools' },
  { id: 'tubing', label: 'Tubing & Canoeing' },
  { id: 'extreme', label: 'Extreme Adrenaline' },
  { id: 'nature', label: 'Nature & Birds' },
];

const SORT_OPTIONS: DropdownOption[] = [
  { value: 'rating', label: 'Top Rated & Reviews', sublabel: 'Highest traveler ratings' },
  { value: 'price-asc', label: 'Price: Low to High', sublabel: 'Starting from $65 USD' },
  { value: 'price-desc', label: 'Price: High to Low', sublabel: 'VIP & extreme expeditions' },
  { value: 'duration', label: 'Expedition Duration', sublabel: 'Longest to shortest' }
];

const DIFFICULTY_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'All Fitness Levels' },
  { value: 'easy', label: 'Easy / Accessible' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'strenuous', label: 'Strenuous / Extreme' }
];

export const ExpeditionsPage: React.FC = () => {
  const { 
    tours, 
    favorites, 
    toggleFavorite, 
    setSelectedTour, 
    addToItinerary, 
    currency, 
    setCurrency,
    selectedCategory,
    setSelectedCategory 
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedTours = useMemo(() => {
    return tours
      .filter((tour) => {
        // Category filter
        if (selectedCategory !== 'all' && tour.category !== selectedCategory) {
          return false;
        }

        // Search query filter
        if (searchFilter.trim()) {
          const q = searchFilter.toLowerCase();
          const matchTitle = tour.title.toLowerCase().includes(q);
          const matchDesc = tour.shortDescription.toLowerCase().includes(q);
          const matchLoc = tour.location.toLowerCase().includes(q);
          const matchBadge = tour.badge.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchLoc && !matchBadge) {
            return false;
          }
        }

        // Difficulty filter
        if (difficultyFilter !== 'all') {
          const phys = tour.physicalRating.toLowerCase();
          if (difficultyFilter === 'easy' && !phys.includes('easy') && !phys.includes('gentle') && !phys.includes('accessible')) {
            return false;
          }
          if (difficultyFilter === 'moderate' && !phys.includes('moderate')) {
            return false;
          }
          if (difficultyFilter === 'strenuous' && !phys.includes('strenuous') && !phys.includes('challenging') && !phys.includes('extreme') && !phys.includes('adrenaline')) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceUsd - b.priceUsd;
        if (sortBy === 'price-desc') return b.priceUsd - a.priceUsd;
        if (sortBy === 'duration') {
          const getHours = (dur: string) => parseFloat(dur.match(/\d+(\.\d+)?/)?.[0] || '0');
          return getHours(b.duration) - getHours(a.duration);
        }
        // default: rating & review weight
        return b.rating * b.reviewsCount - a.rating * a.reviewsCount;
      });
  }, [tours, selectedCategory, searchFilter, difficultyFilter, sortBy]);

  const handleQuickAdd = (tour: Tour) => {
    const expeditionDate = new Date();
    expeditionDate.setDate(expeditionDate.getDate() + 2);
    addToItinerary(
      tour, 
      expeditionDate.toISOString().split('T')[0], 
      2, 
      'San Ignacio Town Center'
    );
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Header Banner */}
      <div className="text-center sm:text-left mb-10">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs uppercase tracking-widest text-[#E0A96D] font-bold mb-2">
          <Compass className="w-4 h-4 text-[#E0A96D]" />
          <span>San Ignacio & Cayo District Expeditions</span>
          <span aria-hidden="true">·</span>
          <span>BTB Licensed Operations</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Belize Eco-Expeditions
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-2 leading-relaxed font-normal">
              Explore authentic inland adventures through sacred Maya caves, ancient temple super-cities, waterfall pools, and sub-tropical rainforests.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="self-center sm:self-end flex items-center bg-black/50 p-1.5 rounded-2xl border border-white/10 text-xs font-bold shrink-0">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                currency === 'USD' ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('BZD')}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                currency === 'BZD' ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              BZD (Fixed $2:1)
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Controls Panel */}
      <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-white/15 mb-10 space-y-5">
        
        {/* Top Controls: Search Bar & Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
          
          {/* Search Input */}
          <div className="lg:col-span-5">
            <label className="block text-[11px] uppercase tracking-wider text-[#E0A96D] font-semibold mb-1">
              Search Adventures
            </label>
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all text-white">
              <Search className="w-4 h-4 text-[#E0A96D] shrink-0" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search ATM cave, ruins, tubing, waterfalls..."
                className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none placeholder:text-slate-500"
              />
              {searchFilter && (
                <button 
                  onClick={() => setSearchFilter('')}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Difficulty Dropdown */}
          <div className="lg:col-span-3">
            <CustomDropdown
              label="Physical Rating"
              value={difficultyFilter}
              options={DIFFICULTY_OPTIONS}
              onChange={setDifficultyFilter}
              icon={<Activity className="w-4 h-4 text-[#E0A96D]" />}
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="lg:col-span-3">
            <CustomDropdown
              label="Sort Expeditions"
              value={sortBy}
              options={SORT_OPTIONS}
              onChange={setSortBy}
              icon={<SlidersHorizontal className="w-4 h-4 text-[#E0A96D]" />}
            />
          </div>

          {/* View Mode Toggle */}
          <div className="lg:col-span-1 flex justify-end">
            <div className="flex items-center bg-black/40 p-1 rounded-2xl border border-white/10 h-[44px]">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Grid layout"
                className={`p-2 rounded-xl transition-colors ${
                  viewMode === 'grid' ? 'bg-[#0F382C] text-[#E0A96D]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List layout"
                className={`p-2 rounded-xl transition-colors ${
                  viewMode === 'list' ? 'bg-[#0F382C] text-[#E0A96D]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Category Pills (Functional Tabs) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-white/10">
          {CATEGORY_TABS.map((tab) => {
            const count = tab.id === 'all' 
              ? tours.length 
              : tours.filter(t => t.category === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-2xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === tab.id
                    ? 'bg-[#E0A96D] text-slate-950 shadow-md shadow-[#E0A96D]/20 font-bold'
                    : 'bg-black/30 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === tab.id ? 'bg-slate-950/20 text-slate-900 font-bold' : 'bg-white/10 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 text-xs text-slate-400">
        <p>
          Showing <span className="font-bold text-white tabular-nums">{filteredAndSortedTours.length}</span> of{' '}
          <span className="tabular-nums">{tours.length}</span> certified Belize expeditions
        </p>
        {(searchFilter || selectedCategory !== 'all' || difficultyFilter !== 'all') && (
          <button
            onClick={() => {
              setSearchFilter('');
              setSelectedCategory('all');
              setDifficultyFilter('all');
            }}
            className="text-[#E0A96D] hover:underline font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Empty State */}
      {filteredAndSortedTours.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center border border-white/10 max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-[#0F382C] border border-[#E0A96D]/40 flex items-center justify-center mx-auto mb-4 text-[#E0A96D]">
            <Compass className="w-8 h-8" />
          </div>
          <h3 className="font-display text-xl font-bold text-white mb-2">
            No Expeditions Match Your Criteria
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
            Try adjusting your search terms or clearing your filters to see all available Cayo inland tours.
          </p>
          <button
            onClick={() => {
              setSearchFilter('');
              setSelectedCategory('all');
              setDifficultyFilter('all');
            }}
            className="py-2.5 px-6 rounded-2xl bg-gradient-to-r from-[#0F382C] to-[#164E3E] text-white font-semibold text-xs border border-[#E0A96D]/40 hover:scale-105 transition-all"
          >
            Show All Expeditions
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredAndSortedTours.map((tour) => {
            const isFavorited = favorites.includes(tour.id);
            const price = currency === 'BZD' ? tour.priceUsd * 2 : tour.priceUsd;

            return (
              <div
                key={tour.id}
                className="h-full rounded-3xl glass-card overflow-hidden flex flex-col group transition-all duration-300 shadow-xl border border-white/10 hover:border-[#E0A96D]/60 hover:shadow-2xl hover:shadow-[#E0A96D]/15 hover:-translate-y-1.5"
              >
                {/* Image & Badges */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-black/30" />

                  {/* Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-[#0F382C]/90 backdrop-blur-md border border-[#E0A96D]/40 text-[#E0A96D] text-[11px] font-bold uppercase tracking-wider shadow-md">
                      {tour.badge}
                    </span>
                  </div>

                  {/* Favorite Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(tour.id);
                    }}
                    aria-label={`Save ${tour.title} to favorites`}
                    className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-[#E0A96D] hover:bg-black/80 transition-all focus:outline-none"
                  >
                    <Heart
                      className={`w-4 h-4 transition-all duration-300 ${
                        isFavorited ? 'fill-[#E0A96D] text-[#E0A96D] scale-110' : 'text-white'
                      }`}
                    />
                  </button>

                  {/* Location & Reviews */}
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

                {/* Body Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white mb-2 leading-snug group-hover:text-[#E0A96D] transition-colors">
                      {tour.title}
                    </h3>

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

                  {/* Price & Action Buttons */}
                  <div className="pt-2">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-xs text-slate-400 block font-normal">From</span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display text-2xl font-bold text-white tabular-nums">
                            ${price}
                          </span>
                          <span className="text-xs text-slate-400">{currency} / person</span>
                        </div>
                        <span className="text-[10px] text-[#E0A96D] font-medium">
                          {currency === 'USD' ? `≈ $${tour.priceUsd * 2} BZD` : `≈ $${tour.priceUsd} USD`}
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

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedTour(tour)}
                        className="py-2.5 px-3 rounded-2xl border border-white/20 text-slate-200 hover:text-white hover:bg-white/10 text-xs font-semibold transition-colors flex items-center justify-center"
                      >
                        Overview
                      </button>
                      
                      <button
                        onClick={() => handleQuickAdd(tour)}
                        className="py-2.5 px-3 rounded-2xl bg-gradient-to-r from-[#0F382C] to-[#164E3E] hover:from-[#134839] hover:to-[#1f6652] border border-[#E0A96D]/40 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1 shadow-md shadow-emerald-950/40"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#E0A96D]" />
                        <span>Add Itinerary</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="space-y-4">
          {filteredAndSortedTours.map((tour) => {
            const isFavorited = favorites.includes(tour.id);
            const price = currency === 'BZD' ? tour.priceUsd * 2 : tour.priceUsd;

            return (
              <div
                key={tour.id}
                className="rounded-3xl glass-card overflow-hidden flex flex-col md:flex-row group transition-all duration-300 border border-white/10 hover:border-[#E0A96D]/60 hover:shadow-xl"
              >
                {/* Left Image */}
                <div className="relative md:w-80 h-56 md:h-auto overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0D1117] via-transparent to-black/30" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-[#0F382C]/90 backdrop-blur-md border border-[#E0A96D]/40 text-[#E0A96D] text-[11px] font-bold uppercase tracking-wider shadow-md">
                      {tour.badge}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleFavorite(tour.id)}
                    aria-label="Toggle favorite"
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-[#E0A96D]"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#E0A96D] text-[#E0A96D]' : ''}`} />
                  </button>
                </div>

                {/* Right Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-2">
                      <span className="flex items-center gap-1 font-semibold text-emerald-400">
                        <MapPin className="w-3.5 h-3.5 text-[#E0A96D]" />
                        {tour.location}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#E0A96D] fill-[#E0A96D]" />
                        {tour.rating} ({tour.reviewsCount} reviews)
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-[#E0A96D] transition-colors">
                      {tour.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-3 leading-relaxed font-normal">
                      {tour.shortDescription}
                    </p>

                    {/* Lead Guide Accreditation Tag */}
                    <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-xl bg-black/40 border border-white/10 text-[11px] text-slate-200">
                      <div className="w-4 h-4 rounded-full overflow-hidden border border-[#E0A96D] shrink-0">
                        <img 
                          src="/src/assets/images/guide_gissell_rodriguez_1791165132468.jpg" 
                          alt="Miss Gissell Rodriguez"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <span className="truncate">Guide: <strong className="text-white font-semibold">Miss Gissell Rodriguez</strong> (BTB Lic)</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#E0A96D]" />
                        {tour.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-[#E0A96D]" />
                        {tour.physicalRating}
                      </span>
                      <span>Min Age: {tour.minAge}+</span>
                      <span>Depart: {tour.departureTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <div>
                      <span className="text-xs text-slate-400 block">From</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-2xl font-bold text-white tabular-nums">
                          ${price}
                        </span>
                        <span className="text-xs text-slate-400">{currency} / person</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedTour(tour)}
                        className="py-2.5 px-4 rounded-2xl border border-white/20 text-slate-200 hover:text-white hover:bg-white/10 text-xs font-semibold transition-colors"
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => handleQuickAdd(tour)}
                        className="py-2.5 px-5 rounded-2xl bg-gradient-to-r from-[#0F382C] to-[#164E3E] hover:from-[#134839] hover:to-[#1f6652] border border-[#E0A96D]/40 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#E0A96D]" />
                        <span>Add Itinerary</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Guide Profile Spotlight for Miss Gissell Rodriguez */}
      <div className="mt-20">
        <GuideProfile />
      </div>

    </div>
  );
};
export default ExpeditionsPage;
