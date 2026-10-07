/**
 * Service Worker - Cayo Eco-Tours Belize
 * Network-First strategy ensures users always get fresh code updates immediately,
 * falling back to cache only when truly offline in the Cayo jungle backcountry.
 */

const CACHE_VERSION = 'cayo-v4-network-first';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (!key.startsWith(CACHE_VERSION)) {
            console.log('[SW] Clearing stale cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Network-First for ALL navigation, scripts, and stylesheets so live code updates are instant
  if (
    request.mode === 'navigate' ||
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'document'
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          return caches.match('/index.html');
        })
    );
    return;
  }

  // Stale-while-revalidate for images & media
  if (
    request.destination === 'image' ||
    url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|avif)$/i)
  ) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const fetchPromise = fetch(request).then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            cache.put(request, networkRes.clone());
          }
          return networkRes;
        }).catch(() => null);

        return cached || fetchPromise;
      })
    );
    return;
  }

  // Network-First default
  event.respondWith(
    fetch(request)
      .then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const clone = networkRes.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
        }
        return networkRes;
      })
      .catch(() => caches.match(request))
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
