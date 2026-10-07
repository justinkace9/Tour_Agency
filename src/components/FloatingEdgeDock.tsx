import React, { useState } from 'react';
import { MessageCircle, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FloatingEdgeDock: React.FC = () => {
  const { setIsChatOpen, setChatActiveTab, chatThreads } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const totalUnread = chatThreads.reduce((acc, th) => acc + (th.unreadCount || 0), 0);

  const handleOpenWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      "Hello Cayo Eco-Tours! I am planning an expedition in San Ignacio, Cayo and would like to check availability."
    );
    window.open(`https://wa.me/5016158899?text=${msg}`, '_blank');
  };

  const handleOpenAIChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setChatActiveTab('ai');
    setIsChatOpen(true);
  };

  return (
    <aside
      aria-label="Floating expedition assistance dock"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`fixed bottom-24 md:bottom-8 right-0 z-40 transition-transform duration-300 ease-out select-none ${
        isExpanded ? 'translate-x-0 opacity-100' : 'translate-x-2/3 md:translate-x-3/4 opacity-80 hover:translate-x-0 hover:opacity-100'
      }`}
    >
      <div className="flex items-center gap-1.5 pl-3 pr-2 py-2 bg-gradient-to-l from-[#0F382C]/95 via-[#0F382C]/90 to-[#124234]/85 backdrop-blur-xl border-l border-y border-[#E0A96D]/30 rounded-l-2xl shadow-2xl ring-1 ring-white/10 group cursor-pointer">
        
        {/* Peek / Tab Handle with Chevron Indicator */}
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className="flex items-center justify-center p-1 -ml-1 text-[#E0A96D] group-hover:text-white transition-colors"
          title={isExpanded ? "Collapse dock" : "Expand assistance dock"}
          aria-label="Toggle assistance dock"
        >
          {isExpanded ? (
            <ChevronRight className="w-4 h-4 transition-transform" />
          ) : (
            <div className="flex flex-col items-center">
              <ChevronLeft className="w-4 h-4 animate-pulse text-[#E0A96D]" />
              <span className="text-[8px] font-bold text-[#E0A96D] uppercase tracking-tighter writing-mode-vertical rotate-180 hidden sm:block mt-1">
                Chat
              </span>
            </div>
          )}
        </button>

        {/* Action Buttons (2 Icons Only) */}
        <div className="flex items-center gap-2">
          
          {/* Button 1: WhatsApp Quick Connect */}
          <button
            onClick={handleOpenWhatsApp}
            className="relative w-11 h-11 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/50 flex items-center justify-center shadow-lg transition-all duration-200 active:scale-95 group/btn"
            title="Chat directly on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#25D366] ring-2 ring-[#0D1117]"></span>
            
            {/* Tooltip on hover */}
            <span className="absolute right-full mr-2 px-2 py-1 bg-black/90 border border-white/10 text-white text-[10px] font-medium rounded-lg whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none shadow-xl">
              WhatsApp Desk
            </span>
          </button>

          {/* Button 2: Dual AI & Travel Agent In-App Chat Modal */}
          <button
            onClick={handleOpenAIChat}
            className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#0F382C] to-[#1e614d] hover:from-[#13493a] hover:to-[#24755d] text-[#E0A96D] hover:text-white border border-[#E0A96D]/50 flex items-center justify-center shadow-lg shadow-[#0F382C]/40 transition-all duration-200 active:scale-95 group/btn"
            title="Open Cayo Travel Buddy & Live Agent"
            aria-label="Open Cayo Travel Buddy AI and Live Agent"
          >
            <Sparkles className="w-5 h-5 animate-pulse text-[#E0A96D]" />
            
            {totalUnread > 0 ? (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#E0A96D] text-slate-950 font-bold text-[9px] flex items-center justify-center ring-2 ring-[#0D1117]">
                {totalUnread}
              </span>
            ) : (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E0A96D] ring-2 ring-[#0D1117]"></span>
            )}

            {/* Tooltip on hover */}
            <span className="absolute right-full mr-2 px-2 py-1 bg-black/90 border border-white/10 text-white text-[10px] font-medium rounded-lg whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none shadow-xl">
              Cayo Travel Buddy & Live Agent
            </span>
          </button>

        </div>
      </div>
    </aside>
  );
};
