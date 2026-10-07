import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, CheckCircle2 } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

export const OfflineBanner: React.FC = () => {
  const { isOnline } = usePWA();
  const [showReconnected, setShowReconnected] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
    } else if (wasOffline) {
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
        setWasOffline(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (showReconnected) {
    return (
      <div 
        role="status" 
        className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-emerald-600/95 text-white px-4 py-2 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-semibold border border-emerald-400/40 animate-in fade-in slide-in-from-top-2 duration-300"
      >
        <Wifi className="w-3.5 h-3.5 text-emerald-200" />
        <span>Connected — Online Mode Restored</span>
      </div>
    );
  }

  if (isOnline) {
    return null;
  }

  return (
    <div 
      role="status" 
      className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-amber-600/95 text-white px-4 py-2 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs font-semibold border border-amber-400/40 animate-in fade-in slide-in-from-top-2 duration-300"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-200"></span>
      </span>
      <WifiOff className="w-3.5 h-3.5 text-amber-200" />
      <span>Operating in Offline Mode — Saved itineraries available</span>
    </div>
  );
};
