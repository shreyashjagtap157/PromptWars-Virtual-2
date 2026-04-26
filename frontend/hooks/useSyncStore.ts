"use client"
import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Syncs Zustand store changes to the backend when the user is authenticated.
 * Debounces writes to avoid excessive API calls.
 */
export function useSyncStore() {
  const { user, getIdToken } = useAuth();
  const { region, language, guideProgress } = useStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const initialLoadDone = useRef(false);

  // Skip the first render (initial state load triggers change events)
  useEffect(() => {
    const timeout = setTimeout(() => {
      initialLoadDone.current = true;
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  // Sync progress changes
  useEffect(() => {
    if (!user || !initialLoadDone.current) return;
    if (Object.keys(guideProgress).length === 0) return;

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
      } catch {
        // Silently fail — offline resilience
      }
    }, 500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [guideProgress, user, getIdToken]);

  // Sync preferences changes (region, language)
  useEffect(() => {
    if (!user || !initialLoadDone.current) return;

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
      } catch {
        // Silently fail
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [region, language, user, getIdToken]);
}
