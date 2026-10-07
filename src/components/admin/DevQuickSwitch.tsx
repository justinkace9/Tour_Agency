import React, { useState } from 'react';
import { Shield, Sparkles, LogIn, ExternalLink, X, ChevronUp, Lock, RefreshCw, KeyRound, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DevQuickSwitch: React.FC = () => {
  const { adminAuthenticated, setAdminAuthenticated, activeView, setActiveView } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [justBypassed, setJustBypassed] = useState(false);

  const handleBypassLogin = () => {
    // Authenticate with ToursAdmin1 privileges instantly
    setAdminAuthenticated(true);
    setActiveView('admin');
    window.history.pushState(null, '', '/admin');
    setJustBypassed(true);
    setTimeout(() => setJustBypassed(false), 2500);
  };

  const handleReturnToPublic = () => {
    setActiveView('home');
    window.history.pushState(null, '', '/');
  };

  const handleLockPortal = () => {
    setAdminAuthenticated(false);
    setActiveView('home');
    window.history.pushState(null, '', '/');
  };

  return (
    <aside 
      aria-label="Developer Tools Quick Switch"
      className="fixed bottom-4 right-4 z-50 select-none print:hidden"
    >
      {/* Expanded Quick Switch Card */}
      {isOpen ? (
        <div className="w-80 rounded-2xl bg-[#0D1117]/95 border border-[#E0A96D]/40 backdrop-blur-xl p-4 shadow-2xl text-slate-200 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs font-bold text-white tracking-wide">
                Dev Tools / Admin Quick Switch
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* Status indicator */}
            <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between">
              <span className="text-slate-400">Current View:</span>
              <span className="font-mono font-bold text-[#E0A96D] uppercase">
                {activeView === 'admin' ? 'Admin Portal' : 'Public Traveler'}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between">
              <span className="text-slate-400">Session Status:</span>
              <span className={`font-semibold flex items-center gap-1.5 ${
                adminAuthenticated ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {adminAuthenticated ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>ToursAdmin1 Cleared</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Locked</span>
                  </>
                )}
              </span>
            </div>

            {/* Production Credentials Reference */}
            <div className="p-2.5 rounded-xl bg-[#0F382C]/40 border border-[#0F382C] text-[11px] space-y-1">
              <div className="text-[10px] uppercase font-bold text-[#E0A96D] flex items-center gap-1">
                <KeyRound className="w-3 h-3" />
                <span>Production Security Gate:</span>
              </div>
              <div className="text-slate-300 font-mono">User: <strong className="text-white">ToursAdmin1</strong></div>
              <div className="text-slate-300 font-mono">Pass: <strong className="text-white">Rodge.007</strong></div>
              <div className="text-slate-300 font-mono">Code: <strong className="text-white">7619</strong></div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleBypassLogin}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 border border-emerald-400/50 text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#E0A96D]" />
                <span>Bypass Login (Dev Mode)</span>
              </button>

              {activeView === 'admin' ? (
                <button
                  onClick={handleReturnToPublic}
                  className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center justify-center gap-2 transition-colors border border-white/10"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Switch to Traveler View</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setActiveView('admin');
                    window.history.pushState(null, '', '/admin');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center justify-center gap-2 transition-colors border border-white/10"
                >
                  <Shield className="w-3.5 h-3.5 text-[#E0A96D]" />
                  <span>Go to /admin Route</span>
                </button>
              )}

              {adminAuthenticated && (
                <button
                  onClick={handleLockPortal}
                  className="w-full py-1.5 px-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 text-[11px] flex items-center justify-center gap-1.5 border border-rose-900/40"
                >
                  <Lock className="w-3 h-3" />
                  <span>Lock Admin Session</span>
                </button>
              )}
            </div>

            {justBypassed && (
              <p className="text-center text-[10px] text-emerald-400 font-semibold animate-pulse">
                ✓ Auto-authenticated with ToursAdmin1 clearance!
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Subtle Floating Dev Button */
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D1117]/90 hover:bg-[#0F382C] border border-[#E0A96D]/50 text-slate-300 hover:text-white text-xs font-mono shadow-xl backdrop-blur-md transition-all hover:scale-105"
          title="Dev Tools / Admin Portal Quick Switch"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-semibold text-[#E0A96D]">Dev Tools</span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">| Admin Quick-Switch</span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform" />
        </button>
      )}
    </aside>
  );
};
