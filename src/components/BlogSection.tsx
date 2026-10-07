import React, { useState } from 'react';
import { Compass, BookOpen, ShieldCheck, ArrowRight, X, Calendar, User, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BlogPost } from '../types/tour';

export const BlogSection: React.FC = () => {
  const { blogPosts, setSelectedCategory, setActiveView } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  const publishedArticles = blogPosts.filter(p => p.status === 'published');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E0A96D] font-bold mb-2">
          <span>Local Insider Knowledge</span>
          <span aria-hidden="true">·</span>
          <span>San Ignacio, Cayo</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Cayo Eco-Adventure Field Notes
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {publishedArticles.map(article => (
          <div
            key={article.id}
            className="glass-card rounded-2xl p-6 border border-white/10 hover:border-[#E0A96D]/50 flex flex-col justify-between group transition-all"
          >
            <div>
              {/* Cover thumbnail */}
              {article.coverImage && (
                <div className="h-40 rounded-xl overflow-hidden mb-4 bg-slate-900 border border-white/10">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="text-[#E0A96D] font-semibold text-[11px] uppercase tracking-wider">
                  {article.category}
                </span>
                <span>{article.readTime}</span>
              </div>

              <h3 className="font-display text-lg font-bold text-white mb-3 group-hover:text-[#E0A96D] transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
              <button
                onClick={() => setSelectedArticle(article)}
                className="text-xs text-[#E0A96D] hover:underline font-bold flex items-center gap-1.5"
              >
                <span>Read Full Field Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-[10px] text-slate-500 font-mono">
                {article.publishedAt}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl glass-modal rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl my-8 text-slate-200 animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedArticle.coverImage && (
              <div className="h-60 sm:h-72 rounded-2xl overflow-hidden mb-6 relative">
                <img
                  src={selectedArticle.coverImage}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-[#0F382C] text-[#E0A96D] text-[10px] font-bold uppercase tracking-wider">
                    {selectedArticle.category}
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-1.5 leading-snug">
                    {selectedArticle.title}
                  </h2>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 text-xs text-slate-400 pb-4 border-b border-white/10 mb-4">
              <span>By {selectedArticle.author}</span>
              <span>·</span>
              <span>{selectedArticle.readTime}</span>
              <span>·</span>
              <span>Published {selectedArticle.publishedAt}</span>
            </div>

            <div className="max-h-[50vh] overflow-y-auto pr-1 space-y-4 text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed scrollbar-none no-scrollbar">
              {selectedArticle.content}
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-center">
              <div className="flex gap-1.5 flex-wrap">
                {selectedArticle.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedArticle(null);
                  setActiveView('tours');
                }}
                className="py-2 px-4 rounded-xl bg-[#0F382C] border border-[#E0A96D]/50 text-white font-bold text-xs hover:scale-105 transition-transform"
              >
                Browse Cayo Expeditions
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
