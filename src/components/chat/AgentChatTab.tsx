import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  User, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  CheckCheck, 
  Building2, 
  Plus, 
  Check, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Tour } from '../../types/tour';

export const AgentChatTab: React.FC = () => {
  const { 
    chatThreads, 
    sendCustomerMessage, 
    userChatThreadId, 
    currentBooking,
    tours,
    setSelectedTour,
    addToItinerary 
  } = useApp();

  const [input, setInput] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [addedTourId, setAddedTourId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Find active thread or default to first/user thread
  const activeThread = chatThreads.find(t => t.id === userChatThreadId) || chatThreads[0];
  const messages = activeThread?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAgentTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeThread) return;
    
    const textToSend = input.trim();
    sendCustomerMessage(activeThread.id, textToSend);
    setInput('');

    // Simulate agent typing indicator and live dispatch response if thread has fewer messages
    setTimeout(() => {
      setIsAgentTyping(true);
      setTimeout(() => {
        setIsAgentTyping(false);
      }, 3000);
    }, 1200);
  };

  const handleQuickQuestion = (text: string) => {
    if (!activeThread) return;
    sendCustomerMessage(activeThread.id, text);
    setTimeout(() => {
      setIsAgentTyping(true);
      setTimeout(() => {
        setIsAgentTyping(false);
      }, 3000);
    }, 1200);
  };

  const handleViewTour = (tourCard: any) => {
    const existing = tours.find(t => t.id === tourCard.id);
    if (existing) {
      setSelectedTour(existing);
    } else {
      setSelectedTour({
        id: tourCard.id,
        title: tourCard.title,
        priceUsd: tourCard.priceUsd,
        image: tourCard.image,
        shortDescription: 'Licensed Belize expedition guided by local San Ignacio specialists.',
        fullDescription: 'Experience the magic of Cayo with licensed BTB guides.',
        badge: 'Recommended',
        category: 'caves',
        duration: 'Full Day',
        physicalRating: 'Moderate',
        rating: 4.9,
        reviewsCount: 120,
        minAge: 6,
        included: ['Roundtrip Transport', 'Lunch', 'Park Permits', 'Gear'],
        whatToBring: ['Water shoes', 'Dry clothes'],
        departureTime: '7:30 AM',
        location: 'San Ignacio, Cayo',
        isAvailable: true
      });
    }
  };

  return (
    <div className="flex flex-col h-[520px] max-h-[70vh]">
      {/* Agent Live Desk Status Header */}
      <div className="px-4 py-2.5 bg-black/50 border-b border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#0F382C] border border-[#E0A96D]/40 flex items-center justify-center text-[#E0A96D] font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0D1117]"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white leading-none">Hector & Cayo Dispatch</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold border border-emerald-500/30">
                HQ Desk
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              San Ignacio Town • Direct sync to Operator Console
            </span>
          </div>
        </div>

        {activeThread?.bookingRef && (
          <span className="text-[10px] px-2 py-1 rounded-md bg-[#0F382C] border border-[#E0A96D]/30 text-[#E0A96D] font-mono font-semibold">
            {activeThread.bookingRef}
          </span>
        )}
      </div>

      {/* Messages Scroll Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pr-2">
        {messages.map((msg) => {
          const isMe = msg.sender === 'customer';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div className={`flex gap-2.5 max-w-[90%] sm:max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-md ${
                  isMe
                    ? 'bg-[#E0A96D] text-slate-950 font-bold'
                    : 'bg-[#0F382C] border border-[#E0A96D]/40 text-[#E0A96D]'
                }`}>
                  {isMe ? <User className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div className={`rounded-2xl p-3.5 shadow-md ${
                  isMe
                    ? 'bg-gradient-to-r from-[#0F382C] to-[#164e3b] border border-[#E0A96D]/30 text-white rounded-tr-none'
                    : 'bg-black/60 border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-sm'
                }`}>
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className="text-[10px] font-bold text-[#E0A96D] tracking-wider uppercase">
                      {isMe ? 'You' : 'Expedition Coordinator'}
                    </span>
                    <span className="text-[9px] text-slate-400">{msg.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-100 leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {/* Attached Tour Card from Agent */}
                  {msg.tourCard && (
                    <div className="mt-3 pt-3 border-t border-white/10 bg-white/5 p-2 rounded-xl border border-white/10">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={msg.tourCard.image} 
                          alt={msg.tourCard.title} 
                          className="w-12 h-12 rounded-lg object-cover" 
                        />
                        <div className="flex-1 min-w-0">
                          <h6 className="text-xs font-bold text-white truncate">{msg.tourCard.title}</h6>
                          <span className="text-[11px] text-[#E0A96D] font-bold">${msg.tourCard.priceUsd} USD</span>
                        </div>
                        <button
                          onClick={() => handleViewTour(msg.tourCard)}
                          className="px-2.5 py-1 rounded-lg bg-[#E0A96D] hover:bg-[#c99558] text-slate-950 text-[10px] font-bold transition-colors"
                        >
                          View Tour
                        </button>
                      </div>
                    </div>
                  )}

                  {isMe && (
                    <div className="flex justify-end mt-1 text-[9px] text-[#E0A96D]/70 gap-0.5 items-center">
                      <span>Delivered</span>
                      <CheckCheck className="w-2.5 h-2.5 text-emerald-400" />
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}

        {/* Live Agent Typing indicator */}
        {isAgentTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 pl-2 animate-pulse">
            <div className="w-6 h-6 rounded-full bg-[#0F382C] border border-white/10 flex items-center justify-center text-[#E0A96D]">
              <MessageSquare className="w-3 h-3" />
            </div>
            <span>Hector is typing a response from San Ignacio HQ...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Inquiries Buttons */}
      <div className="px-3 py-2 bg-black/30 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => handleQuickQuestion("Can you check our Atlantic Bank wire verification status?")}
          className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 shrink-0 transition-colors"
        >
          Check Atlantic Bank status
        </button>
        <button
          onClick={() => handleQuickQuestion("What time will the 4x4 van pick us up at our resort?")}
          className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 shrink-0 transition-colors"
        >
          Morning pickup time?
        </button>
        <button
          onClick={() => handleQuickQuestion("Can we customize our group itinerary with dietary notes?")}
          className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 shrink-0 transition-colors"
        >
          Custom dietary notes
        </button>
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-white/10 bg-black/40">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message to San Ignacio dispatch..."
            className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#E0A96D] focus:ring-1 focus:ring-[#E0A96D] transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-9 h-9 rounded-xl bg-[#E0A96D] hover:bg-[#c99558] disabled:opacity-40 disabled:hover:bg-[#E0A96D] text-slate-950 flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-md shadow-[#E0A96D]/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Live Dispatch Desk Active (8:00 AM – 7:00 PM CST)</span>
          </span>
          <span className="text-[#E0A96D]">Synced with Admin CRM</span>
        </div>
      </div>
    </div>
  );
};
