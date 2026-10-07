import React from 'react';
import { Compass, Heart, CalendarCheck, MessageCircle, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    itinerary, 
    favorites, 
    setIsFavoritesOpen, 
    setIsAuthModalOpen,
    setIsItineraryOpen,
    setIsChatOpen,
    currentUser 
  } = useApp();

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <nav 
      aria-label="Mobile navigation dock"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0D1117]/95 backdrop-blur-xl border-t border-white/10 px-4 py-2 safe-area-bottom shadow-2xl"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* Explore / Home */}
        <button
          onClick={() => setActiveView('home')}
          aria-label="Explore Expeditions"
          title="Explore Expeditions"
          className="relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 active:scale-95"
        >
          <div className={`p-1.5 rounded-full transition-colors ${
            activeView === 'home' || activeView === 'tours' 
              ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm ring-1 ring-[#E0A96D]/40' 
              : 'text-slate-400 hover:text-slate-200'
          }`}>
            <Compass className="w-5 h-5" />
          </div>
          {(activeView === 'home' || activeView === 'tours') && (
            <span className="w-1 h-1 rounded-full bg-[#E0A96D] mt-1" />
          )}
        </button>

        {/* Favorites */}
        <button
          onClick={() => setIsFavoritesOpen(true)}
          aria-label="Saved Favorites"
          title="Saved Expeditions"
          className="relative flex flex-col items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-200 transition-all duration-200 active:scale-95"
        >
          <div className="p-1.5 rounded-full relative transition-colors">
            <Heart className={`w-5 h-5 transition-transform ${favorites.length > 0 ? 'fill-[#E0A96D] text-[#E0A96D]' : ''}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#E0A96D] text-slate-950 font-bold text-[9px] flex items-center justify-center shadow-sm">
                {favorites.length}
              </span>
            )}
          </div>
        </button>

        {/* My Trip / Itinerary */}
        <button
          onClick={() => {
            setActiveView('itinerary');
            setIsItineraryOpen(true);
          }}
          aria-label="Custom Itinerary"
          title="Custom Itinerary Builder"
          className="relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 active:scale-95"
        >
          <div className={`p-1.5 rounded-full relative transition-colors ${
            activeView === 'itinerary' 
              ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm ring-1 ring-[#E0A96D]/40' 
              : 'text-slate-400 hover:text-slate-200'
          }`}>
            <CalendarCheck className="w-5 h-5" />
            {itinerary.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#E0A96D] text-slate-950 font-bold text-[9px] flex items-center justify-center shadow-sm">
                {itinerary.length}
              </span>
            )}
          </div>
          {activeView === 'itinerary' && (
            <span className="w-1 h-1 rounded-full bg-[#E0A96D] mt-1" />
          )}
        </button>

        {/* Chat / Assistant */}
        <button
          onClick={handleOpenChat}
          aria-label="Open In-App Assistant & Agent Desk"
          title="Cayo Travel Assistant & Live Desk"
          className="relative flex flex-col items-center justify-center p-2 rounded-xl text-slate-400 hover:text-[#E0A96D] transition-all duration-200 active:scale-95"
        >
          <div className="p-1.5 rounded-full transition-colors">
            <MessageCircle className="w-5 h-5" />
          </div>
        </button>

        {/* Profile / Account - Pure Icon Indicator, Zero Text */}
        <button
          onClick={() => setIsAuthModalOpen(true)}
          aria-label="Account & Bookings"
          title={currentUser ? (currentUser.displayName || currentUser.email || 'My Account') : 'Sign In / Account'}
          className="relative flex flex-col items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-200 transition-all duration-200 active:scale-95"
        >
          <div className="p-1.5 rounded-full transition-colors relative">
            {currentUser?.photoURL ? (
              <img 
                src={currentUser.photoURL} 
                alt="Profile" 
                className="w-5 h-5 rounded-full object-cover ring-1 ring-[#E0A96D]/70"
                referrerPolicy="no-referrer"
              />
            ) : (
              <User className="w-5 h-5" />
            )}
            {currentUser && (
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-[#0D1117]" />
            )}
          </div>
        </button>

      </div>
    </nav>
  );
};

