import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);

// Proactively clear any stale service workers or cached scripts to ensure live updates are immediate
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      // Unregister stale service workers that may be caching old code
      registration.unregister();
    }
  });

  if ('caches' in window) {
    caches.keys().then((names) => {
      for (const name of names) {
        if (!name.includes('cayo-v4')) {
          caches.delete(name);
        }
      }
    });
  }
}
