import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Region = {
  country: string;
  state: string;
  district: string;
};

interface AppState {
  isLoggedIn: boolean; // Kept for interface compatibility but unused
  region: Region | null;
  language: string;
  theme: 'dark' | 'light' | 'system';
  guideProgress: Record<string, 'pending' | 'active' | 'completed'>;
  
  setLogin: (status: boolean) => void;
  setRegion: (region: Region | null) => void;
  setLanguage: (lang: string) => void;
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
  updateGuideProgress: (stepId: string, status: 'pending' | 'active' | 'completed') => void;
  resetGuideProgress: () => void;
  setGuideProgress: (progress: Record<string, 'pending' | 'active' | 'completed'>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      region: null,
      language: 'en-US',
      theme: 'system',
      guideProgress: {},
      
      setLogin: (status) => set({ isLoggedIn: status }),
      setRegion: (region) => set({ region, guideProgress: {} }),
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => {
        set({ theme });
        if (typeof window !== 'undefined') {
          if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
      updateGuideProgress: (stepId, status) => set((state) => ({
        guideProgress: {
          ...state.guideProgress,
          [stepId]: status
        }
      })),
      resetGuideProgress: () => set({ guideProgress: {} }),
      setGuideProgress: (progress) => set({ guideProgress: progress }),
    }),
    {
      name: 'civic-guide-storage', // Key used in localStorage
      // We don't need to persist theme class initialization here, standard Zustand state handling works
    }
  )
);
