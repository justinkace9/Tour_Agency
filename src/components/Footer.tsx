import React from 'react';
import { Compass, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SocialLink {
  name: string;
  shortName: string;
  label: string;
  handle: string;
  url: string;
  hoverColor: string;
  icon: (className?: string) => React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Facebook',
    shortName: 'FB',
    label: 'Visit Cayo Eco-Tours on Facebook',
    handle: '@cayoecotours',
    url: 'https://facebook.com',
    hoverColor: 'hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10',
    icon: (className = 'w-3.5 h-3.5') => (
      <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    shortName: 'Insta',
    label: 'Follow our expeditions on Instagram',
    handle: '@cayoecotours.belize',
    url: 'https://instagram.com',
    hoverColor: 'hover:text-[#E4405F] hover:border-[#E4405F]/40 hover:bg-[#E4405F]/10',
    icon: (className = 'w-3.5 h-3.5') => (
      <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    shortName: 'Tik Tok',
    label: 'Watch Belize cave & jungle clips on TikTok',
    handle: '@cayoecotours',
    url: 'https://tiktok.com',
    hoverColor: 'hover:text-[#25F4EE] hover:border-[#25F4EE]/40 hover:bg-[#25F4EE]/10',
    icon: (className = 'w-3.5 h-3.5') => (
      <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.34 6.34 0 0 0 1.96-4.52V8.92a8.28 8.28 0 0 0 4.81 1.52v-3.75a4.85 4.85 0 0 1-1-.0z"/>
      </svg>
    ),
  },
  {
    name: 'TripAdvisor',
    shortName: 'Trip Advisor',
    label: 'Read 5-star traveler reviews on TripAdvisor',
    handle: 'Cayo Eco-Tours San Ignacio',
    url: 'https://tripadvisor.com',
    hoverColor: 'hover:text-[#00AA6C] hover:border-[#00AA6C]/40 hover:bg-[#00AA6C]/10',
    icon: (className = 'w-3.5 h-3.5') => (
      <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
        <path d="M12 4.5a3.5 3.5 0 0 0-3.1 1.9 6.8 6.8 0 0 0-4.9 2.2A6.8 6.8 0 0 0 7.2 20c2.4 0 4.4-1.3 5.4-3.2 1 1.9 3 3.2 5.4 3.2a6.8 6.8 0 0 0 3.2-11.4 6.8 6.8 0 0 0-4.9-2.2A3.5 3.5 0 0 0 12 4.5zm-4.8 13a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm9.6 0a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm-9.6-6.3a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2zm9.6 0a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2zm-4.8-2.6a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2z"/>
      </svg>
    ),
  },
  {
    name: 'X',
    shortName: 'X',
    label: 'Follow real-time expedition updates on X',
    handle: '@cayoecotours',
    url: 'https://x.com',
    hoverColor: 'hover:text-white hover:border-white/50 hover:bg-white/10',
    icon: (className = 'w-3.5 h-3.5') => (
      <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    shortName: 'YouTube',
    label: 'Watch ATM Cave documentary footage on YouTube',
    handle: 'Cayo Eco-Tours Belize',
    url: 'https://youtube.com',
    hoverColor: 'hover:text-[#FF0000] hover:border-[#FF0000]/40 hover:bg-[#FF0000]/10',
    icon: (className = 'w-3.5 h-3.5') => (
      <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    shortName: 'Email',
    label: 'Email Cayo Eco-Tours direct expeditions desk',
    handle: 'expeditions@cayoecotoursbelize.com',
    url: 'mailto:expeditions@cayoecotoursbelize.com',
    hoverColor: 'hover:text-[#E0A96D] hover:border-[#E0A96D]/40 hover:bg-[#E0A96D]/10',
    icon: (className = 'w-3.5 h-3.5') => (
      <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
  },
];

export const Footer: React.FC = () => {
  const { setActiveView, setAdminAuthenticated, siteContent } = useApp();

  const handleDevBypass = () => {
    setAdminAuthenticated(true);
    setActiveView('admin');
    window.history.pushState(null, '', '/admin');
  };

  return (
    <footer className="border-t border-[#0F382C]/60 bg-[#090C10] pt-16 pb-24 md:pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/5">
          
          {/* Brand info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#0F382C] border border-[#E0A96D]/40 flex items-center justify-center text-[#E0A96D]">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                {siteContent.businessName}
              </span>
            </div>

            <p className="text-xs text-slate-300 max-w-md leading-relaxed mb-4">
              Licensed adventure tour operator situated in San Ignacio Town, Cayo District, Belize. Dedicated to ethical eco-tourism, Maya cultural heritage conservation, and certified subterranean speleology leadership.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#E0A96D] mb-5">
              <ShieldCheck className="w-4 h-4" />
              <span>Belize Tourism Board Licensed Operator #{siteContent.btbLicense}</span>
            </div>

            {/* Social Media Buttons - Neat, small, and refined */}
            <div className="pt-3 border-t border-white/5">
              <div className="flex items-center justify-between max-w-md mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Connect & Follow
                </span>
                <span className="text-[10px] text-[#E0A96D]/80">
                  Daily Belize Expeditions
                </span>
              </div>
              
              <div 
                className="flex items-center gap-2 flex-wrap" 
                role="list" 
                aria-label="Social Media Channels"
              >
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={`${item.shortName} • ${item.handle}`}
                    className={`group relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/10 text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${item.hoverColor}`}
                  >
                    {item.icon()}
                    
                    {/* Micro hover tooltip */}
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#0D1117] text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border border-white/10 z-20">
                      {item.shortName}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white mb-3">
              Expeditions
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => setActiveView('tours')} className="hover:text-[#E0A96D] transition-colors cursor-pointer">
                  ATM Cave Sacred Expedition
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('tours')} className="hover:text-[#E0A96D] transition-colors cursor-pointer">
                  Xunantunich & Cave Tubing
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('tours')} className="hover:text-[#E0A96D] transition-colors cursor-pointer">
                  Caracol Maya Ruins & Big Rock
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('tours')} className="hover:text-[#E0A96D] transition-colors cursor-pointer">
                  Barton Creek Cave Canoeing
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold text-sm text-white mb-3">
              Information
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => setActiveView('itinerary')} className="hover:text-[#E0A96D] transition-colors cursor-pointer">
                  Custom Itinerary Planner
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('blog')} className="hover:text-[#E0A96D] transition-colors cursor-pointer">
                  Cayo Spelunking Guide
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('contact')} className="hover:text-[#E0A96D] transition-colors cursor-pointer">
                  Hotel Shuttles & Contact
                </button>
              </li>
              <li className="text-slate-500 text-[11px] pt-1">
                Emergency Hotline: +501 610-8687
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-[11px] gap-4">
          <p>© {new Date().getFullYear()} Cayo Eco-Tours Belize Ltd. All Rights Reserved. San Ignacio Town, Cayo, Belize.</p>

          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            <span>Tapir Mountain Reserve Partner</span>
            <span>·</span>
            <span>NICH Certified Archaeologist Escorts</span>
            <span>·</span>
            <button
              onClick={handleDevBypass}
              className="hover:text-[#E0A96D] transition-colors flex items-center gap-1.5 font-mono text-[10px] text-slate-500 hover:text-slate-300"
              title="Developer Access: Bypass login as ToursAdmin1 and open Admin Portal"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dev Tools / Admin Portal Quick Switch</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

