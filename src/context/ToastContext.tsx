import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  X, 
  UploadCloud, 
  Heart, 
  ShieldCheck, 
  Wifi, 
  WifiOff 
} from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
  notifyReceiptUpload: (bookingRef: string) => void;
  notifyFavorite: (tourTitle: string, isFav: boolean) => void;
  notifyBookingStatusChange: (bookingRef: string, status: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastItem = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    const duration = toast.duration || 4500;
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const notifyReceiptUpload = (bookingRef: string) => {
    showToast({
      type: 'success',
      title: 'Atlantic Bank Receipt Uploaded',
      message: `Receipt for ${bookingRef} has been securely transmitted to San Ignacio Dispatch for verification.`,
      duration: 5000
    });
  };

  const notifyFavorite = (tourTitle: string, isFav: boolean) => {
    showToast({
      type: 'info',
      title: isFav ? 'Added to Saved Adventures' : 'Removed from Saved',
      message: tourTitle,
      duration: 2500
    });
  };

  const notifyBookingStatusChange = (bookingRef: string, status: string) => {
    showToast({
      type: status === 'verified' ? 'success' : status === 'rejected' ? 'error' : 'info',
      title: `Booking ${bookingRef} Updated`,
      message: `Reservation status is now: ${status.replace('_', ' ').toUpperCase()}`,
      duration: 5000
    });
  };

  // Connection status changes
  useEffect(() => {
    const handleOnline = () => {
      showToast({
        type: 'success',
        title: 'Connection Restored',
        message: 'Reconnected with San Ignacio Tour Dispatch. Live data synced.',
        duration: 3500
      });
    };

    const handleOffline = () => {
      showToast({
        type: 'warning',
        title: 'Operating in Jungle Offline Mode',
        message: 'Saved itineraries, vouchers, and emergency maps remain available.',
        duration: 5000
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ToastContext.Provider value={{
      toasts,
      showToast,
      removeToast,
      notifyReceiptUpload,
      notifyFavorite,
      notifyBookingStatusChange
    }}>
      {children}

      {/* Global Toast Container */}
      <div 
        aria-live="polite" 
        className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((toast) => {
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto p-3.5 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-start gap-3 text-xs transition-all animate-in slide-in-from-top-3 fade-in duration-200 ${
                toast.type === 'success'
                  ? 'bg-[#0F382C]/95 border-emerald-500/50 text-white ring-1 ring-emerald-400/20'
                  : toast.type === 'error'
                  ? 'bg-rose-950/95 border-rose-500/50 text-white ring-1 ring-rose-400/20'
                  : toast.type === 'warning'
                  ? 'bg-amber-950/95 border-amber-500/50 text-amber-100 ring-1 ring-amber-400/20'
                  : 'bg-[#0D1117]/95 border-[#E0A96D]/50 text-slate-100 ring-1 ring-[#E0A96D]/20'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
                {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400" />}
                {toast.type === 'info' && <Info className="w-4 h-4 text-[#E0A96D]" />}
              </div>

              <div className="flex-1 min-w-0">
                <h5 className="font-bold leading-tight">{toast.title}</h5>
                <p className="text-[11px] opacity-90 mt-0.5 leading-snug">{toast.message}</p>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 shrink-0 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
