import React, { useState } from 'react';
import { 
  Compass,
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Megaphone, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Save, 
  RotateCcw, 
  Plus, 
  X, 
  Image as ImageIcon,
  ExternalLink,
  Award,
  Eye,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Layers,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SiteContent } from '../../types/tour';
import { INITIAL_SITE_CONTENT } from '../../data/siteContentData';

const GUIDE_PHOTO_PRESETS = [
  { label: 'Miss Gissell in Cayo Jungle', url: '/src/assets/images/guide_gissell_rodriguez_1791165132468.jpg' },
  { label: 'ATM Cave Cavern Portrait', url: '/src/assets/images/tour_atm_cave_1790779714359.jpg' },
  { label: 'Macal River Expedition Van', url: '/src/assets/images/hero_cayo_rainforest_1790779702967.jpg' }
];

export const SiteContentEditor: React.FC = () => {
  const { siteContent, updateSiteContent } = useApp();

  const [form, setForm] = useState<SiteContent>(siteContent);
  const [newSpecialty, setNewSpecialty] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'contact' | 'banner' | 'guide'>('contact');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent(form);
    setSaveSuccessMsg('Site content saved & updated across public pages!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all site contact & guide info to Belize default settings?')) {
      setForm(INITIAL_SITE_CONTENT);
      updateSiteContent(INITIAL_SITE_CONTENT);
      setSaveSuccessMsg('Restored default Belize operator information.');
      setTimeout(() => setSaveSuccessMsg(''), 3000);
    }
  };

  const addSpecialty = () => {
    if (!newSpecialty.trim()) return;
    setForm(prev => ({
      ...prev,
      guideProfile: {
        ...prev.guideProfile,
        specialties: [...prev.guideProfile.specialties, newSpecialty.trim()]
      }
    }));
    setNewSpecialty('');
  };

  const removeSpecialty = (indexToRemove: number) => {
    setForm(prev => ({
      ...prev,
      guideProfile: {
        ...prev.guideProfile,
        specialties: prev.guideProfile.specialties.filter((_, idx) => idx !== indexToRemove)
      }
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header & Save Banner */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#E0A96D]" />
            <span>Site Content & Front-End Contact Editor</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Modify public operator details, live announcement bar, and lead guide credentials without touching code.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs flex items-center gap-1.5 transition-colors border border-white/10"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleSave}
            className="py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg border border-emerald-400/40 transition-transform active:scale-95"
          >
            <Save className="w-4 h-4 text-[#E0A96D]" />
            <span>Save & Publish Live</span>
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Editor Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'contact'
              ? 'bg-[#0F382C] text-[#E0A96D] border border-[#E0A96D]/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>1. Operator Contact Details</span>
        </button>

        <button
          onClick={() => setActiveTab('banner')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'banner'
              ? 'bg-[#0F382C] text-[#E0A96D] border border-[#E0A96D]/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>2. Live Announcement Bar</span>
          {form.bannerAnnouncement.enabled && (
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'guide'
              ? 'bg-[#0F382C] text-[#E0A96D] border border-[#E0A96D]/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <User className="w-4 h-4" />
          <span>3. Lead Guide Profile (Miss Gissell)</span>
        </button>
      </div>

      {/* Tab 1: Operator Contact Info */}
      {activeTab === 'contact' && (
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#E0A96D]" />
              <span>San Ignacio Operator Identity</span>
            </h3>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Official Business Name
              </label>
              <input
                type="text"
                required
                value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                San Ignacio Office Address
              </label>
              <input
                type="text"
                required
                value={form.officeLocation}
                onChange={(e) => setForm({ ...form, officeLocation: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Desk Telephone Number
                </label>
                <input
                  type="text"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  WhatsApp Expedition Hotline
                </label>
                <input
                  type="text"
                  required
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Official Email Address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={form.officeHours}
                  onChange={(e) => setForm({ ...form, officeHours: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  BTB Tour Operator License #
                </label>
                <input
                  type="text"
                  value={form.btbLicense}
                  onChange={(e) => setForm({ ...form, btbLicense: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>
            </div>
          </div>

          {/* Real-time Contact Preview Card */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs uppercase font-bold text-[#E0A96D] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>Live Front-End Card Preview</span>
              </span>
              <span className="text-[10px] text-slate-400">Reflected in Contact & Footer</span>
            </div>

            <div className="p-5 rounded-2xl bg-black/60 border border-white/15 space-y-4 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0F382C] border border-[#E0A96D]/50 text-[#E0A96D] flex items-center justify-center font-bold">
                  {form.businessName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{form.businessName}</h4>
                  <span className="text-[10px] text-emerald-400">San Ignacio Town, Cayo, Belize</span>
                </div>
              </div>

              <div className="space-y-2 text-slate-300 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E0A96D] shrink-0 mt-0.5" />
                  <span>{form.officeLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
                  <span>{form.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 text-[#25D366] font-bold">WA</span>
                  <span className="text-emerald-300">{form.whatsapp} (Direct Hotline)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
                  <span>{form.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
                  <span>{form.officeHours}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-[11px] text-[#E0A96D]">
                <ShieldCheck className="w-4 h-4" />
                <span>Licensed Belize Tour Operator {form.btbLicense}</span>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Live Announcement Bar & Multi-Banner Queue */}
      {activeTab === 'banner' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-[#E0A96D]" />
                  <span>Highlight Banner & Offers Queue</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Multi-banner ticker displayed above the floating island navbar
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                <span className="text-xs text-slate-300 font-semibold">Enabled:</span>
                <input
                  type="checkbox"
                  checked={form.bannerAnnouncement.enabled}
                  onChange={(e) => setForm({
                    ...form,
                    bannerAnnouncement: {
                      ...form.bannerAnnouncement,
                      enabled: e.target.checked
                    }
                  })}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </label>
            </div>

            {/* Timed Slider Configuration */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <span className="text-[10px] uppercase font-bold text-[#E0A96D] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Timed Slider Controls</span>
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Slide Interval (Seconds)
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="60"
                    value={form.bannerAnnouncement.slideInterval || 10}
                    onChange={(e) => setForm({
                      ...form,
                      bannerAnnouncement: {
                        ...form.bannerAnnouncement,
                        slideInterval: Math.max(3, parseInt(e.target.value) || 10)
                      }
                    })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Default: 10 seconds</span>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Auto-Sliding Behavior
                  </label>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.bannerAnnouncement.autoSlide ?? false}
                      onChange={(e) => setForm({
                        ...form,
                        bannerAnnouncement: {
                          ...form.bannerAnnouncement,
                          autoSlide: e.target.checked
                        }
                      })}
                      className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                    />
                    <span className="text-xs text-slate-300">
                      Auto-slide periodically (Uncheck for manual only)
                    </span>
                  </label>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Visitors can always pause or slide with arrow controls
                  </span>
                </div>
              </div>
            </div>

            {/* Queue Items List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#E0A96D]" />
                  <span>Active Highlights in Queue ({form.bannerAnnouncement.items?.length || 0})</span>
                </span>
                
                <button
                  type="button"
                  onClick={() => {
                    const newItem = {
                      id: `banner-${Date.now()}`,
                      badge: '⚡ Special Offer',
                      text: 'New Cayo eco-adventure offer or backcountry notice...',
                      actionText: 'View Details',
                      actionUrl: 'tours',
                      urgency: 'highlight' as const
                    };
                    const updated = [...(form.bannerAnnouncement.items || []), newItem];
                    setForm({
                      ...form,
                      bannerAnnouncement: {
                        ...form.bannerAnnouncement,
                        items: updated,
                        text: updated[0]?.text || ''
                      }
                    });
                  }}
                  className="py-1.5 px-3 rounded-xl bg-[#0F382C] hover:bg-[#164e3e] text-[#E0A96D] text-xs font-bold flex items-center gap-1 border border-[#E0A96D]/40 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Highlight Offer</span>
                </button>
              </div>

              {/* Items Table / Cards */}
              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {(form.bannerAnnouncement.items || []).map((item, idx) => (
                  <div 
                    key={item.id || idx}
                    className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-2.5 relative group hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-white/10 text-[10px] font-mono font-bold flex items-center justify-center text-slate-300">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={item.badge}
                          onChange={(e) => {
                            const updated = [...(form.bannerAnnouncement.items || [])];
                            updated[idx] = { ...updated[idx], badge: e.target.value };
                            setForm({
                              ...form,
                              bannerAnnouncement: { ...form.bannerAnnouncement, items: updated }
                            });
                          }}
                          placeholder="e.g. 🏛️ Daily Quota"
                          className="bg-black/60 border border-white/10 rounded-lg px-2 py-1 text-xs text-white font-bold w-36 focus:outline-none focus:border-[#E0A96D]"
                        />
                      </div>

                      <div className="flex items-center gap-1">
                        {/* Move Up */}
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => {
                            if (idx === 0) return;
                            const updated = [...(form.bannerAnnouncement.items || [])];
                            const temp = updated[idx - 1];
                            updated[idx - 1] = updated[idx];
                            updated[idx] = temp;
                            setForm({
                              ...form,
                              bannerAnnouncement: { ...form.bannerAnnouncement, items: updated }
                            });
                          }}
                          className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                          title="Move Up in Queue"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>

                        {/* Move Down */}
                        <button
                          type="button"
                          disabled={idx === (form.bannerAnnouncement.items?.length || 0) - 1}
                          onClick={() => {
                            const items = form.bannerAnnouncement.items || [];
                            if (idx >= items.length - 1) return;
                            const updated = [...items];
                            const temp = updated[idx + 1];
                            updated[idx + 1] = updated[idx];
                            updated[idx] = temp;
                            setForm({
                              ...form,
                              bannerAnnouncement: { ...form.bannerAnnouncement, items: updated }
                            });
                          }}
                          className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                          title="Move Down in Queue"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (form.bannerAnnouncement.items || []).filter((_, i) => i !== idx);
                            setForm({
                              ...form,
                              bannerAnnouncement: { 
                                ...form.bannerAnnouncement, 
                                items: updated,
                                text: updated[0]?.text || ''
                              }
                            });
                          }}
                          className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-500/10 ml-1"
                          title="Remove from Queue"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Text Message */}
                    <textarea
                      rows={2}
                      value={item.text}
                      onChange={(e) => {
                        const updated = [...(form.bannerAnnouncement.items || [])];
                        updated[idx] = { ...updated[idx], text: e.target.value };
                        setForm({
                          ...form,
                          bannerAnnouncement: { 
                            ...form.bannerAnnouncement, 
                            items: updated,
                            text: idx === 0 ? e.target.value : form.bannerAnnouncement.text
                          }
                        });
                      }}
                      placeholder="Offer or announcement copy..."
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                    />

                    {/* Secondary fields: Urgency, Action Text, Action URL */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">
                          Theme / Urgency
                        </label>
                        <select
                          value={item.urgency}
                          onChange={(e) => {
                            const updated = [...(form.bannerAnnouncement.items || [])];
                            updated[idx] = { ...updated[idx], urgency: e.target.value as any };
                            setForm({
                              ...form,
                              bannerAnnouncement: { ...form.bannerAnnouncement, items: updated }
                            });
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                        >
                          <option value="highlight">Emerald Gold (Highlight)</option>
                          <option value="info">Cyan Teal (Advisory / Offer)</option>
                          <option value="alert">Amber Coral (Weather / Wire)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={item.actionText || ''}
                          onChange={(e) => {
                            const updated = [...(form.bannerAnnouncement.items || [])];
                            updated[idx] = { ...updated[idx], actionText: e.target.value };
                            setForm({
                              ...form,
                              bannerAnnouncement: { ...form.bannerAnnouncement, items: updated }
                            });
                          }}
                          placeholder="e.g. Check Slots"
                          className="w-full bg-black/60 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">
                          Destination
                        </label>
                        <select
                          value={item.actionUrl || 'tours'}
                          onChange={(e) => {
                            const updated = [...(form.bannerAnnouncement.items || [])];
                            updated[idx] = { ...updated[idx], actionUrl: e.target.value };
                            setForm({
                              ...form,
                              bannerAnnouncement: { ...form.bannerAnnouncement, items: updated }
                            });
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                        >
                          <option value="tours">Expeditions Catalog (/tours)</option>
                          <option value="itinerary">Trip Builder (/itinerary)</option>
                          <option value="guide">Lead Guide Profile (/guide)</option>
                          <option value="contact">Contact & Wire Info (/contact)</option>
                          <option value="blog">Field Guide (/blog)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Banner Live Interactive Preview */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs uppercase font-bold text-[#E0A96D] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Timed Slider Preview</span>
                </span>
                <span className="text-[10px] text-slate-400">Positioned above Floating Island Navbar</span>
              </div>

              {form.bannerAnnouncement.enabled ? (
                <div className="space-y-4">
                  {/* Simulated Top Bar */}
                  <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/60">
                    <div className="bg-[#071913] p-3 text-xs flex items-center justify-between gap-3 border-b border-[#E0A96D]/30">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 p-1 rounded-full bg-white/5">
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-slate-400 p-1 rounded-full bg-white/5">
                          <Play className="w-3 h-3" />
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-black/50 px-1.5 py-0.5 rounded border border-white/10 text-slate-300">
                          1/{form.bannerAnnouncement.items?.length || 1}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0A96D]/20 text-[#E0A96D] border border-[#E0A96D]/40">
                          {form.bannerAnnouncement.items?.[0]?.badge || '⚡ Highlight'}
                        </span>
                        <span className="text-slate-200 text-xs font-medium truncate">
                          {form.bannerAnnouncement.items?.[0]?.text || form.bannerAnnouncement.text}
                        </span>
                        {form.bannerAnnouncement.items?.[0]?.actionText && (
                          <span className="font-bold text-[#E0A96D] underline text-xs shrink-0">
                            {form.bannerAnnouncement.items[0].actionText} →
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-slate-400 p-1 rounded-full bg-white/5">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-slate-400 p-1 rounded-full bg-white/5">
                          <X className="w-3 h-3" />
                        </span>
                      </div>
                    </div>

                    {/* Simulated Floating Island Navbar underneath */}
                    <div className="p-4 bg-gradient-to-b from-[#0D1117] to-black/80 flex items-center justify-center">
                      <div className="w-full max-w-sm py-2 px-4 rounded-full bg-[#0D1117]/90 border border-white/20 shadow-lg flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#0F382C] border border-[#E0A96D] flex items-center justify-center text-[#E0A96D]">
                            <Compass className="w-3 h-3" />
                          </div>
                          <span className="font-bold text-white text-[11px]">{form.businessName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span>Home</span>
                          <span>Tours</span>
                          <span>Guide</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-white">Multi-Banner Specifications:</span>
                      <span className="text-emerald-400 font-semibold">Active & Responsive</span>
                    </div>
                    <ul className="text-[11px] text-slate-400 space-y-1 list-disc pl-4">
                      <li>Sits cleanly at the top above the floating island navbar without overlapping.</li>
                      <li>Timed slider transitions every <strong>{form.bannerAnnouncement.slideInterval || 10} seconds</strong> (when auto-slide is toggled on).</li>
                      <li>Visitors can pause auto-slide anytime, use next/prev arrows, or swipe on mobile to slide through the queue.</li>
                      <li>Includes "Offers ({form.bannerAnnouncement.items?.length || 0})" quick peek drawer for easy access.</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-white/10 rounded-2xl">
                  Announcement banner is currently <strong>disabled</strong>. Check the "Enabled" toggle to display it.
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Changes apply instantly upon clicking <strong>Save & Publish Live</strong> above.
              </span>
              <button
                type="button"
                onClick={handleSave}
                className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Queue</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Lead Guide Profile (Miss Gissell Rodriguez) */}
      {activeTab === 'guide' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <User className="w-4 h-4 text-[#E0A96D]" />
              <span>Lead Guide Identity & Credentials</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Full Guide Name
                </label>
                <input
                  type="text"
                  required
                  value={form.guideProfile.name}
                  onChange={(e) => setForm({
                    ...form,
                    guideProfile: { ...form.guideProfile, name: e.target.value }
                  })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  BTB Guide License #
                </label>
                <input
                  type="text"
                  required
                  value={form.guideProfile.license}
                  onChange={(e) => setForm({
                    ...form,
                    guideProfile: { ...form.guideProfile, license: e.target.value }
                  })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Official Title / Designation
              </label>
              <input
                type="text"
                value={form.guideProfile.title}
                onChange={(e) => setForm({
                  ...form,
                  guideProfile: { ...form.guideProfile, title: e.target.value }
                })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Years Guiding Experience
                </label>
                <input
                  type="text"
                  value={form.guideProfile.yearsExperience}
                  onChange={(e) => setForm({
                    ...form,
                    guideProfile: { ...form.guideProfile, yearsExperience: e.target.value }
                  })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Safe Expeditions Count
                </label>
                <input
                  type="text"
                  value={form.guideProfile.safeTreksCount}
                  onChange={(e) => setForm({
                    ...form,
                    guideProfile: { ...form.guideProfile, safeTreksCount: e.target.value }
                  })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Direct WhatsApp Contact
              </label>
              <input
                type="text"
                value={form.guideProfile.phone}
                onChange={(e) => setForm({
                  ...form,
                  guideProfile: { ...form.guideProfile, phone: e.target.value }
                })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
              />
            </div>

            {/* Photo URL & Presets */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Guide Photo URL
              </label>
              <input
                type="text"
                value={form.guideProfile.photoUrl}
                onChange={(e) => setForm({
                  ...form,
                  guideProfile: { ...form.guideProfile, photoUrl: e.target.value }
                })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#E0A96D] mb-2"
              />
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-slate-400">Presets:</span>
                {GUIDE_PHOTO_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setForm({
                      ...form,
                      guideProfile: { ...form.guideProfile, photoUrl: p.url }
                    })}
                    className="text-[10px] px-2 py-0.5 rounded bg-black/40 border border-white/10 text-slate-300 hover:text-[#E0A96D]"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Full Bio & Heritage Story
              </label>
              <textarea
                rows={4}
                value={form.guideProfile.bio}
                onChange={(e) => setForm({
                  ...form,
                  guideProfile: { ...form.guideProfile, bio: e.target.value }
                })}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
              />
            </div>

            {/* Specialties Editor */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Guide Specialties & Accreditations
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {form.guideProfile.specialties.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#0F382C] border border-[#E0A96D]/40 text-[#E0A96D] text-[11px]"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => removeSpecialty(idx)}
                      className="hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  placeholder="Add specialty (e.g. Swiftwater Rescue, Maya Hieroglyphs)..."
                  className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSpecialty();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addSpecialty}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Guide Card Live Preview */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs uppercase font-bold text-[#E0A96D] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>Live Guide Spotlight Preview</span>
              </span>
              <span className="text-[10px] text-slate-400">Reflected in GuideProfile.tsx</span>
            </div>

            <div className="rounded-2xl p-5 bg-black/60 border border-white/15 space-y-4 text-xs">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#E0A96D] bg-slate-800 shrink-0 shadow-lg">
                  <img
                    src={form.guideProfile.photoUrl}
                    alt={form.guideProfile.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as any).src = '/src/assets/images/guide_gissell_rodriguez_1791165132468.jpg';
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-white">{form.guideProfile.name}</h4>
                  <p className="text-xs text-slate-300">{form.guideProfile.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#0F382C] text-[#E0A96D] font-bold">
                      {form.guideProfile.license}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      {form.guideProfile.yearsExperience} Experience
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic bg-black/30 p-3 rounded-xl border border-white/5">
                "{form.guideProfile.bio}"
              </p>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                  Verified Specialties:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {form.guideProfile.specialties.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10"
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Direct WhatsApp: <strong>{form.guideProfile.phone}</strong></span>
                <span className="text-[#E0A96D] font-bold">{form.guideProfile.safeTreksCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
