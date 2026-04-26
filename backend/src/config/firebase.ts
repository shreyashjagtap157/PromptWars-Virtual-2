import * as admin from 'firebase-admin';

try {
  // Utilizing default configuration; expects GOOGLE_APPLICATION_CREDENTIALS to be set in environment
  const projectId = process.env.FIREBASE_PROJECT_ID || 'gen-lang-client-0949773976';
  admin.initializeApp({
    projectId: projectId,
    credential: admin.credential.applicationDefault()
  });
  console.log(`Firebase Admin initialized for project: ${projectId}`);
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
}

export const db = admin.firestore();
export const auth = admin.auth();
