"use client"
import { AuthProvider } from '@/contexts/AuthContext';
import { useSyncStore } from '@/hooks/useSyncStore';
import { syncThemeClass, useStore } from '@/store/useStore';
import { useEffect } from 'react';

function ThemeSync() {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    syncThemeClass(theme);

    if (typeof window === 'undefined' || theme !== 'system') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => syncThemeClass(theme);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return null;
}

function SyncWrapper({ children }: { children: React.ReactNode }) {
  useSyncStore();
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeSync />
      <SyncWrapper>
        {children}
      </SyncWrapper>
    </AuthProvider>
  );
}
