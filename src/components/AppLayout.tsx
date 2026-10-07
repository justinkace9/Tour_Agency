import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Navbar } from './Navbar';
import { HighlightBannerSlider } from './HighlightBannerSlider';
import { Hero } from './Hero';
import { HorizontalTours } from './HorizontalTours';
import { TourDetailModal } from './TourDetailModal';
import { ItineraryDrawer } from './ItineraryDrawer';
import { AtlanticBankCheckout } from './AtlanticBankCheckout';
import { BookingVoucher } from './BookingVoucher';
import { CustomItinerary } from './CustomItinerary';
import { FavoritesDrawer } from './FavoritesDrawer';
import { SearchModal } from './SearchModal';
import { AuthModal } from './AuthModal';
import { AdminPortal } from './AdminPortal';
import { BlogSection } from './BlogSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';
import { InstallPWABanner } from './InstallPWABanner';
import { OfflineBanner } from './OfflineBanner';
import { PullToRefresh } from './PullToRefresh';
import { HiddenHoverDock } from './HiddenHoverDock';
import { DualChatModal } from './chat/DualChatModal';
import { GuideProfile } from './GuideProfile';
import { ExpeditionsPage } from './ExpeditionsPage';
import { DevQuickSwitch } from './admin/DevQuickSwitch';
import { ShieldCheck, MapPin, Award, Users, Sparkles } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const { activeView, setActiveView, siteContent } = useApp();

  // Route Gate: Detect /admin URL path or hash (#admin, #/admin)
  useEffect(() => {
    const checkAdminPath = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.startsWith('/admin') || hash === '#admin' || hash === '#/admin') {
        setActiveView('admin');
      }
    };

    checkAdminPath();
    window.addEventListener('popstate', checkAdminPath);
    window.addEventListener('hashchange', checkAdminPath);

    return () => {
      window.removeEventListener('popstate', checkAdminPath);
      window.removeEventListener('hashchange', checkAdminPath);
    };
  }, [setActiveView]);

  // Listen for admin shortcut (Ctrl/Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setActiveView('admin');
        window.history.pushState(null, '', '/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveView]);

  // When activeView is 'admin', render secret portal with NO public navbar or footer links
  if (activeView === 'admin') {
    return <AdminPortal />;
  }

  const handleScrollToTours = () => {
    const element = document.getElementById('tours-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveView('tours');
    }
  };

  return (
    <PullToRefresh>
      <div className="min-h-screen bg-[#0D1117] text-slate-100 flex flex-col selection:bg-[#E0A96D] selection:text-slate-950 pb-20 md:pb-0 relative overflow-x-clip">
        
        {/* Offline Warning Banner for Cayo Backcountry Signal Loss */}
        <OfflineBanner />

        {/* 1. Top Ribbon Banner - In normal document flow at the very top. On scroll it scrolls off and disappears, and only reappears at the top of the page */}
        <div className="w-full relative z-30">
          <HighlightBannerSlider />
        </div>

        {/* 2. Floating Island Navbar - Sticky/fixed floating capsule, dims on scroll, brightens on hover, NO rectangular bar behind it */}
        <Navbar />

        {/* Main View Switcher */}
        <main className="flex-1">
          {activeView === 'home' && (
            <>
              <Hero onExploreClick={handleScrollToTours} />

              {/* Lead Guide Spotlight - Miss Gissell Rodriguez */}
              <GuideProfile />

              {/* Edge-to-Edge Horizontal Expeditions */}
              <HorizontalTours />

              {/* Operator Trust Banner & Accreditations */}
              <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="glass-panel rounded-3xl p-8 border border-white/10 grid grid-cols-1 md:grid-cols-4 gap-6 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F382C] border border-[#E0A96D]/40 flex items-center justify-center text-[#E0A96D] shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">BTB Licensed #2024</h4>
                      <p className="text-xs text-slate-300">Official Belize Tourism Board license</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F382C] border border-[#E0A96D]/40 flex items-center justify-center text-[#E0A96D] shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">San Ignacio Base</h4>
                      <p className="text-xs text-slate-300">Local hub near all western sites</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F382C] border border-[#E0A96D]/40 flex items-center justify-center text-[#E0A96D] shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">Small Group Expeditions</h4>
                      <p className="text-xs text-slate-300">Strict 8:1 guest-to-guide ratio</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F382C] border border-[#E0A96D]/40 flex items-center justify-center text-[#E0A96D] shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">Gear & Shuttles Included</h4>
                      <p className="text-xs text-slate-300">Headlamps, helmets, lunch, vans</p>
                    </div>
                  </div>
                </div>
              </section>

              <BlogSection />
              <ContactSection />
            </>
          )}

          {activeView === 'tours' && (
            <ExpeditionsPage />
          )}

          {activeView === 'guide' && (
            <div className="pt-24 sm:pt-28">
              <GuideProfile />
              <ContactSection />
            </div>
          )}

          {activeView === 'itinerary' && (
            <div className="pt-24 sm:pt-28">
              <CustomItinerary />
            </div>
          )}

          {activeView === 'blog' && (
            <div className="pt-24 sm:pt-28">
              <BlogSection />
            </div>
          )}

          {activeView === 'contact' && (
            <div className="pt-24 sm:pt-28">
              <ContactSection />
            </div>
          )}
        </main>

        {/* Footer (Strictly No /admin link present) */}
        <Footer />

        {/* Bottom-Center Hover Trigger & Hidden Floating Action Dock */}
        <HiddenHoverDock />

        {/* Dual-Mode In-App Chat Modal (AI Assistant + Live Agent) */}
        <DualChatModal />

        {/* 1-Click PWA Install Prompt Banner */}
        <InstallPWABanner />

        {/* Native Mobile Bottom Navigation Dock */}
        <MobileBottomNav />

        {/* Modals & Drawers */}
        <TourDetailModal />
        <ItineraryDrawer />
        <AtlanticBankCheckout />
        <BookingVoucher />
        <FavoritesDrawer />
        <SearchModal />
        <AuthModal />

        {/* Developer Bypass & Admin Portal Quick Switcher */}
        <DevQuickSwitch />

      </div>
    </PullToRefresh>
  );
};

export default AppLayout;

