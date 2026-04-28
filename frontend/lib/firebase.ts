import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let clientAuth: Auth;
let db: Firestore;

const isConfigValid = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== 'REPLACE_WITH_YOUR_WEB_API_KEY';

if (typeof window !== 'undefined' && !isConfigValid) {
  console.warn('🔴 Firebase API Key is missing or default. Authentication will not work.');
  console.warn('Please update NEXT_PUBLIC_FIREBASE_API_KEY in frontend/.env.local');
}

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  clientAuth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error('Firebase initialization failed:', error);
  // Fallback to avoid breaking the layout build, though runtime auth will fail
  app = {} as FirebaseApp;
  clientAuth = {} as Auth;
  db = {} as Firestore;
}

export { clientAuth, db };