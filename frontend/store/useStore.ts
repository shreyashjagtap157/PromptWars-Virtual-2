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

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      region: null,
      language: 'en-US',
      theme: 'system',
      guideProgress: {},
      activityLog: [],
      
      setLogin: (status) => set({ isLoggedIn: status }),
      setRegion: (region) => set((state) => {
        // Prevent clearing if same region
        if (state.region?.country === region?.country) return { region };
        return { 
          region, 
          guideProgress: {},
          activityLog: [{ id: Math.random().toString(), type: 'system', message: `Region updated to ${region?.country || 'Unknown'}`, timestamp: Date.now() }] 
        };
      }),
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
      updateGuideProgress: (stepId, status, title) => set((state) => {
        const newProgress = { ...state.guideProgress, [stepId]: status };
        let newLog = [...state.activityLog];
        
        if (title) {
          if (status === 'completed') {
            newLog.unshift({ id: Math.random().toString(), type: 'complete', message: `Completed: ${title}`, stepId, timestamp: Date.now() });
          } else if (status === 'pending') {
            newLog.unshift({ id: Math.random().toString(), type: 'undo', message: `Reverted: ${title}`, stepId, timestamp: Date.now() });
          }
        }
        
        // Keep only last 10 activities to save storage
        return {
          guideProgress: newProgress,
          activityLog: newLog.slice(0, 10)
        };
      }),
      resetGuideProgress: () => set({ guideProgress: {}, activityLog: [] }),
      setGuideProgress: (progress) => set({ guideProgress: progress }),
      addActivity: (type, message, stepId) => set((state) => ({
        activityLog: [{ id: Math.random().toString(), type, message, stepId, timestamp: Date.now() }, ...state.activityLog].slice(0, 10)
      }))
    }),
    {
      name: 'civic-guide-storage', // Key used in localStorage
      // We don't need to persist theme class initialization here, standard Zustand state handling works
    }
  )
);
