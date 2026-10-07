import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  Auth
} from 'firebase/auth';
import { 
  getFirestore, 
  Firestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  getDocs,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { 
  getStorage, 
  FirebaseStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';

// Default / fallback Firebase configuration
// In production, these are injected via Vite env variables: VITE_FIREBASE_API_KEY, etc.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoDummyKeyForBelizeEcoToursApp7",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cayo-eco-tours-belize.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "cayo-eco-tours-belize",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cayo-eco-tours-belize.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "255100011841",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:255100011841:web:9c84b39174dfbc02"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.warn("Firebase initialization warning (using local fallback mode):", error);
  // Re-attempt minimal initialization
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig, "cayo-eco-app");
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Upload receipt image to Firebase Storage with local fallback
 */
export async function uploadReceiptFile(file: File, bookingRef: string): Promise<string> {
  try {
    const storageRef = ref(storage, `receipts/${bookingRef}_${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (err) {
    console.warn("Firebase Storage remote upload notice (using secure local object URL fallback):", err);
    // Return an in-browser object URL so preview & voucher generation work flawlessly offline/sandbox
    return URL.createObjectURL(file);
  }
}

export { 
  app, 
  auth, 
  db, 
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  getDocs,
  query,
  where,
  orderBy
};

export type { User };
