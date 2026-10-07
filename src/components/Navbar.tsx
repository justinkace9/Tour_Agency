import React, { useState, useEffect } from 'react';
import { Compass, Search, Heart, MessageCircle, User, Calendar, Menu, X, BookOpen, PhoneCall } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    favorites, 
    itinerary, 
    activeView, 
    setActiveView, 
    setIsSearchOpen, 
    setIsAuthModalOpen, 
    setIsItineraryOpen, 
    setIsFavoritesOpen,
    siteContent
  } = useApp();

  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasTopBanner, setHasTopBanner] = useState(false);

  // Monitor scroll for dimming and stickiness
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect whether top ribbon banner is currently active and rendered above
  useEffect(() => {
    const checkBanner = () => {
      const bannerEl = document.getElementById('top-highlight-ribbon');
      setHasTopBanner(!!bannerEl && bannerEl.offsetHeight > 0);
    };
    checkBanner();
    const observer = new MutationObserver(checkBanner);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [siteContent.bannerAnnouncement.enabled]);

  const isScrolled = scrollY > 20;

  const openWhatsApp = () => {
    const cleanPhone = (siteContent.whatsapp || '5016108687').replace(/[^0-9]/g, '');
    const text = encodeURIComponent("Hello! I am planning an expedition to San Ignacio, Cayo and would like more details.");
    window.open(`https://wa.me/${cleanPhone || '5016108687'}?text=${text}`, '_blank');
  };

  const guide = siteContent.guideProfile;

  // Clean title: "Cayo Eco-Tours" without redundant "Belize"
  const rawName = siteContent.businessName || 'Cayo Eco-Tours';
  const cleanBusinessName = rawName.replace(/\s+Belize$/i, '').trim();

  // Dynamic top offset: when at top with active ribbon banner, sit lower (~3.5rem / 56px).
  // When scrolled down, glide to top-3 (0.75rem / 12px) sticky.
  const topOffset = (!isScrolled && hasTopBanner) ? '3.5rem' : '0.75rem';

  return (
    <div 
      className="fixed left-0 right-0 z-40 pointer-events-none px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300"
      style={{ top: topOffset }}
    >
      {/* Floating Island Navbar Capsule - Self-contained rounded background, NO full-width rectangle bar */}
      <div 
        className={`pointer-events-auto rounded-full transition-all duration-300 shadow-2xl flex items-center justify-between gap-2 sm:gap-4 ${
          isScrolled 
            ? 'bg-[#090D12]/75 opacity-70 hover:opacity-100 backdrop-blur-md hover:backdrop-blur-2xl border border-white/10 hover:border-[#E0A96D]/40 shadow-black/90 py-2 sm:py-2.5 px-3.5 sm:px-6' 
            : 'bg-[#0D1117]/90 opacity-100 hover:opacity-100 backdrop-blur-xl border border-white/15 hover:border-[#E0A96D]/40 shadow-black/70 py-2.5 sm:py-3 px-4 sm:px-6'
        }`}
      >
        
        {/* 1. Left: App Name & Compass Icon (Strictly "Cayo Eco-Tours" + small "Belize" pill) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button 
            onClick={() => setActiveView('home')} 
            className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none cursor-pointer"
            aria-label="Cayo Eco-Tours Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0F382C] border border-[#E0A96D]/60 flex items-center justify-center text-[#E0A96D] shadow-md group-hover:scale-105 group-hover:border-[#E0A96D] transition-all shrink-0">
              <Compass className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#E0A96D]" />
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-display font-bold text-sm sm:text-base lg:text-lg tracking-tight text-white group-hover:text-[#E0A96D] transition-colors whitespace-nowrap">
                {cleanBusinessName}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#E0A96D] bg-[#0F382C] border border-[#E0A96D]/40 px-1.5 py-0.5 rounded-full font-bold shadow-xs">
                Belize
              </span>
            </div>
          </button>
        </div>

        {/* 2. Center: Navigation Options Centered */}
        <div className="hidden lg:flex items-center justify-center flex-1 px-2">
          <nav className="flex items-center gap-1 xl:gap-1.5 px-2.5 py-1 rounded-full bg-black/45 border border-white/10 backdrop-blur-md shadow-inner">
            <button 
              onClick={() => setActiveView('home')} 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeView === 'home' 
                  ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Home</span>
            </button>

            <button 
              onClick={() => setActiveView('tours')} 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeView === 'tours' 
                  ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#E0A96D]" />
              <span>Expeditions</span>
            </button>

            <button 
              onClick={() => setActiveView('guide')} 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeView === 'guide' 
                  ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm font-semibold ring-1 ring-[#E0A96D]/50' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="relative w-5 h-5 rounded-full overflow-hidden border border-[#E0A96D]/70 shrink-0">
                <img 
                  src={guide.photoUrl} 
                  alt={guide.name}
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    (e.target as any).src = '/src/assets/images/guide_gissell_rodriguez_1791165132468.jpg';
                  }}
                />
                <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-black" />
              </div>
              <span>Lead Guide Gissell</span>
            </button>

            <button 
              onClick={() => setActiveView('blog')} 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeView === 'blog' 
                  ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#E0A96D]" />
              <span>Field Guide</span>
            </button>

            <button 
              onClick={() => setActiveView('contact')} 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeView === 'contact' 
                  ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#E0A96D]" />
              <span>Contact</span>
            </button>
          </nav>
        </div>

        {/* 3. Far Right: Search, Calendar, Heart, Message, Profile Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Quick Search */}
          <button 
            onClick={() => setIsSearchOpen(true)} 
            aria-label="Search expeditions"
            title="Search tours & guides"
            className="p-2 sm:p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          {/* Custom Trip Builder / Calendar Drawer */}
          <button 
            onClick={() => setIsItineraryOpen(true)} 
            aria-label="Trip Builder & Itinerary Drawer"
            title="Custom Itinerary Cart"
            className="relative p-2 sm:p-2.5 rounded-full text-slate-300 hover:text-[#E0A96D] hover:bg-white/10 border border-transparent hover:border-white/10 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {itinerary.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E0A96D] text-slate-900 font-bold text-[10px] flex items-center justify-center shadow-md">
                {itinerary.length}
              </span>
            )}
          </button>

          {/* Favorites Badge */}
          <button 
            onClick={() => setIsFavoritesOpen(true)} 
            aria-label="View saved expeditions"
            title="Saved Expeditions"
            className="relative p-2 sm:p-2.5 rounded-full text-slate-300 hover:text-[#E0A96D] hover:bg-white/10 border border-transparent hover:border-white/10 transition-all cursor-pointer"
          >
            <Heart className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${favorites.length > 0 ? 'fill-[#E0A96D] text-[#E0A96D]' : ''}`} />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E0A96D] text-slate-900 font-bold text-[10px] flex items-center justify-center shadow-md">
                {favorites.length}
              </span>
            )}
          </button>

          {/* WhatsApp Quick Message */}
          <button 
            onClick={openWhatsApp}
            aria-label="WhatsApp quick inquiry"
            title={`Chat on WhatsApp (${siteContent.whatsapp || '+501 610-8687'})`}
            className="p-2 sm:p-2.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          {/* User Profile / Auth */}
          <button 
            onClick={() => setIsAuthModalOpen(true)} 
            aria-label="Account & Bookings"
            title={currentUser ? (currentUser.displayName || currentUser.email || 'My Account') : 'Sign In / Account'}
            className="relative p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#E0A96D]/60 text-slate-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            {currentUser?.photoURL ? (
              <img 
                src={currentUser.photoURL} 
                alt="Avatar" 
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full object-cover ring-1 ring-[#E0A96D]/60" 
                referrerPolicy="no-referrer"
              />
            ) : (
              <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-200" />
            )}
            {currentUser && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0D1117]" />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>

      </div>

      {/* Mobile Dropdown Menu (Floating Glass Card) */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden mt-2 p-4 rounded-3xl bg-[#0D1117]/98 border border-white/15 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1 text-sm font-medium text-slate-200">
            <button 
              onClick={() => { setActiveView('home'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left cursor-pointer ${
                activeView === 'home' ? 'bg-[#0F382C] text-[#E0A96D] font-bold' : 'hover:bg-white/5'
              }`}
            >
              <span>Home</span>
            </button>

            <button 
              onClick={() => { setActiveView('tours'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left cursor-pointer ${
                activeView === 'tours' ? 'bg-[#0F382C] text-[#E0A96D] font-bold' : 'hover:bg-white/5'
              }`}
            >
              <Compass className="w-4 h-4 text-[#E0A96D]" />
              <span>Expeditions</span>
            </button>

            <button 
              onClick={() => { setActiveView('guide'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left cursor-pointer ${
                activeView === 'guide' ? 'bg-[#0F382C] text-[#E0A96D] font-bold' : 'hover:bg-white/5'
              }`}
            >
              <div className="w-5 h-5 rounded-full overflow-hidden border border-[#E0A96D]">
                <img 
                  src={guide.photoUrl} 
                  alt={guide.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <span>Lead Guide Miss Gissell</span>
            </button>

            <button 
              onClick={() => { setActiveView('blog'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left cursor-pointer ${
                activeView === 'blog' ? 'bg-[#0F382C] text-[#E0A96D] font-bold' : 'hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#E0A96D]" />
              <span>Cayo Field Guide</span>
            </button>

            <button 
              onClick={() => { setActiveView('contact'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left cursor-pointer ${
                activeView === 'contact' ? 'bg-[#0F382C] text-[#E0A96D] font-bold' : 'hover:bg-white/5'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-[#E0A96D]" />
              <span>Hotel Shuttles & Contact</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};
