import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  BookOpen, 
  Eye, 
  FileText, 
  Calendar, 
  User, 
  Tag, 
  Check, 
  X,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BlogPost } from '../../types/tour';

const BLOG_COVER_PRESETS = [
  { label: 'ATM Cave Cavern', url: '/src/assets/images/tour_atm_cave_1790779714359.jpg' },
  { label: 'Barton Creek Cathedral', url: '/src/assets/images/tour_barton_creek_1790779744942.jpg' },
  { label: 'Xunantunich Maya Pyramid', url: '/src/assets/images/tour_xunantunich_1790779725322.jpg' },
  { label: 'Big Rock Falls / Pine Ridge', url: '/src/assets/images/tour_caracol_waterfall_1790779735253.jpg' },
  { label: 'Cayo Rainforest Aerial', url: '/src/assets/images/hero_cayo_rainforest_1790779702967.jpg' }
];

export const BlogEditor: React.FC = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useApp();

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Caving Expeditions');
  const [author, setAuthor] = useState('Chief Ranger Carlos B.');
  const [readTime, setReadTime] = useState('5 min read');
  const [coverImage, setCoverImage] = useState(BLOG_COVER_PRESETS[0].url);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('ATM Cave, Spelunking');
  const [status, setStatus] = useState<'published' | 'draft'>('published');

  const filteredPosts = blogPosts.filter(p => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return p.title.toLowerCase().includes(q) ||
           p.category.toLowerCase().includes(q) ||
           p.tags.some(t => t.toLowerCase().includes(q));
  });

  const openNewPostModal = () => {
    setEditingPost(null);
    setTitle('');
    setSlug('');
    setCategory('Caving Expeditions');
    setAuthor('Chief Ranger Carlos B.');
    setReadTime('5 min read');
    setCoverImage(BLOG_COVER_PRESETS[0].url);
    setExcerpt('');
    setContent('');
    setTagsInput('San Ignacio, Eco Adventure');
    setStatus('published');
    setPreviewMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setCategory(post.category);
    setAuthor(post.author);
    setReadTime(post.readTime);
    setCoverImage(post.coverImage);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setTagsInput(post.tags.join(', '));
    setStatus(post.status);
    setPreviewMode(false);
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPost) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    if (editingPost) {
      updateBlogPost(editingPost.id, {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category,
        author,
        readTime,
        coverImage,
        excerpt,
        content,
        tags,
        status
      });
    } else {
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category,
        author,
        readTime,
        coverImage,
        excerpt,
        content,
        tags,
        status,
        publishedAt: new Date().toISOString().split('T')[0]
      };
      addBlogPost(newPost);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destination articles..."
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
          />
        </div>

        <button
          onClick={openNewPostModal}
          className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0F382C] to-[#164E3E] border border-[#E0A96D]/50 text-white font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.02] shadow-lg"
        >
          <Plus className="w-4 h-4 text-[#E0A96D]" />
          <span>New Destination Article</span>
        </button>
      </div>

      {/* Articles Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-black/50 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4">Article</th>
                <th className="p-4">Category</th>
                <th className="p-4">Author</th>
                <th className="p-4">Published Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPosts.map(post => (
                <tr key={post.id} className="hover:bg-white/5 transition-colors">
                  
                  {/* Article Title & Thumbnail */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.coverImage}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 max-w-sm">
                        <h4 className="font-bold text-white text-xs truncate">{post.title}</h4>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{post.excerpt}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4 font-medium text-slate-200">
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px]">
                      {post.category}
                    </span>
                  </td>

                  {/* Author */}
                  <td className="p-4 text-slate-300">
                    <span className="block font-medium">{post.author}</span>
                    <span className="text-[10px] text-slate-500">{post.readTime}</span>
                  </td>

                  {/* Published Date */}
                  <td className="p-4 font-mono text-slate-400 text-[11px]">
                    {post.publishedAt}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      post.status === 'published'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                        : 'bg-slate-800 text-slate-400 border border-slate-600'
                    }`}>
                      {post.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => openEditModal(post)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                      title="Edit Article"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => deleteBlogPost(post.id)}
                      className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl glass-modal rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl my-8 text-slate-200 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  {editingPost ? 'Edit Destination Field Note' : 'Create New Destination Article'}
                </h3>
                <span className="text-[11px] text-slate-400">
                  Published articles appear on the public Cayo Guide page
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{previewMode ? 'Edit Mode' : 'Live Preview'}</span>
                </button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {previewMode ? (
              // Live Article Preview
              <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                <div className="relative h-56 rounded-2xl overflow-hidden">
                  <img src={coverImage} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#0F382C] text-[#E0A96D] text-[10px] font-bold uppercase tracking-wider">
                      {category}
                    </span>
                    <h2 className="font-display text-xl font-bold text-white mt-1 leading-snug">{title || 'Untitled Post'}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 border-b border-white/10 pb-3">
                  <span>By {author}</span>
                  <span>·</span>
                  <span>{readTime}</span>
                  <span>·</span>
                  <span className="capitalize text-emerald-400">{status}</span>
                </div>

                <p className="text-xs text-slate-300 italic">{excerpt}</p>

                <div className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed space-y-2">
                  {content || 'No content written yet.'}
                </div>
              </div>
            ) : (
              // Edit Form
              <form onSubmit={handleSavePost} className="space-y-4 max-h-[65vh] overflow-y-auto pr-1 text-xs">
                
                {/* Title & Slug */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Article Title
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Packing Guide for ATM Cave"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E0A96D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="packing-guide-atm-cave"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-[11px] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category, Author, Read Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-2 text-white focus:outline-none"
                    >
                      <option value="Caving Expeditions" className="bg-[#0D1117]">Caving Expeditions</option>
                      <option value="Maya Heritage" className="bg-[#0D1117]">Maya Heritage</option>
                      <option value="Eco Travel Tips" className="bg-[#0D1117]">Eco Travel Tips</option>
                      <option value="Rivers & Tubing" className="bg-[#0D1117]">Rivers & Tubing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Author
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Read Time
                    </label>
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="5 min read"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="ATM Cave, Footwear, Socks, Xibalba"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                {/* Cover Image Preset Selector */}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Cover Image
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-2">
                    {BLOG_COVER_PRESETS.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setCoverImage(img.url)}
                        className={`cursor-pointer rounded-xl overflow-hidden border p-1 transition-all ${
                          coverImage === img.url ? 'border-[#E0A96D] bg-[#0F382C]' : 'border-white/10 bg-black/40'
                        }`}
                      >
                        <img src={img.url} alt="" className="w-full h-12 object-cover rounded-lg" referrerPolicy="no-referrer" />
                        <span className="text-[9px] text-slate-300 block truncate mt-1">{img.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Short Excerpt
                  </label>
                  <input
                    type="text"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief 1-2 sentence preview"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                {/* Rich-Text / Markdown Content */}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Article Body Content (Markdown Supported)
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write detailed insider field notes here..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#E0A96D] font-sans resize-none"
                  />
                </div>

                {/* Publish Status Toggle */}
                <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/10">
                  <div>
                    <span className="font-bold text-white block">Publish to Cayo Destination Guide</span>
                    <span className="text-[10px] text-slate-400">Published articles immediately show on client views.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatus(status === 'published' ? 'draft' : 'published')}
                    className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                      status === 'published'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-600'
                        : 'bg-slate-800 text-slate-400 border-slate-600'
                    }`}
                  >
                    {status === 'published' ? '✓ Published' : 'Draft'}
                  </button>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-white/10 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0F382C] via-[#164E3E] to-[#0F382C] border border-[#E0A96D]/50 text-white font-bold hover:scale-[1.02] shadow-md"
                  >
                    Save Article
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
