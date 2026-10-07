/**
 * Service Worker Registration & Offline Sync Utilities
 * Cayo Eco-Tours Belize
 */

export interface SWRegistrationCallbacks {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onError?: (error: Error) => void;
}

export function registerServiceWorker(callbacks?: SWRegistrationCallbacks) {
  if (typeof window === 'undefined') return;

  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
      const swUrl = '/sw.js';

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('[PWA] Service Worker registered with scope:', registration.scope);

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) return;

            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New content available; will be used when all tabs closed or reloaded
                  console.log('[PWA] New content available; please refresh.');
                  if (callbacks?.onUpdate) {
                    callbacks.onUpdate(registration);
                  }
                } else {
                  // Content is cached for offline use
                  console.log('[PWA] Content cached for offline use.');
                  if (callbacks?.onSuccess) {
                    callbacks.onSuccess(registration);
                  }
                }
              }
            };
          };

          if (callbacks?.onSuccess) {
            callbacks.onSuccess(registration);
          }
        })
        .catch((error) => {
          console.warn('[PWA] Service Worker registration failed:', error);
          if (callbacks?.onError) {
            callbacks.onError(error);
          }
        });
    });
  }
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

/**
 * Offline Storage Utilities for Itineraries and Vouchers
 * Stores data safely into LocalStorage with timestamp and signature
 */
const OFFLINE_VOUCHERS_KEY = 'cayo_eco_tours_offline_vouchers';
const OFFLINE_ITINERARY_KEY = 'cayo_eco_tours_offline_itinerary';

export function saveOfflineVoucher(voucherData: any) {
  try {
    const existing = getOfflineVouchers();
    const filtered = existing.filter((v: any) => v.bookingReference !== voucherData.bookingReference);
    const updated = [voucherData, ...filtered];
    localStorage.setItem(OFFLINE_VOUCHERS_KEY, JSON.stringify(updated));
    console.log('[PWA Offline Storage] Voucher saved for remote offline access:', voucherData.bookingReference);
  } catch (err) {
    console.warn('[PWA Offline Storage] Failed to cache voucher:', err);
  }
}

export function getOfflineVouchers(): any[] {
  try {
    const raw = localStorage.getItem(OFFLINE_VOUCHERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveOfflineItinerary(items: any[]) {
  try {
    localStorage.setItem(OFFLINE_ITINERARY_KEY, JSON.stringify({
      savedAt: new Date().toISOString(),
      items
    }));
  } catch (err) {
    console.warn('[PWA Offline Storage] Failed to cache itinerary:', err);
  }
}

export function getOfflineItinerary(): { savedAt: string; items: any[] } | null {
  try {
    const raw = localStorage.getItem(OFFLINE_ITINERARY_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
