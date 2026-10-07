import React, { useState } from 'react';
import { Download, X, Smartphone, Share, PlusSquare, ShieldCheck, WifiOff } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

export const InstallPWABanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install, dismiss, showIOSGuide } = usePWA();
  const [showIOSModal, setShowIOSModal] = useState(false);

  // If already installed, don't show the install banner
  if (isInstalled) {
    return null;
  }

  // If on desktop / browser where not installable and not iOS, don't clutter unless installable
  if (!isInstallable && !showIOSGuide) {
    return null;
  }

  return (
    <>
      {/* Floating PWA Install Banner */}
      <aside 
        aria-label="App installation banner"
        className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40 animate-in fade-in slide-in-from-bottom-4 duration-300"
      >
        <div className="glass-panel p-4 rounded-2xl border border-[#E0A96D]/40 bg-[#0D1117]/95 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 text-slate-100 ring-1 ring-white/10">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0F382C] to-[#164e3b] border border-[#E0A96D]/50 flex items-center justify-center text-[#E0A96D] shrink-0 shadow-inner">
              <Smartphone className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#E0A96D] uppercase tracking-wider">PWA Offline Mode</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <h4 className="text-sm font-semibold text-white leading-tight">Install Cayo Eco-Tours App</h4>
              <p className="text-[11px] text-slate-300">Save vouchers & view tours offline deep in Cayo caves</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {isInstallable ? (
              <button
                onClick={install}
                className="px-3.5 py-2 rounded-xl bg-[#E0A96D] hover:bg-[#c99558] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#E0A96D]/20 active:scale-95 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>
            ) : isIOS ? (
              <button
                onClick={() => setShowIOSModal(true)}
                className="px-3.5 py-2 rounded-xl bg-[#E0A96D] hover:bg-[#c99558] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#E0A96D]/20 active:scale-95 transition-all"
              >
                <Share className="w-3.5 h-3.5" />
                <span>Add to Home</span>
              </button>
            ) : null}

            <button
              onClick={dismiss}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Dismiss for this session"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </aside>

      {/* iOS Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0D1117] border border-[#E0A96D]/40 rounded-3xl p-6 max-w-sm w-full text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#0F382C] border border-[#E0A96D]/40 flex items-center justify-center text-[#E0A96D] mb-4">
              <Smartphone className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">Install on iPhone & iPad</h3>
            <p className="text-xs text-slate-300 mb-5">
              Install Cayo Eco-Tours for instant offline access to your tour bookings, vouchers, and itinerary when you have no signal in ATM Cave or Mountain Pine Ridge.
            </p>

            <div className="space-y-3.5 bg-white/5 rounded-2xl p-4 border border-white/5 text-xs text-slate-200">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#E0A96D] text-slate-950 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                <div>
                  Tap the <strong className="text-white">Share</strong> button in Safari's bottom toolbar (<Share className="w-3.5 h-3.5 inline mx-0.5 text-[#E0A96D]" />).
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#E0A96D] text-slate-950 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                <div>
                  Scroll down the options list and tap <strong className="text-white">"Add to Home Screen"</strong> (<PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-[#E0A96D]" />).
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#E0A96D] text-slate-950 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                <div>
                  Tap <strong className="text-white">"Add"</strong> in the top right corner. The app icon will appear on your home screen.
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-[#0F382C] to-[#1a5342] border border-[#E0A96D]/40 text-[#E0A96D] font-bold text-xs hover:bg-[#0F382C] active:scale-95 transition-all"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Also export as InstallPWA for naming variations
export const InstallPWA = InstallPWABanner;
