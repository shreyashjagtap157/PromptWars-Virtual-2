"use client"
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import { clientAuth } from '@/lib/firebase';
import { useStore } from '@/store/useStore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  getIdToken: async () => null,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { setLogin, setRegion, setLanguage, resetGuideProgress } = useStore();

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(clientAuth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLogin(!!firebaseUser);

      if (firebaseUser) {
        // Pull saved preferences from backend
        try {
          const token = await firebaseUser.getIdToken();
          const res = await fetch('/api/user/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const profile = await res.json();
            if (profile.selectedRegion && profile.selectedRegion !== 'general') {
              setRegion({
                country: profile.selectedRegion,
                state: profile.selectedState || '',
                district: profile.selectedDistrict || '',
              });
            }
            if (profile.preferredLanguage) {
              setLanguage(profile.preferredLanguage);
            }
            // Restore progress
            if (profile.progress && typeof profile.progress === 'object') {
              const store = useStore.getState();
              Object.entries(profile.progress).forEach(([stepId, status]) => {
                store.updateGuideProgress(stepId, status as 'pending' | 'active' | 'completed');
              });
            }
          }
        } catch {
          // Profile doesn't exist yet — that's fine for new users
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setLogin, setRegion, setLanguage, resetGuideProgress]);

  const signIn = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(clientAuth, email, password);
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const cred = await createUserWithEmailAndPassword(clientAuth, email, password);
    // Create profile in backend
    const token = await cred.user.getIdToken();
    await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(clientAuth);
    setLogin(false);
    resetGuideProgress();
  }, [setLogin, resetGuideProgress]);

  const getIdToken = useCallback(async () => {
    if (!user) return null;
    return user.getIdToken();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, getIdToken }}>
      {children}
    </AuthContext.Provider>
  );
}
