import React from 'react';
import { 
  X, 
  Sparkles, 
  MessageSquare, 
  Bot, 
  Building2, 
  ShieldCheck, 
  MapPin, 
  PhoneCall, 
  ExternalLink 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AIAssistantTab } from './AIAssistantTab';
import { AgentChatTab } from './AgentChatTab';

export const DualChatModal: React.FC = () => {
  const { isChatOpen, setIsChatOpen, chatActiveTab, setChatActiveTab } = useApp();

  if (!isChatOpen) return null;

  const handleOpenWhatsApp = () => {
    const msg = encodeURIComponent("Hello Cayo Eco-Tours! I have a question about booking an expedition in San Ignacio.");
    window.open(`https://wa.me/5016158899?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsChatOpen(false)}
      />

      {/* Modal / Sliding Drawer Container */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Cayo Travel Assistant and Live Agent Chat"
        className="relative w-full sm:max-w-md md:max-w-lg bg-[#0D1117] border border-[#E0A96D]/30 sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden z-10 flex flex-col ring-1 ring-white/15 animate-in slide-in-from-bottom sm:slide-in-from-right-4 duration-300"
      >
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F382C] via-[#144234] to-[#0D1117] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-black/40 border border-[#E0A96D]/40 flex items-center justify-center text-[#E0A96D] shadow-inner">
              {chatActiveTab === 'ai' ? <Sparkles className="w-5 h-5 text-[#E0A96D]" /> : <Building2 className="w-5 h-5 text-emerald-300" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-sm text-white">
                  {chatActiveTab === 'ai' ? 'Cayo Travel Buddy' : 'San Ignacio Live Desk'}
                </h3>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-[11px] text-slate-300 flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-[#E0A96D]" />
                <span>San Ignacio, Cayo • Licensed BTB Operator</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleOpenWhatsApp}
              title="Open WhatsApp directly"
              className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-[#25D366] transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Segmented Dual Tabs Switcher */}
        <div className="p-2.5 bg-black/40 border-b border-white/10">
          <div className="grid grid-cols-2 p-1 bg-white/5 rounded-2xl border border-white/10 gap-1">
            <button
              onClick={() => setChatActiveTab('ai')}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all whitespace-nowrap ${
                chatActiveTab === 'ai'
                  ? 'bg-gradient-to-r from-[#0F382C] to-[#1a5b47] text-[#E0A96D] shadow-md border border-[#E0A96D]/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">AI Travel Assistant (Cayo Buddy)</span>
              <span className="sm:hidden">AI Assistant</span>
            </button>

            <button
              onClick={() => setChatActiveTab('agent')}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all whitespace-nowrap ${
                chatActiveTab === 'agent'
                  ? 'bg-gradient-to-r from-[#0F382C] to-[#1a5b47] text-[#E0A96D] shadow-md border border-[#E0A96D]/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Live Travel Agent</span>
              <span className="sm:hidden">Live Agent</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="bg-[#0D1117]/95">
          {chatActiveTab === 'ai' ? (
            <AIAssistantTab />
          ) : (
            <AgentChatTab />
          )}
        </div>

      </div>
    </div>
  );
};

export default DualChatModal;

