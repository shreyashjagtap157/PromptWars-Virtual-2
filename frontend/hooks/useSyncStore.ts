"use client"
import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { useAuth } from '@/contexts/AuthContext';

function createProgressSignature(progress: Record<string, 'pending' | 'active' | 'completed'>): string {
  return Object.keys(progress)
    .sort()
    .map((stepId) => `${stepId}:${progress[stepId]}`)
    .join('|');
}

function createPreferencesSignature(
  currentRegion: { country: string; state: string; district: string } | null,
  currentLanguage: string
): string {
  return `${currentRegion?.country || ''}|${currentRegion?.state || ''}|${currentRegion?.district || ''}|${currentLanguage}`;
}

/**
 * Syncs Zustand store changes to the backend when the user is authenticated.
 * Debounces writes to avoid excessive API calls.
 */
export function useSyncStore() {
  const { user, getIdToken } = useAuth();
  const region = useStore((state) => state.region);
  const language = useStore((state) => state.language);
  const guideProgress = useStore((state) => state.guideProgress);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const latestStateRef = useRef({ region, language, guideProgress });
  const lastProgressSignatureRef = useRef<string>('');
  const lastPreferencesSignatureRef = useRef<string>('');
  const initialLoadDone = useRef(false);
  const isAuthenticated = Boolean(user && user.email !== 'Guest');

  useEffect(() => {
    latestStateRef.current = { region, language, guideProgress };
  }, [region, language, guideProgress]);

  // Skip the first render (initial state load triggers change events)
  useEffect(() => {
    if (!isAuthenticated) {
      initialLoadDone.current = false;
      lastProgressSignatureRef.current = '';
      lastPreferencesSignatureRef.current = '';
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const timeout = setTimeout(() => {
      initialLoadDone.current = true;
      const snapshot = latestStateRef.current;
      lastProgressSignatureRef.current = createProgressSignature(snapshot.guideProgress);
      lastPreferencesSignatureRef.current = createPreferencesSignature(snapshot.region, snapshot.language);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isAuthenticated]);

  // Sync progress changes
  useEffect(() => {
    if (!isAuthenticated || !initialLoadDone.current) return;
    if (Object.keys(guideProgress).length === 0) return;

    const progressSignature = createProgressSignature(guideProgress);
    if (progressSignature === lastProgressSignatureRef.current) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      try {
        const token = await getIdToken();
        if (!token) return;
        await fetch('/api/user/progress', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ progress: guideProgress }),
        });
        lastProgressSignatureRef.current = progressSignature;
      } catch {
        // Silently fail — offline resilience
      }
    }, 500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [guideProgress, isAuthenticated, getIdToken]);

  // Sync preferences changes (region, language)
  useEffect(() => {
    if (!isAuthenticated || !initialLoadDone.current) return;

    const preferencesSignature = createPreferencesSignature(region, language);
    if (preferencesSignature === lastPreferencesSignatureRef.current) return;

    const timeout = setTimeout(async () => {
      try {
        const token = await getIdToken();
        if (!token) return;
        await fetch('/api/user/preferences', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            selectedRegion: region?.country || 'general',
            selectedState: region?.state || '',
            selectedDistrict: region?.district || '',
            preferredLanguage: language,
          }),
        });
        lastPreferencesSignatureRef.current = preferencesSignature;
      } catch {
        // Silently fail
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [region, language, isAuthenticated, getIdToken]);
}
