// Service Worker registration script for Cayo Eco-Tours Belize
if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(reg) {
        console.log('[PWA] ServiceWorker registration successful with scope:', reg.scope);
      })
      .catch(function(err) {
        console.warn('[PWA] ServiceWorker registration failed:', err);
      });
  });
}
