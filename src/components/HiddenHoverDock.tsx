/**
 * Minimalist Hidden Hover Dock (Bottom-Center Position)
 * Sits completely hidden off-screen by default (translate-y-full opacity-0 pointer-events-none)
 * Revealed on hover or tap of the sleek, subtle pulsing ChevronUp indicator pill ("Quick Tools")
 * Features invisible hover-bridge padding and 2 compact action buttons:
 * 1. WhatsApp Direct Inquiry Link
 * 2. In-App Dual Chat Modal (AI Travel Buddy + Live Agent)
 */

import React, { useState } from 'react';
import { ChevronUp, Sparkles, MessageSquare, PhoneCall } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HiddenHoverDock: React.FC = () => {
  const { setIsChatOpen, chatThreads } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  // Check if any chat thread has unread messages from agent
  const unreadCount = chatThreads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);

  const handleOpenWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const queryMessage = encodeURIComponent(
      "Hello Cayo Eco-Tours! I am exploring your Belize adventures (ATM Cave, Xunantunich, Caracol) and would like to speak with a booking specialist."
    );
    window.open(`https://wa.me/5016158899?text=${queryMessage}`, '_blank', 'noopener,noreferrer');
  };

  const handleOpenChatModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsChatOpen(true);
    setIsOpen(false);
  };

  return (
    <div 
      className="fixed bottom-16 md:bottom-0 left-1/2 -translate-x-1/2 z-50 group flex flex-col items-center select-none pointer-events-auto"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* 
        MAIN ACTION DOCK:
        - Default state: 100% hidden off the bottom of the screen (translate-y-full opacity-0 pointer-events-none)
        - Hover/Tap state: Smoothly translates up into view (group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto)
      */}
      <div
        className={`transition-all duration-300 ease-out transform ${
          isOpen 
            ? 'translate-y-0 opacity-100 pointer-events-auto scale-100' 
            : 'translate-y-full opacity-0 pointer-events-none scale-95'
        } group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto mb-1`}
      >
        <div className="flex items-center gap-3 px-4 py-2.5 bg-[#0F382C]/90 hover:bg-[#0F382C]/95 backdrop-blur-xl border border-[#E0A96D]/40 rounded-full shadow-2xl shadow-emerald-950/90 ring-1 ring-white/10">
          
          {/* BUTTON 1: WhatsApp Direct Quick-Link */}
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="group/btn relative p-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-lg shadow-[#25D366]/20 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center"
            title="Chat directly on WhatsApp (+501 615-8899)"
            aria-label="Chat on WhatsApp"
          >
            <PhoneCall className="w-5 h-5 fill-current" />
            
            {/* Tooltip on button hover */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-black/90 text-white text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-lg">
              WhatsApp Desk
            </span>
          </button>

          {/* Vertical Separator */}
          <div className="w-px h-6 bg-white/15" />

          {/* BUTTON 2: In-App AI Assistant + Live Travel Agent Chat */}
          <button
            type="button"
            onClick={handleOpenChatModal}
            className="group/btn relative p-3 rounded-full bg-gradient-to-r from-[#144738] via-[#1a5b48] to-[#0F382C] hover:from-[#195644] hover:to-[#22725a] text-[#E0A96D] hover:text-white border border-[#E0A96D]/50 shadow-lg shadow-emerald-950/60 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center"
            title="Open Cayo Travel Buddy & Live Agent Desk"
            aria-label="Open Cayo Travel Buddy AI and Live Agent Chat"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-[#E0A96D]" />
              <MessageSquare className="w-2.5 h-2.5 text-white absolute -bottom-1 -right-1" />
            </div>

            {/* Unread Message Notification Ping */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-md animate-pulse">
                {unreadCount}
              </span>
            )}

            {/* Tooltip on button hover */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-black/90 text-[#E0A96D] text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-lg">
              AI Buddy & Agent
            </span>
          </button>

        </div>
      </div>

      {/* 
        INVISIBLE HOVER BRIDGE:
        Ensures continuous pointer tracking when moving cursor between indicator and dock
      */}
      <div className="h-2 w-full pointer-events-auto" />

      {/* 
        VISIBLE TRIGGER INDICATOR PILL:
        Minimal, elegant glassmorphism pill centered at the bottom with a pulsing ChevronUp
      */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-1.5 px-3 py-1 rounded-t-xl bg-[#0D1117]/90 hover:bg-[#0F382C] border-t border-x border-[#E0A96D]/40 text-[#E0A96D] shadow-lg backdrop-blur-md text-[11px] font-semibold transition-all group-hover:border-[#E0A96D] group-hover:text-white pointer-events-auto"
        title="Quick Tools: WhatsApp & AI Travel Buddy"
        aria-label="Toggle Quick Tools Dock"
      >
        <ChevronUp 
          className={`w-3.5 h-3.5 text-[#E0A96D] transition-transform duration-300 animate-pulse ${
            isOpen ? 'rotate-180 text-white' : ''
          } group-hover:rotate-180`} 
        />
        <span className="tracking-wide">Quick Tools</span>
      </button>

    </div>
  );
};

export default HiddenHoverDock;
