import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Region = {
  country: string;
  state: string;
  district: string;
};

export type Activity = {
  id: string;
  type: 'complete' | 'undo' | 'system';
  message: string;
  stepId?: string;
  timestamp: number;
};

interface AppState {
  isLoggedIn: boolean; // Kept for interface compatibility but unused
  region: Region | null;
  language: string;
  theme: 'dark' | 'light' | 'system';
  guideProgress: Record<string, 'pending' | 'active' | 'completed'>;
  activityLog: Activity[];

  setLogin: (status: boolean) => void;
  setRegion: (region: Region | null) => void;
  setLanguage: (lang: string) => void;
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
  updateGuideProgress: (stepId: string, status: 'pending' | 'active' | 'completed', title?: string) => void;
  resetGuideProgress: () => void;
  setGuideProgress: (progress: Record<string, 'pending' | 'active' | 'completed'>) => void;
  addActivity: (type: 'complete' | 'undo' | 'system', message: string, stepId?: string) => void;
}

const createActivityId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const areRegionsEqual = (left: Region | null, right: Region | null): boolean => {
  return left?.country === right?.country && left?.state === right?.state && left?.district === right?.district;
};

const areGuideProgressEqual = (
  left: Record<string, 'pending' | 'active' | 'completed'>,
  right: Record<string, 'pending' | 'active' | 'completed'>
): boolean => {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);

  if (leftKeys.length !== rightKeys.length) {
    return false;
  }

  for (const key of leftKeys) {
    if (left[key] !== right[key]) {
      return false;
    }
  }

  return true;
};

export const syncThemeClass = (theme: AppState['theme']): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldUseDark = theme === 'dark' || (theme === 'system' && prefersDark);
  document.documentElement.classList.toggle('dark', shouldUseDark);
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      region: null,
      language: 'en-US',
      theme: 'system',
      guideProgress: {},
      activityLog: [],

      setLogin: (status) => {
        if (get().isLoggedIn === status) {
          return;
        }

        set({ isLoggedIn: status });
      },
      setRegion: (region) => {
        if (areRegionsEqual(get().region, region)) {
          return;
        }

        set({
          region,
          guideProgress: {},
          activityLog: region
            ? [{ id: createActivityId(), type: 'system', message: `Region updated to ${region.country || 'Unknown'}`, timestamp: Date.now() }]
            : [],
        });
      },
      setLanguage: (language) => {
        if (get().language === language) {
          return;
        }

        set({ language });
      },
      setTheme: (theme) => {
        if (get().theme === theme) {
          return;
        }

        set({ theme });
        syncThemeClass(theme);
      },
      updateGuideProgress: (stepId, status, title) => {
        if (get().guideProgress[stepId] === status && !title) {
          return;
        }

        set((state) => {
          const newProgress = { ...state.guideProgress, [stepId]: status };
          const newLog = [...state.activityLog];

          if (title) {
            if (status === 'completed') {
              newLog.unshift({ id: createActivityId(), type: 'complete', message: `Completed: ${title}`, stepId, timestamp: Date.now() });
            } else if (status === 'pending') {
              newLog.unshift({ id: createActivityId(), type: 'undo', message: `Reverted: ${title}`, stepId, timestamp: Date.now() });
            }
          }

          return {
            guideProgress: newProgress,
            activityLog: newLog.slice(0, 10),
          };
        });
      },
      resetGuideProgress: () => {
        const state = get();
        if (Object.keys(state.guideProgress).length === 0 && state.activityLog.length === 0) {
          return;
        }

        set({ guideProgress: {}, activityLog: [] });
      },
      setGuideProgress: (progress) => {
        if (areGuideProgressEqual(get().guideProgress, progress)) {
          return;
        }

        set({ guideProgress: progress });
      },
      addActivity: (type, message, stepId) => set((state) => ({
        activityLog: [{ id: createActivityId(), type, message, stepId, timestamp: Date.now() }, ...state.activityLog].slice(0, 10)
      }))
    }),
    {
      name: 'civic-guide-storage',
      partialize: (state) => ({
        region: state.region,
        language: state.language,
        theme: state.theme,
        guideProgress: state.guideProgress,
        activityLog: state.activityLog,
      }),
    }
  )
);
