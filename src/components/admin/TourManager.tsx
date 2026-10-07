import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  DollarSign, 
  Clock, 
  Activity, 
  MapPin, 
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  LayoutGrid,
  List,
  Upload,
  Link as LinkIcon,
  CheckCircle2,
  Backpack,
  Compass,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Tour } from '../../types/tour';

const AVAILABLE_SAMPLE_IMAGES = [
  { label: 'ATM Cave Cavern', url: '/src/assets/images/tour_atm_cave_1790779714359.jpg' },
  { label: 'Xunantunich Maya Pyramid', url: '/src/assets/images/tour_xunantunich_1790779725322.jpg' },
  { label: 'Big Rock Falls / Caracol', url: '/src/assets/images/tour_caracol_waterfall_1790779735253.jpg' },
  { label: 'Barton Creek Cave Canoe', url: '/src/assets/images/tour_barton_creek_1790779744942.jpg' },
  { label: 'Cayo Rainforest Aerial', url: '/src/assets/images/hero_cayo_rainforest_1790779702967.jpg' }
];

export const TourManager: React.FC = () => {
  const { tours, addTour, updateTour, deleteTour, toggleTourAvailability, updateTourPrice } = useApp();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Currency toggle inside form (BZD vs USD)
  const [priceCurrency, setPriceCurrency] = useState<'USD' | 'BZD'>('USD');
  const [priceInput, setPriceInput] = useState<number>(125);

  // Form State
  const [formData, setFormData] = useState<Partial<Tour>>({
    title: '',
    shortDescription: '',
    fullDescription: '',
    badge: 'Inland Adventure',
    category: 'caves',
    priceUsd: 125,
    duration: 'Full Day · 7h',
    physicalRating: 'Moderate',
    location: 'San Ignacio, Cayo District',
    minAge: 8,
    departureTime: '8:00 AM',
    image: AVAILABLE_SAMPLE_IMAGES[0].url,
    isAvailable: true,
    included: [
      'Licensed Specialist Cave Guide (BTB Certified)',
      'All Reserve & Archeological Entrance Fees',
      'Belizean Stew Chicken Lunch & Refreshments',
      'Roundtrip Shuttle from San Ignacio Town'
    ],
    whatToBring: [
      'Sturdy closed-toe hiking shoes',
      'Quick-dry shorts and t-shirt',
      'Biodegradable insect repellent'
    ]
  });

  const [customImageUrl, setCustomImageUrl] = useState('');
  const [inclusionInput, setInclusionInput] = useState('');
  const [bringInput, setBringInput] = useState('');

  const filteredTours = tours.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
                          t.location.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const openNewTourDrawer = () => {
    setEditingTour(null);
    setPriceCurrency('USD');
    setPriceInput(120);
    setCustomImageUrl('');
    setFormData({
      id: `tour-${Date.now()}`,
      title: '',
      shortDescription: 'Unforgettable adventure led by certified Belizean guides.',
      fullDescription: 'Experience the pristine beauty and rich archaeology of the Cayo District.',
      badge: 'Inland Adventure',
      category: 'caves',
      priceUsd: 120,
      duration: 'Full Day · 7.5h',
      physicalRating: 'Moderate',
      rating: 4.95,
      reviewsCount: 1,
      location: 'San Ignacio, Cayo District',
      minAge: 8,
      departureTime: '8:00 AM',
      image: AVAILABLE_SAMPLE_IMAGES[0].url,
      isAvailable: true,
      included: [
        'Licensed Specialist Guide (BTB Certified)',
        'All Park Admission & Entry Permits',
        'Traditional Belizean Lunch',
        'Roundtrip Hotel Shuttle in Cayo'
      ],
      whatToBring: [
        'Comfortable trail footwear',
        'Quick-dry clothing & towel',
        'Water bottle & eco sunscreen'
      ]
    });
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (tour: Tour) => {
    setEditingTour(tour);
    setPriceCurrency('USD');
    setPriceInput(tour.priceUsd);
    setCustomImageUrl(tour.image);
    setFormData({ ...tour });
    setIsDrawerOpen(true);
  };

  const handlePriceChange = (val: number, curr: 'USD' | 'BZD') => {
    setPriceInput(val);
    const usdEquivalent = curr === 'BZD' ? Math.round(val / 2) : val;
    setFormData(prev => ({ ...prev, priceUsd: usdEquivalent }));
  };

  const handleCurrencyToggle = (newCurr: 'USD' | 'BZD') => {
    setPriceCurrency(newCurr);
    if (newCurr === 'BZD') {
      setPriceInput((formData.priceUsd || 120) * 2);
    } else {
      setPriceInput(formData.priceUsd || 120);
    }
  };

  const handleSaveTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) return;

    const finalPriceUsd = priceCurrency === 'BZD' 
      ? Math.round(priceInput / 2) 
      : priceInput;

    const finalImage = customImageUrl.trim() || formData.image || AVAILABLE_SAMPLE_IMAGES[0].url;

    if (editingTour) {
      updateTour(editingTour.id, {
        ...formData,
        priceUsd: finalPriceUsd,
        image: finalImage
      });
    } else {
      const newTourItem: Tour = {
        id: `tour-${Date.now()}`,
        title: formData.title || 'New Cayo Tour',
        shortDescription: formData.shortDescription || '',
        fullDescription: formData.fullDescription || '',
        badge: formData.badge || 'Inland Adventure',
        category: (formData.category as any) || 'caves',
        priceUsd: finalPriceUsd,
        duration: formData.duration || 'Full Day · 7h',
        physicalRating: formData.physicalRating || 'Moderate',
        rating: 4.95,
        reviewsCount: 1,
        location: formData.location || 'San Ignacio, Cayo District',
        minAge: Number(formData.minAge) || 8,
        departureTime: formData.departureTime || '8:00 AM',
        image: finalImage,
        isAvailable: formData.isAvailable ?? true,
        included: formData.included || [],
        whatToBring: formData.whatToBring || []
      };
      addTour(newTourItem);
    }
    setIsDrawerOpen(false);
  };

  const addInclusionItem = () => {
    if (!inclusionInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      included: [...(prev.included || []), inclusionInput.trim()]
    }));
    setInclusionInput('');
  };

  const removeInclusionItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      included: prev.included?.filter((_, i) => i !== index)
    }));
  };

  const addBringItem = () => {
    if (!bringInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      whatToBring: [...(prev.whatToBring || []), bringInput.trim()]
    }));
    setBringInput('');
  };

  const removeBringItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      whatToBring: prev.whatToBring?.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Action Header & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tours by name or site..."
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
          >
            <option value="all">All Categories ({tours.length})</option>
            <option value="caves">Sacred Caves</option>
            <option value="ruins">Maya Ruins</option>
            <option value="waterfalls">Waterfalls & Pine Ridge</option>
            <option value="tubing">Tubing & Rivers</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/10">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'cards' ? 'bg-[#0F382C] text-[#E0A96D]' : 'text-slate-400 hover:text-white'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'table' ? 'bg-[#0F382C] text-[#E0A96D]' : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={openNewTourDrawer}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-700 border border-emerald-400/50 text-white font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.02] shadow-lg shadow-emerald-950/40 transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4 text-[#E0A96D]" />
            <span>Add New Tour</span>
          </button>
        </div>
      </div>

      {/* Card Grid View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTours.map((tour) => {
            const isDraft = !tour.isAvailable;
            return (
              <div
                key={tour.id}
                className={`glass-card rounded-2xl overflow-hidden border transition-all flex flex-col justify-between ${
                  isDraft ? 'border-amber-900/40 opacity-75' : 'border-white/10 hover:border-[#E0A96D]/50'
                }`}
              >
                <div>
                  {/* Tour Image with Badges */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0F382C]/90 text-[#E0A96D] text-[10px] font-bold border border-[#E0A96D]/40 backdrop-blur-md">
                        {tour.badge}
                      </span>
                      {isDraft ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-950/90 text-amber-300 text-[10px] font-bold border border-amber-500/50">
                          Draft
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 text-[10px] font-bold border border-emerald-500/50">
                          Active
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="font-mono font-bold text-sm text-[#E0A96D]">
                        ${tour.priceUsd} USD <span className="text-[10px] text-slate-300">($ {tour.priceUsd * 2} BZD)</span>
                      </span>
                      <span className="text-[11px] text-slate-300">{tour.duration}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-display font-bold text-sm text-white line-clamp-1">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {tour.shortDescription}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#E0A96D]" />
                        <span>{tour.location}</span>
                      </span>
                      <span className="font-medium text-slate-300">{tour.physicalRating}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-3 border-t border-white/10 bg-black/40 flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleTourAvailability(tour.id)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      tour.isAvailable 
                        ? 'bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 border border-emerald-900/50' 
                        : 'bg-amber-950/40 text-amber-300 hover:bg-amber-900/50 border border-amber-900/50'
                    }`}
                    title={tour.isAvailable ? 'Click to switch to Draft' : 'Click to Publish'}
                  >
                    {tour.isAvailable ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{tour.isAvailable ? 'Active' : 'Draft'}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditDrawer(tour)}
                      className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
                      title="Edit Tour"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(tour.id)}
                      className="p-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 transition-colors border border-rose-900/50"
                      title="Delete Tour"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-black/60 text-[10px] uppercase font-bold text-slate-400 border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4">Tour Name & Category</th>
                  <th className="py-3.5 px-3">Location</th>
                  <th className="py-3.5 px-3">Price USD / BZD</th>
                  <th className="py-3.5 px-3">Duration & Rating</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={tour.image}
                          alt=""
                          className="w-10 h-10 rounded-xl object-cover shrink-0 border border-white/10"
                        />
                        <div>
                          <span className="font-bold text-white block">{tour.title}</span>
                          <span className="text-[10px] text-[#E0A96D] uppercase">{tour.category} · {tour.badge}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{tour.location}</td>
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-white block">${tour.priceUsd} USD</span>
                      <span className="text-[10px] text-slate-400 font-mono">${tour.priceUsd * 2} BZD</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="block text-slate-200">{tour.duration}</span>
                      <span className="text-[10px] text-slate-400">{tour.physicalRating}</span>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => toggleTourAvailability(tour.id)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          tour.isAvailable 
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {tour.isAvailable ? 'Active' : 'Draft'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditDrawer(tour)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(tour.id)}
                          className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-[#0D1117] border border-rose-900/50 p-6 text-center space-y-4 shadow-2xl">
            <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto" />
            <h3 className="font-bold text-white text-base">Delete this tour from catalogue?</h3>
            <p className="text-xs text-slate-400">
              This will remove the tour from the front-end directory and search system.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteTour(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Tour Drawer with Real-Time Preview */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-5xl glass-modal rounded-3xl p-5 sm:p-7 border border-white/20 shadow-2xl my-6 text-slate-200 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0F382C] border border-[#E0A96D]/50 text-[#E0A96D] flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {editingTour ? 'Edit Expedition (No-Code CMS)' : 'Create New Expedition'}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Real-time front-end preview enabled · Instant catalog updates
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split Body: Form on Left (col 7), Real-Time Preview on Right (col 5) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 overflow-y-auto flex-1 pr-1">
              
              {/* Form Side */}
              <form onSubmit={handleSaveTour} className="lg:col-span-7 space-y-4 text-xs">
                
                {/* Title & Badge */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Tour Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Actun Chapat Cave Spelunking"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E0A96D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Badge Callout
                    </label>
                    <select
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                    >
                      <option value="Best Seller">Best Seller</option>
                      <option value="Inland Adventure">Inland Adventure</option>
                      <option value="Heritage Sanctuary">Heritage Sanctuary</option>
                      <option value="Sacred Waters">Sacred Waters</option>
                      <option value="Extreme Expedition">Extreme Expedition</option>
                    </select>
                  </div>
                </div>

                {/* Subtitle / Short Description */}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Subtitle / Short Description (Catalog Preview)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Brief 1-2 sentence compelling summary..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E0A96D]"
                  />
                </div>

                {/* Location, Category, Duration, Rating */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-2.5 py-2 text-white focus:outline-none"
                    >
                      <option value="caves">Caving</option>
                      <option value="ruins">Maya Ruins</option>
                      <option value="waterfalls">Waterfalls</option>
                      <option value="tubing">Eco-Adventure / Tubing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="San Ignacio, Cayo"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E0A96D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="Full Day · 7h"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E0A96D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Physical Rating
                    </label>
                    <select
                      value={formData.physicalRating}
                      onChange={(e) => setFormData({ ...formData, physicalRating: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-2.5 py-2 text-white focus:outline-none"
                    >
                      <option value="Strenuous (Challenging)">Strenuous</option>
                      <option value="Moderate to Active">Moderate to Active</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Gentle / Accessible">Gentle / Accessible</option>
                    </select>
                  </div>
                </div>

                {/* Price Per Person with BZD / USD toggle */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] uppercase font-bold text-slate-400">
                      Price Per Person ({priceCurrency})
                    </label>
                    <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/60 border border-white/10">
                      <button
                        type="button"
                        onClick={() => handleCurrencyToggle('USD')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                          priceCurrency === 'USD' ? 'bg-[#E0A96D] text-slate-950' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        USD $
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCurrencyToggle('BZD')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                          priceCurrency === 'BZD' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        BZD $
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="number"
                        min="1"
                        required
                        value={priceInput}
                        onChange={(e) => handlePriceChange(Number(e.target.value), priceCurrency)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm text-white font-mono font-bold focus:outline-none focus:border-[#E0A96D]"
                      />
                    </div>
                    <div className="text-right text-[11px] text-slate-400">
                      {priceCurrency === 'USD' ? (
                        <span>Equiv: <strong className="text-emerald-400">${priceInput * 2} BZD</strong> (2:1 peg)</span>
                      ) : (
                        <span>Equiv: <strong className="text-[#E0A96D]">${Math.round(priceInput / 2)} USD</strong></span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Full Description */}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Full Expedition Overview & Schedule
                  </label>
                  <textarea
                    rows={3}
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    placeholder="Detailed history, cavern specs, lunch arrangements..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#E0A96D] resize-none"
                  />
                </div>

                {/* Image Manager: Presets + URL Input */}
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">
                    Image Manager (Drag-and-Drop / URL / Presets)
                  </label>
                  
                  {/* Preset Selector */}
                  <div className="grid grid-cols-5 gap-2">
                    {AVAILABLE_SAMPLE_IMAGES.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setFormData({ ...formData, image: img.url });
                          setCustomImageUrl(img.url);
                        }}
                        className={`cursor-pointer rounded-xl overflow-hidden border p-1 transition-all ${
                          formData.image === img.url ? 'border-[#E0A96D] bg-[#0F382C]' : 'border-white/10 bg-black/40'
                        }`}
                      >
                        <img src={img.url} alt="" className="w-full h-10 object-cover rounded-lg" referrerPolicy="no-referrer" />
                        <span className="text-[9px] text-slate-300 block truncate mt-0.5 text-center">{img.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* URL Input */}
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={customImageUrl}
                        onChange={(e) => {
                          setCustomImageUrl(e.target.value);
                          setFormData({ ...formData, image: e.target.value });
                        }}
                        placeholder="Or enter custom image URL (https://...)..."
                        className="w-full bg-black/50 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                      />
                    </div>
                  </div>
                </div>

                {/* Inclusions Checklist Editor */}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Inclusions Checklist
                  </label>
                  <div className="space-y-1 mb-2 max-h-28 overflow-y-auto pr-1">
                    {formData.included?.map((inc, i) => (
                      <div key={i} className="flex items-center justify-between p-1.5 bg-black/40 rounded-lg border border-white/5 text-[11px]">
                        <span className="text-slate-300 truncate">✓ {inc}</span>
                        <button
                          type="button"
                          onClick={() => removeInclusionItem(i)}
                          className="text-slate-500 hover:text-rose-400 p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inclusionInput}
                      onChange={(e) => setInclusionInput(e.target.value)}
                      placeholder="Add inclusion (e.g. Traditional Mayan Stew Lunch)..."
                      className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={addInclusionItem}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Gear Checklist (What to Bring) Editor */}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-1.5">
                    <Backpack className="w-3.5 h-3.5 text-[#E0A96D]" />
                    <span>Gear Checklist (What to Bring)</span>
                  </label>
                  <div className="space-y-1 mb-2 max-h-24 overflow-y-auto pr-1">
                    {formData.whatToBring?.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-1.5 bg-black/40 rounded-lg border border-white/5 text-[11px]">
                        <span className="text-slate-300 truncate">• {item}</span>
                        <button
                          type="button"
                          onClick={() => removeBringItem(i)}
                          className="text-slate-500 hover:text-rose-400 p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={bringInput}
                      onChange={(e) => setBringInput(e.target.value)}
                      placeholder="Add gear item (e.g. Dry bag for cameras, wool socks)..."
                      className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={addBringItem}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Active / Draft Toggle */}
                <div className="flex items-center justify-between p-3.5 bg-black/50 rounded-2xl border border-white/10">
                  <div>
                    <span className="font-bold text-white text-xs block">
                      Status: {formData.isAvailable ? 'Active (Published)' : 'Draft (Hidden)'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      When published, this tour appears on homepage, search drawer, and booking engine.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isAvailable: !formData.isAvailable })}
                    className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                      formData.isAvailable ? 'bg-emerald-600' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        formData.isAvailable ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-lg border border-emerald-400/50"
                  >
                    {editingTour ? 'Save Tour Changes' : 'Create & Publish Tour'}
                  </button>
                </div>

              </form>

              {/* Real-time Preview Side (col 5) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs uppercase font-bold text-[#E0A96D] flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Real-Time Front-End Card Preview</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Live Sync</span>
                </div>

                {/* Mock Front-End Card */}
                <div className="rounded-3xl overflow-hidden bg-[#0D1117] border border-white/20 shadow-2xl space-y-3">
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                    <img
                      src={formData.image || AVAILABLE_SAMPLE_IMAGES[0].url}
                      alt={formData.title || 'Preview'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as any).src = AVAILABLE_SAMPLE_IMAGES[0].url;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0F382C] text-[#E0A96D] text-[10px] font-bold border border-[#E0A96D]/40 shadow-sm">
                        {formData.badge || 'Inland Adventure'}
                      </span>
                      {formData.isAvailable ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-500/50">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[10px] font-bold border border-amber-500/50">
                          Draft
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <div>
                        <span className="font-display font-extrabold text-base text-white">
                          ${formData.priceUsd || 120} USD
                        </span>
                        <span className="text-[10px] text-[#E0A96D] ml-1.5">
                          (${(formData.priceUsd || 120) * 2} BZD)
                        </span>
                      </div>
                      <span className="text-slate-300 text-[11px]">{formData.duration || 'Full Day'}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <h4 className="font-display font-bold text-base text-white leading-tight">
                      {formData.title || 'Untitled Tour Experience'}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {formData.shortDescription || 'Short description will appear here on traveler catalog.'}
                    </p>

                    {/* Guide accreditation tag */}
                    <div className="flex items-center gap-2 py-1 px-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-slate-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#E0A96D]" />
                      <span>Lead Guide: Miss Gissell Rodriguez (BTB #2024-C7)</span>
                    </div>

                    {/* Inclusions summary preview */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Includes:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {formData.included?.slice(0, 3).map((inc, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                            ✓ {inc}
                          </span>
                        ))}
                        {(formData.included?.length || 0) > 3 && (
                          <span className="text-[10px] text-slate-400 pt-0.5">
                            +{(formData.included?.length || 0) - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons mock */}
                    <div className="pt-2 flex items-center gap-2">
                      <div className="flex-1 py-2 text-center rounded-xl bg-[#0F382C] border border-[#E0A96D]/50 text-[#E0A96D] font-bold text-xs">
                        Add to Itinerary Cart
                      </div>
                      <div className="px-3 py-2 text-center rounded-xl bg-white/10 text-white font-bold text-xs">
                        Details
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
