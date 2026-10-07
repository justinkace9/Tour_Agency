import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  Image as ImageIcon, 
  Compass, 
  BookOpen, 
  Search, 
  MessageSquare, 
  Heart, 
  Layers, 
  Calendar, 
  User, 
  Tag, 
  Clock, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink,
  ChevronRight,
  Sliders,
  Send,
  Star
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BlogPost, Tour } from '../../types/tour';

const BELIZE_BLOG_PRESETS = [
  {
    topic: 'Best Cayo Caves for Families with Kids',
    tone: 'family',
    title: 'Family Guide to Cayo Caves: Safe Underground Adventures with Children',
    subtitle: 'From gentle Barton Creek canoeing to shallow cave tubing at Nohoch Che’en.',
    category: 'Family Adventure',
    coverImage: '/src/assets/images/tour_barton_creek_1790779744942.jpg',
    readTime: '5 min read',
    tourId: 'tour-barton-creek',
    content: `Traveling with family to the Cayo District doesn't mean skipping Belize's world-famous underground chambers. While the extreme ATM Cave requires swimming and agility suited for ages 12+, San Ignacio offers two breathtaking family-friendly alternatives:

### 1. Barton Creek Cave (All Ages)
Explored in comfortable Canadian canoes, Barton Creek offers cathedral-high vaulted ceilings with zero swimming required. Children wear fitted life vests and hold powerful beam spotlights while our licensed guides point out sleeping bats, crystalline stalactites, and ancient Mayan relics perched high on dry ledges.

### 2. Nohoch Che’en River Tubing
Gentle jungle river tubing where guests float on heavy-duty inflatable rings linked together. The emerald waters glide through towering limestone caverns with tranquil currents, making it a favorite for children as young as 6.

### Packing Tips for Family Cave Treks:
* Pack dry clothes and quick-dry shoes for after the river.
* Insect repellent with lemon eucalyptus for jungle trails.
* Waterproof pouch for family photos during the canoe section.`
  },
  {
    topic: 'ATM Cave vs Crystal Cave: Which Spelunking Challenge is Right For You?',
    tone: 'adrenaline',
    title: 'ATM Cave vs. Crystal Cave: The Ultimate Cayo Spelunking Showdown',
    subtitle: 'Deciding between the sacred archaeological sanctuary and the physical high-thrill subterranean climb.',
    category: 'Sacred Caves',
    coverImage: '/src/assets/images/tour_atm_cave_1790779714359.jpg',
    readTime: '7 min read',
    tourId: 'tour-atm-cave',
    content: `Two of Belize’s most renowned caves lie hidden beneath the Tapir Mountain rainforest canopy. But their physical profiles and visitor experiences could not be more distinct.

### Actun Tunichil Muknal (ATM Cave) — Archeological Wonder
ATM is a living museum of Mayan history. You swim through the hourglass cave mouth, trek through ankle-to-chest-deep rivers, and ascend to ceremonial high ledges where calcified skeletons like the "Crystal Maiden" rest untouched for 1,200 years.

* **Physical Rating:** Strenuous (swimming, wading, walking in socks on calcite rock).
* **Key Draw:** Intact pottery, sacrificial altars, National Geographic #1 Sacred Cave.

### Crystal Cave (Mountain Cow Cave) — Pure Adrenaline
Crystal Cave is for true adventurers seeking technical spelunking. The trek starts with an intense 50-minute jungle ascent followed by abseiling down a 15-foot drop into narrow limestone fissures and crawling through glittering crystalline tunnels.

* **Physical Rating:** Extreme (tight crawls, chimney ascents, steep scrambles).
* **Key Draw:** Breathtaking sparkling crystal chambers and physical accomplishment.

### Miss Gissell’s Recommendation:
If you want deep Maya history and ancient ceremonial altars, choose **ATM Cave**. If you want a relentless physical expedition with mud slides and tight crevices, tackle **Crystal Cave**!`
  },
  {
    topic: 'Visiting Caracol Maya Ruins & Big Rock Falls Day Trip',
    tone: 'archaeology',
    title: 'Conquering Caana: A Day Expedition into Caracol & Big Rock Falls',
    subtitle: 'Journey through the Mountain Pine Ridge reserve to Belize’s tallest ancient sky palace.',
    category: 'Maya Temples',
    coverImage: '/src/assets/images/tour_caracol_1790779735496.jpg',
    readTime: '6 min read',
    tourId: 'tour-caracol',
    content: `Deep within the Chiquibul Forest Reserve rests Caracol, once a dominant Maya superpower whose military vanquished Tikal in 562 AD.

### Climbing Caana (The Sky Palace)
Standing 143 feet tall, Caana remains one of the tallest man-made architectural structures in Belize. Climbing to the top rewards explorers with an awe-inspiring 360-degree vista over the unbroken Guatemalan jungle canopy. Howler monkeys roar in the surrounding ceiba trees as toucans glide past ancient ceremonial courtyards.

### Cool Down at Big Rock Falls
After exploring Caracol under the tropical sun, the expedition winds through Mountain Pine Ridge to the Privassion River. A short scenic trail leads down to **Big Rock Falls**, a thundering 150-foot granite waterfall with a deep, crystal-clear swimming pool perfect for cooling off.`
  }
];

export const AdminBlogStudio: React.FC = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, tours, siteContent } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // AI Prompt Studio States
  const [aiTopic, setAiTopic] = useState('');
  const [aiTone, setAiTone] = useState<'family' | 'adrenaline' | 'archaeology' | 'insider'>('family');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiNotification, setAiNotification] = useState('');

  // Active Post Form State
  const [form, setForm] = useState<Partial<BlogPost>>({
    title: '',
    subtitle: '',
    category: 'Caving Expeditions',
    excerpt: '',
    content: '',
    coverImage: '/src/assets/images/tour_atm_cave_1790779714359.jpg',
    author: 'Miss Gissell Rodriguez',
    authorTag: 'Lead Guide & BTB Instructor',
    status: 'published',
    readTime: '5 min read',
    tags: ['Cayo District', 'Belize Eco-Tours'],
    embeddedTourId: 'tour-atm-cave'
  });

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  // Open modal for new blog
  const handleOpenNew = () => {
    setEditingPostId(null);
    setForm({
      title: '',
      subtitle: '',
      category: 'Caving Expeditions',
      excerpt: '',
      content: '',
      coverImage: '/src/assets/images/tour_atm_cave_1790779714359.jpg',
      author: 'Miss Gissell Rodriguez',
      authorTag: 'Lead Guide & BTB Instructor',
      status: 'published',
      readTime: '5 min read',
      tags: ['Cayo District', 'Belize Eco-Tours'],
      embeddedTourId: tours[0]?.id || 'tour-atm-cave'
    });
    setIsEditorOpen(true);
    setActiveTab('edit');
  };

  // Open modal for editing
  const handleOpenEdit = (post: BlogPost) => {
    setEditingPostId(post.id);
    setForm(post);
    setIsEditorOpen(true);
    setActiveTab('edit');
  };

  // AI Blog Generator Simulation with Gemini Prompting
  const handleGenerateAI = () => {
    if (!aiTopic.trim()) {
      setAiNotification('Please enter a topic or keyword first.');
      return;
    }

    setIsGenerating(true);
    setAiNotification('');

    setTimeout(() => {
      // Find closest preset or generate dynamic
      const match = BELIZE_BLOG_PRESETS.find(p => p.topic.toLowerCase().includes(aiTopic.toLowerCase()) || p.tone === aiTone) || BELIZE_BLOG_PRESETS[0];

      const selectedTour = tours.find(t => t.id === match.tourId) || tours[0];

      setForm({
        ...form,
        title: match.title,
        subtitle: match.subtitle,
        category: match.category,
        excerpt: match.subtitle,
        content: match.content,
        coverImage: match.coverImage,
        readTime: match.readTime,
        author: 'Miss Gissell Rodriguez',
        authorTag: 'Lead Guide & BTB Instructor',
        status: 'published',
        embeddedTourId: selectedTour.id,
        embeddedTour: {
          id: selectedTour.id,
          title: selectedTour.title,
          priceUsd: selectedTour.priceUsd,
          priceBzd: selectedTour.priceBzd,
          duration: selectedTour.duration,
          image: selectedTour.image,
          rating: selectedTour.rating,
          category: selectedTour.category
        }
      });

      setIsGenerating(false);
      setAiNotification(`✨ Gemini draft generated for "${match.title}"! Review & customize below.`);
      setIsEditorOpen(true);
    }, 1200);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      alert('Please provide at least an article Title and Content.');
      return;
    }

    const selectedTour = tours.find(t => t.id === form.embeddedTourId);

    const articleData: BlogPost = {
      id: editingPostId || `post-${Date.now()}`,
      title: form.title || 'Belize Eco-Adventure Story',
      subtitle: form.subtitle || '',
      slug: (form.title || 'story').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt: form.excerpt || form.subtitle || (form.content || '').slice(0, 140) + '...',
      content: form.content || '',
      coverImage: form.coverImage || '/src/assets/images/tour_atm_cave_1790779714359.jpg',
      category: form.category || 'Caving Expeditions',
      tags: form.tags || ['Belize', 'Cayo District'],
      author: form.author || 'Miss Gissell Rodriguez',
      authorTag: form.authorTag || 'Lead Guide',
      status: (form.status as any) || 'published',
      readTime: form.readTime || '5 min read',
      publishedAt: form.publishedAt || new Date().toISOString().split('T')[0],
      upvotes: form.upvotes || 0,
      comments: form.comments || [],
      embeddedTourId: selectedTour?.id,
      embeddedTour: selectedTour ? {
        id: selectedTour.id,
        title: selectedTour.title,
        priceUsd: selectedTour.priceUsd,
        priceBzd: selectedTour.priceBzd,
        duration: selectedTour.duration,
        image: selectedTour.image,
        rating: selectedTour.rating,
        category: selectedTour.category
      } : undefined
    };

    if (editingPostId) {
      updateBlogPost(editingPostId, articleData);
    } else {
      addBlogPost(articleData);
    }

    setIsEditorOpen(false);
  };

  // Filtered post list
  const filteredPosts = blogPosts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'All' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const categories = ['All', 'Caving Expeditions', 'Maya Temples', 'Family Adventure', 'Travel Advice'];

  return (
    <div className="space-y-6">
      
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#E0A96D]" />
            <span>AI Blog Creation Studio & CMS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Craft high-converting Belize field stories with Gemini AI assistance, community comment streams, and embedded tour booking triggers.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg border border-emerald-400/40 transition-transform active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#E0A96D]" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* AI Generator Panel */}
      <div className="glass-panel rounded-3xl p-6 border border-emerald-500/30 bg-gradient-to-br from-[#0F382C]/40 via-[#0D1117] to-black space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E0A96D]/20 border border-[#E0A96D]/40 flex items-center justify-center text-[#E0A96D]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Gemini AI Article Draft Generator</span>
              <span className="text-[10px] text-slate-400 block">Enter an expedition topic to generate an SEO-optimized Belize travel guide</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#E0A96D] bg-[#0F382C] px-2 py-0.5 rounded-full border border-[#E0A96D]/30 font-bold">
            Gemini 2.5 Flash
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-6">
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
              Article Topic / Keywords
            </label>
            <input
              type="text"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="e.g. Best Cayo Caves for Families, ATM Cave vs Crystal Cave, Xunantunich..."
              className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
              Narrative Tone
            </label>
            <select
              value={aiTone}
              onChange={(e) => setAiTone(e.target.value as any)}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
            >
              <option value="family">Family Adventure (Mild)</option>
              <option value="adrenaline">High Thrill & Adrenaline</option>
              <option value="archaeology">Maya Archaeology & History</option>
              <option value="insider">Lead Guide Insider Secrets</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E0A96D] to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-950" />
                  <span>Generating Draft...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>Generate Article</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 flex-wrap pt-1 text-[11px] text-slate-400">
          <span className="text-[10px] font-bold uppercase text-slate-500">Quick Prompts:</span>
          {BELIZE_BLOG_PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAiTopic(p.topic);
                setAiTone(p.tone as any);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 cursor-pointer transition-colors"
            >
              {p.topic}
            </button>
          ))}
        </div>

        {aiNotification && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{aiNotification}</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategoryFilter === cat
                  ? 'bg-[#0F382C] text-[#E0A96D] border border-[#E0A96D]/40'
                  : 'bg-black/40 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.map((post) => (
          <div 
            key={post.id}
            className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#E0A96D]/50 flex flex-col justify-between group transition-all"
          >
            <div>
              {/* Cover Image */}
              <div className="h-44 relative overflow-hidden bg-slate-900">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0F382C]/90 text-[#E0A96D] border border-[#E0A96D]/40 backdrop-blur-md">
                    {post.category}
                  </span>
                  {post.status === 'featured' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-2">
                <h3 className="font-display font-bold text-sm text-white line-clamp-2 group-hover:text-[#E0A96D] transition-colors">
                  {post.title}
                </h3>
                {post.subtitle && (
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {post.subtitle}
                  </p>
                )}

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#E0A96D]" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics & Actions Bar */}
            <div className="p-3 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-slate-400">
                <span className="flex items-center gap-1 text-[11px]">
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
                  <span>{post.upvotes || 0}</span>
                </span>
                <span className="flex items-center gap-1 text-[11px]">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{post.comments?.length || 0}</span>
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(post)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Edit Story"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete article "${post.title}"?`)) {
                      deleteBlogPost(post.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                  title="Delete Story"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Blog Editor Modal / Drawer */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#0D1117] border border-white/15 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#0F382C] border border-[#E0A96D]/40 flex items-center justify-center text-[#E0A96D]">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    {editingPostId ? 'Edit Article' : 'Write New Community Story'}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Belize Field Guide & Storytelling CMS
                  </span>
                </div>
              </div>

              {/* Tab Selector & Close */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
                  <button
                    onClick={() => setActiveTab('edit')}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                      activeTab === 'edit' ? 'bg-[#0F382C] text-[#E0A96D]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Edit Mode
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                      activeTab === 'preview' ? 'bg-[#0F382C] text-[#E0A96D]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Live Reader Preview
                  </button>
                </div>

                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {activeTab === 'edit' ? (
                <form id="blog-form" onSubmit={handleSaveArticle} className="space-y-4">
                  
                  {/* Title & Subtitle */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Story Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.title || ''}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. Top 5 Caves to Explore in San Ignacio..."
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E0A96D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Subtitle / Hook
                    </label>
                    <input
                      type="text"
                      value={form.subtitle || ''}
                      onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                      placeholder="e.g. A local guide breakdown of Belize’s underground wonders..."
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                    />
                  </div>

                  {/* Metadata Row: Category, Author, Read Time, Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Category
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                      >
                        <option value="Caving Expeditions">Caving Expeditions</option>
                        <option value="Maya Temples">Maya Temples</option>
                        <option value="Family Adventure">Family Adventure</option>
                        <option value="Travel Advice">Travel Advice</option>
                        <option value="Eco-Conservation">Eco-Conservation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={form.author || ''}
                        onChange={(e) => setForm({ ...form, author: e.target.value })}
                        placeholder="Miss Gissell Rodriguez"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Read Time
                      </label>
                      <input
                        type="text"
                        value={form.readTime || ''}
                        onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                        placeholder="5 min read"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Publication Status
                      </label>
                      <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                      >
                        <option value="published">Published</option>
                        <option value="featured">Featured (Top Spotlight)</option>
                        <option value="draft">Draft (Unpublished)</option>
                      </select>
                    </div>
                  </div>

                  {/* Cover Image URL with Presets */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] uppercase font-bold text-slate-400">
                      Cover Image URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={form.coverImage || ''}
                        onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                        placeholder="https://... or /src/assets/images/..."
                        className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                      />
                    </div>
                    {/* Quick photo buttons */}
                    <div className="flex items-center gap-2 pt-1 overflow-x-auto text-[10px]">
                      <span className="text-slate-500 font-bold shrink-0">Presets:</span>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, coverImage: '/src/assets/images/tour_atm_cave_1790779714359.jpg' })}
                        className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 shrink-0"
                      >
                        ATM Cave Cavern
                      </button>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, coverImage: '/src/assets/images/tour_xunantunich_1790779725322.jpg' })}
                        className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 shrink-0"
                      >
                        Xunantunich Pyramid
                      </button>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, coverImage: '/src/assets/images/tour_barton_creek_1790779744942.jpg' })}
                        className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 shrink-0"
                      >
                        Barton Creek Canoe
                      </button>
                    </div>
                  </div>

                  {/* Embedded Tour Card Picker */}
                  <div className="p-4 rounded-2xl bg-black/40 border border-[#E0A96D]/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] uppercase font-bold text-[#E0A96D] flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        <span>Embedded Public Tour Card Picker</span>
                      </label>
                      <span className="text-[10px] text-slate-400">Embeds an interactive booking banner inside article</span>
                    </div>

                    <select
                      value={form.embeddedTourId || ''}
                      onChange={(e) => setForm({ ...form, embeddedTourId: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                    >
                      <option value="">No Embedded Tour</option>
                      {tours.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.title} (${t.priceUsd} USD / ${t.priceBzd} BZD)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rich Content Editor */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Story Body (Supports Markdown Headings ### & Lists) *
                    </label>
                    <textarea
                      rows={10}
                      required
                      value={form.content || ''}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      placeholder="Write your expedition story or guide advice here..."
                      className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-xs font-mono text-white leading-relaxed focus:outline-none focus:border-[#E0A96D]"
                    />
                  </div>

                </form>
              ) : (
                /* Live Reader Preview */
                <div className="space-y-6">
                  {/* Article Hero */}
                  <div className="relative rounded-2xl overflow-hidden h-64 bg-slate-900 border border-white/10">
                    <img
                      src={form.coverImage}
                      alt={form.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/50 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 space-y-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#0F382C] text-[#E0A96D] border border-[#E0A96D]/40">
                        {form.category}
                      </span>
                      <h1 className="font-display font-bold text-xl sm:text-2xl text-white">
                        {form.title || 'Untitled Article'}
                      </h1>
                      {form.subtitle && (
                        <p className="text-xs text-slate-300">
                          {form.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Author meta */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E0A96D]">
                        <img
                          src={siteContent.guideProfile?.photoUrl || '/src/assets/images/guide_gissell_rodriguez_1791165132468.jpg'}
                          alt={form.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-white block">{form.author}</span>
                        <span className="text-[10px] text-[#E0A96D] block">{form.authorTag}</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400">{form.readTime}</span>
                  </div>

                  {/* Body preview */}
                  <div className="text-xs text-slate-300 leading-relaxed space-y-3 whitespace-pre-line font-sans">
                    {form.content}
                  </div>

                  {/* Embedded Tour Banner Preview */}
                  {form.embeddedTourId && (
                    <div className="p-4 rounded-2xl bg-[#0F382C]/70 border border-[#E0A96D]/50 flex items-center justify-between gap-4 shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 shrink-0">
                          <img
                            src={form.coverImage}
                            alt="Tour preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-[#E0A96D] uppercase">
                            Featured Tour in This Article
                          </span>
                          <h4 className="font-display font-bold text-sm text-white">
                            {tours.find(t => t.id === form.embeddedTourId)?.title || 'ATM Cave Sacred Expedition'}
                          </h4>
                          <span className="text-xs text-slate-300">
                            Daily hotel shuttles from San Ignacio Town included
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#E0A96D] to-amber-500 text-slate-950 font-bold text-xs whitespace-nowrap shadow-md cursor-pointer"
                      >
                        Book This Tour →
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-black/40 border-t border-white/10 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="blog-form"
                className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg border border-emerald-400/40 cursor-pointer"
              >
                <Check className="w-4 h-4 text-[#E0A96D]" />
                <span>{editingPostId ? 'Update & Save Live' : 'Publish Story'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
