import { create } from 'zustand'

export type Region = {
  country: string;
  state: string;
  district: string;
};

interface AppState {
  isLoggedIn: boolean;
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
}

export const useStore = create<AppState>((set) => ({
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
}))
