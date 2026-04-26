import * as admin from 'firebase-admin';

try {
  // Utilizing default configuration; expects GOOGLE_APPLICATION_CREDENTIALS to be set in environment
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || 'civicguide-demo'
  });
  console.log('Firebase Admin initialized');
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
}

export const db = admin.firestore();
export const auth = admin.auth();
