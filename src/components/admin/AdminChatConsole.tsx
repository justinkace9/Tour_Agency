import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  Paperclip, 
  Sparkles, 
  CheckCheck, 
  MessageSquare, 
  User, 
  Compass, 
  DollarSign, 
  Phone, 
  Mail, 
  Check, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { QUICK_AGENT_RESPONSES } from '../../data/chatData';
import { Tour } from '../../types/tour';

export const AdminChatConsole: React.FC = () => {
  const { chatThreads, sendAgentMessage, markThreadAsRead, tours } = useApp();

  const [activeThreadId, setActiveThreadId] = useState<string>(chatThreads[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [search, setSearch] = useState('');
  const [showTourAttachPicker, setShowTourAttachPicker] = useState(false);

  const activeThread = chatThreads.find(t => t.id === activeThreadId) || chatThreads[0];

  const filteredThreads = chatThreads.filter(t => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return t.customerName.toLowerCase().includes(q) ||
           t.customerEmail.toLowerCase().includes(q) ||
           (t.bookingRef && t.bookingRef.toLowerCase().includes(q));
  });

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    markThreadAsRead(threadId);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThread) return;
    sendAgentMessage(activeThread.id, inputText.trim());
    setInputText('');
  };

  const handleInsertQuickResponse = (text: string) => {
    setInputText(text);
  };

  const handleAttachTour = (tour: Tour) => {
    if (!activeThread) return;
    sendAgentMessage(
      activeThread.id, 
      `Here are the expedition details for "${tour.title}". It departs daily from San Ignacio with all park permits and gear included:`,
      tour
    );
    setShowTourAttachPicker(false);
  };

  return (
    <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl h-[78vh] flex flex-col md:flex-row animate-in fade-in duration-200">
      
      {/* Left Pane: Customer Threads List */}
      <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-white/10 flex flex-col bg-black/40 shrink-0">
        
        {/* Search header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#E0A96D]" />
              <span>Customer Inquiries</span>
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0F382C] text-[#E0A96D] font-bold">
              {chatThreads.reduce((acc, t) => acc + t.unreadCount, 0)} Unread
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
            />
          </div>
        </div>

        {/* Threads Stream */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/5">
          {filteredThreads.map(thread => {
            const isSelected = thread.id === activeThreadId;

            return (
              <div
                key={thread.id}
                onClick={() => handleSelectThread(thread.id)}
                className={`p-3.5 cursor-pointer transition-colors flex items-start gap-3 ${
                  isSelected
                    ? 'bg-[#0F382C]/50 border-l-4 border-l-[#E0A96D]'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center text-[#E0A96D] shrink-0 font-bold text-xs mt-0.5">
                  {thread.customerName[0]?.toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="font-bold text-xs text-white truncate">{thread.customerName}</h4>
                    <span className="text-[10px] text-slate-400 shrink-0">{thread.lastTimestamp}</span>
                  </div>

                  <p className="text-[11px] text-slate-300 truncate leading-snug">
                    {thread.lastMessage}
                  </p>

                  <div className="flex items-center justify-between mt-1.5">
                    {thread.bookingRef ? (
                      <span className="text-[9px] font-mono text-[#E0A96D] font-semibold bg-black/40 px-1.5 py-0.2 rounded border border-white/5">
                        {thread.bookingRef}
                      </span>
                    ) : <span />}

                    {thread.unreadCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#E0A96D] text-slate-950 font-extrabold text-[9px] flex items-center justify-center">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Right Pane: Active Conversation & Controls */}
      {activeThread ? (
        <div className="flex-1 flex flex-col justify-between bg-[#0D1117]/80 relative overflow-hidden">
          
          {/* Thread Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/30 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0F382C] border border-[#E0A96D]/40 text-[#E0A96D] flex items-center justify-center font-bold text-sm">
                {activeThread.customerName[0]?.toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <span>{activeThread.customerName}</span>
                  {activeThread.bookingRef && (
                    <span className="text-[10px] font-mono font-bold text-[#E0A96D] bg-[#0F382C] px-2 py-0.5 rounded-full border border-[#E0A96D]/30">
                      Ref: {activeThread.bookingRef}
                    </span>
                  )}
                </h3>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    <span>{activeThread.customerEmail}</span>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Phone className="w-3 h-3" />
                    <span>{activeThread.customerPhone}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>San Ignacio Field Desk Connected</span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {activeThread.messages.map(msg => {
              const isAgent = msg.sender === 'agent';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-3.5 text-xs shadow-md ${
                      isAgent
                        ? 'bg-gradient-to-r from-[#0F382C] to-[#164E3E] border border-[#E0A96D]/40 text-white rounded-tr-none'
                        : 'bg-black/60 border border-white/10 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>

                    {/* Optional Tour Card Attachment */}
                    {msg.tourCard && (
                      <div className="mt-3 p-2.5 rounded-xl bg-black/50 border border-white/15 flex items-center gap-3">
                        <img
                          src={msg.tourCard.image}
                          alt={msg.tourCard.title}
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="font-bold text-white block text-xs truncate">
                            {msg.tourCard.title}
                          </span>
                          <span className="font-mono text-[#E0A96D] text-[11px] font-bold block mt-0.5">
                            ${msg.tourCard.priceUsd} USD / person
                          </span>
                        </div>
                      </div>
                    )}

                    <div className={`text-[9px] mt-1 text-right flex items-center justify-end gap-1 ${
                      isAgent ? 'text-slate-300' : 'text-slate-400'
                    }`}>
                      <span>{msg.timestamp}</span>
                      {isAgent && <CheckCheck className="w-3 h-3 text-[#E0A96D]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Response Toolbar & Tour Card Attachment Popover */}
          <div className="p-3 bg-black/40 border-t border-white/10 space-y-2 shrink-0">
            
            {/* Quick Response Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E0A96D]" />
                <span>Quick:</span>
              </span>
              {QUICK_AGENT_RESPONSES.map((qr, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleInsertQuickResponse(qr.text)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#E0A96D]/20 hover:text-[#E0A96D] border border-white/10 text-slate-300 text-[10px] whitespace-nowrap transition-colors"
                >
                  {qr.title}
                </button>
              ))}
            </div>

            {/* Tour Attachment Picker Dropdown */}
            {showTourAttachPicker && (
              <div className="p-3 rounded-2xl bg-black/90 border border-white/20 space-y-2 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>Attach Tour Card to Customer Chat</span>
                  <button onClick={() => setShowTourAttachPicker(false)} className="text-slate-400 hover:text-white">
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {tours.map(tour => (
                    <button
                      key={tour.id}
                      type="button"
                      onClick={() => handleAttachTour(tour)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-[#0F382C] border border-white/10 text-left flex items-center gap-2 group transition-colors"
                    >
                      <img src={tour.image} alt="" className="w-8 h-8 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-white text-[11px] truncate block group-hover:text-[#E0A96D]">
                          {tour.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">${tour.priceUsd} USD</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input Box */}
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowTourAttachPicker(!showTourAttachPicker)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  showTourAttachPicker ? 'bg-[#0F382C] border-[#E0A96D] text-[#E0A96D]' : 'bg-black/50 border-white/10 text-slate-400 hover:text-white'
                }`}
                title="Attach Tour Card"
              >
                <Compass className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type response to customer, or select a quick response above..."
                className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#0F382C] to-[#164E3E] border border-[#E0A96D]/50 text-white font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-all shadow-md"
              >
                <Send className="w-4 h-4 text-[#E0A96D]" />
              </button>
            </form>

          </div>

        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-500">
          <span>Select an inquiry from the left pane to begin chat.</span>
        </div>
      )}

    </div>
  );
};
