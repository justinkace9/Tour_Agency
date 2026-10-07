import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  ArrowRight, 
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  Plus, 
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Tour } from '../../types/tour';
import { getCayoBuddyResponse, QUICK_PROMPTS, AIResponse } from '../../services/aiTravelBuddy';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  tours?: Tour[];
  suggestedFollowUps?: string[];
}

export const AIAssistantTab: React.FC = () => {
  const { setSelectedTour, addToItinerary, setIsItineraryOpen, setIsChatOpen } = useApp();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "👋 **Brimming with questions about Cayo?**\n\nI'm your **Cayo Travel Buddy**, trained with verified Belize Tourism Board expedition guidelines, ATM Cave regulations, ferry schedules, and local food spots in San Ignacio Town.\n\nTap a quick question below or ask me anything about your upcoming adventure!",
      timestamp: 'Just now',
      suggestedFollowUps: QUICK_PROMPTS
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [addedTourId, setAddedTourId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendQuery = async (queryText: string) => {
    const textToSend = queryText.trim();
    if (!textToSend || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Fetch knowledge response
      const response: AIResponse = await getCayoBuddyResponse(textToSend);

      // Simulate realistic streaming typing delay
      setTimeout(() => {
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: response.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          tours: response.recommendedTours,
          suggestedFollowUps: response.suggestedFollowUps
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
      }, 750);
    } catch {
      setIsTyping(false);
    }
  };

  const handleQuickAddTour = (tour: Tour) => {
    const today = new Date();
    const tourDate = new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0];
    addToItinerary(
      tour, 
      tourDate, 
      2, 
      'San Ignacio Town Hotel', 
      'Booked via Cayo Travel Buddy AI recommendation',
      ['Traditional Belizean Rice & Beans']
    );
    setAddedTourId(tour.id);
    setTimeout(() => setAddedTourId(null), 3000);
  };

  const handleViewTour = (tour: Tour) => {
    setSelectedTour(tour);
  };

  // Helper to format bold markdown
  const renderFormattedText = (rawText: string) => {
    const paragraphs = rawText.split('\n\n');
    return paragraphs.map((p, idx) => {
      // Replace bullet points
      if (p.startsWith('• ') || p.startsWith('1. ') || p.startsWith('2. ') || p.startsWith('3. ')) {
        const lines = p.split('\n');
        return (
          <ul key={idx} className="space-y-1.5 my-2">
            {lines.map((line, lIdx) => {
              const clean = line.replace(/^[•\d\.]+\s+/, '');
              return (
                <li key={lIdx} className="flex items-start gap-2 text-xs text-slate-200">
                  <span className="text-[#E0A96D] mt-0.5">•</span>
                  <span dangerouslySetInnerHTML={{ 
                    __html: clean.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>').replace(/\*(.*?)\*/g, '<em class="text-[#E0A96D]">$1</em>') 
                  }} />
                </li>
              );
            })}
          </ul>
        );
      }

      return (
        <p key={idx} className="text-xs text-slate-200 leading-relaxed mb-2" dangerouslySetInnerHTML={{
          __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>').replace(/\*(.*?)\*/g, '<em class="text-[#E0A96D]">$1</em>')
        }} />
      );
    });
  };

  return (
    <div className="flex flex-col h-[520px] max-h-[70vh]">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`flex gap-2.5 max-w-[90%] sm:max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar Icon */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-md ${
                msg.sender === 'ai' 
                  ? 'bg-gradient-to-br from-[#0F382C] to-[#1a5b47] text-[#E0A96D] border border-[#E0A96D]/40' 
                  : 'bg-[#E0A96D] text-slate-950 font-bold'
              }`}>
                {msg.sender === 'ai' ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Content */}
              <div className={`rounded-2xl p-3.5 shadow-md ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#0F382C] to-[#154637] border border-[#E0A96D]/30 text-white rounded-tr-none'
                  : 'bg-black/50 border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-sm'
              }`}>
                <div className="flex items-center justify-between gap-3 mb-1">
                  <span className="text-[10px] font-bold text-[#E0A96D] tracking-wider uppercase">
                    {msg.sender === 'ai' ? 'Cayo Travel Buddy (AI)' : 'You'}
                  </span>
                  <span className="text-[9px] text-slate-400">{msg.timestamp}</span>
                </div>

                <div className="space-y-1">
                  {renderFormattedText(msg.text)}
                </div>

                {/* Tour Recommendation Cards Embedded inside Chat */}
                {msg.tours && msg.tours.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-2.5">
                    <span className="text-[10px] font-bold text-[#E0A96D] tracking-wider uppercase flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Recommended Expeditions</span>
                    </span>

                    {msg.tours.map((tour) => (
                      <div 
                        key={tour.id} 
                        className="bg-white/5 border border-white/15 rounded-xl p-2.5 flex items-center justify-between gap-3 hover:border-[#E0A96D]/40 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img 
                            src={tour.image} 
                            alt={tour.title}
                            className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0" 
                          />
                          <div className="min-w-0">
                            <h5 className="text-xs font-bold text-white truncate">{tour.title}</h5>
                            <div className="flex items-center gap-2 text-[10px] text-slate-300 mt-0.5">
                              <span className="text-[#E0A96D] font-bold">${tour.priceUsd} USD</span>
                              <span>•</span>
                              <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{tour.duration}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleViewTour(tour)}
                            className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] font-medium transition-colors"
                          >
                            Details
                          </button>
                          
                          <button
                            onClick={() => handleQuickAddTour(tour)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                              addedTourId === tour.id
                                ? 'bg-emerald-500 text-white'
                                : 'bg-[#E0A96D] hover:bg-[#c99558] text-slate-950 shadow-sm'
                            }`}
                          >
                            {addedTourId === tour.id ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggested Follow-up chips */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                    {msg.suggestedFollowUps.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSendQuery(prompt)}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#0F382C] border border-white/10 hover:border-[#E0A96D]/50 text-slate-300 hover:text-[#E0A96D] transition-colors text-left"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 pl-2 animate-pulse">
            <div className="w-6 h-6 rounded-full bg-[#0F382C] border border-[#E0A96D]/40 flex items-center justify-center text-[#E0A96D]">
              <Sparkles className="w-3 h-3 animate-spin" />
            </div>
            <span>Cayo Buddy is formulating expedition advice...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Field & Send Action */}
      <div className="p-3 border-t border-white/10 bg-black/40">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuery(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about ATM Cave, packing, food, kids, weather..."
            className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#E0A96D] focus:ring-1 focus:ring-[#E0A96D] transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-9 h-9 rounded-xl bg-[#E0A96D] hover:bg-[#c99558] disabled:opacity-40 disabled:hover:bg-[#E0A96D] text-slate-950 flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-md shadow-[#E0A96D]/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
          <span>Powered by local Cayo licensed guides</span>
          <span className="text-[#E0A96D]/80">San Ignacio Town, Belize</span>
        </div>
      </div>
    </div>
  );
};
