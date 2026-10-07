# Cayo Eco-Tours Belize — PWA & Firebase Deployment Guide

This Progressive Web App (PWA) is engineered with offline caching, mobile touch optimizations, and an Atlantic Bank payment reconciliation flow for travelers visiting Cayo District, Belize (ATM Cave, Caracol, Xunantunich, Barton Creek, Mountain Pine Ridge).

---

## 1. Prerequisites
- Node.js v18+ and npm installed
- Firebase CLI installed:
  ```bash
  npm install -g firebase-tools
  ```
- Firebase project created in [Firebase Console](https://console.firebase.google.com/)

---

## 2. Firebase Initialization & Login
1. Authenticate with Google:
   ```bash
   firebase login
   ```
2. Initialize Firebase project (if not already linked):
   ```bash
   firebase use --add <YOUR_FIREBASE_PROJECT_ID>
   ```

---

## 3. Build & Test Locally
Run the production build:
```bash
npm run build
```
Verify the generated assets in `./dist`:
- `dist/index.html`
- `dist/sw.js` (Service Worker)
- `dist/manifest.json` (Web App Manifest)
- `dist/icon-192.png`, `dist/icon-512.png`

Test the production build locally:
```bash
npm run preview
```
Visit `http://localhost:4173` to test:
- Service worker registration
- Offline simulated mode (DevTools -> Application -> Service Workers / Offline)
- PWA install prompt

---

## 4. Deploy to Firebase Hosting
Deploy both Firestore security rules and Hosting assets:
```bash
firebase deploy --only hosting
```
Or deploy all services (Firestore + Storage + Hosting):
```bash
firebase deploy
```

---

## 5. Seed Regional Database (Tours & Travel Guides)
To seed initial tours in Belize Dollars (BZD $1 USD = $2 BZD) and authentic San Ignacio travel guides into Firestore:
```bash
node seedDatabase.js
```
*Tip: Ensure `VITE_FIREBASE_API_KEY` and `VITE_FIREBASE_PROJECT_ID` are set in `.env`, or execute after initializing your Firebase admin credentials.*

---

## 6. PWA Verification in Production
1. **Lighthouse Audit**:
   - Open Chrome DevTools -> **Lighthouse** tab.
   - Run audit for **Progressive Web App** & **Performance**.
   - Verify `Installable` badge and `PWA optimized` checks pass.
2. **Mobile Device Testing**:
   - Open the deployed HTTPS URL on iOS Safari: tap **Share** -> **Add to Home Screen**.
   - Open on Android Chrome: tap the in-app **"Install"** button or Chrome menu -> **Install app**.
   - Put phone in Airplane Mode and launch app from home screen to confirm offline access to saved vouchers and itineraries.
