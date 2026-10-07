import React, { useState } from 'react';
import { MessageCircle, Send, X, ShieldCheck } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState(
    'Hello! I am planning a tour to San Ignacio, Cayo and would like more details.'
  );

  const directWhatsAppUrl = `https://wa.me/5016108687?text=${encodeURIComponent(
    'Hello! I am planning a tour to San Ignacio, Cayo and would like more details.'
  )}`;

  const sendCustomWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://wa.me/5016108687?text=${encodeURIComponent(customMsg)}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Quick Inquiry Popover */}
      {isOpen && (
        <div className="fixed bottom-28 md:bottom-20 right-4 sm:right-6 z-50 w-80 glass-modal rounded-3xl p-5 border border-white/20 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366]/20 border border-[#25D366] flex items-center justify-center text-[#25D366]">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display text-xs font-bold text-white leading-tight">
                  Cayo Guide Desk
                </h4>
                <span className="text-[10px] text-emerald-400 font-medium block">
                  Online · San Ignacio Town
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Chat directly with our lead expedition coordinator in San Ignacio for same-day bookings and custom itinerary advice.
          </p>

          <form onSubmit={sendCustomWhatsApp} className="space-y-3">
            <textarea
              rows={3}
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full bg-black/40 border border-white/15 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#25D366] resize-none"
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open WhatsApp</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating WhatsApp Pill Button */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            // Direct launch on left click, or click toggle
            window.open(directWhatsAppUrl, '_blank');
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          aria-label="Direct WhatsApp chat"
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0F382C] border border-[#25D366]/60 text-white shadow-xl hover:shadow-2xl hover:border-[#25D366] hover:scale-105 transition-all focus:outline-none"
        >
          {/* Subtle pulse badge */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
          </span>

          <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-slate-950 shadow-sm">
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
          </div>

          <div className="text-left hidden sm:block">
            <span className="text-[10px] uppercase font-bold text-[#E0A96D] block leading-none">
              WhatsApp
            </span>
            <span className="text-xs font-semibold text-white leading-tight">
              Chat with Local Guide
            </span>
          </div>
        </button>

        {/* Small toggle chevron for custom inquiry */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle custom WhatsApp inquiry"
          className="w-10 h-10 rounded-full glass-panel border border-white/20 text-slate-300 hover:text-white flex items-center justify-center text-xs hover:border-[#25D366] transition-colors"
          title="Custom Message"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Send className="w-3.5 h-3.5 text-[#25D366]" />}
        </button>
      </div>
    </>
  );
};
