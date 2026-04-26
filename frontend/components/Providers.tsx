"use client"
import { AuthProvider } from '@/contexts/AuthContext';
import { useSyncStore } from '@/hooks/useSyncStore';

function SyncWrapper({ children }: { children: React.ReactNode }) {
  useSyncStore();
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SyncWrapper>
        {children}
      </SyncWrapper>
    </AuthProvider>
  );
}
