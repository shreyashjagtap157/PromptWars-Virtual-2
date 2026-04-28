"use client"
import React, { createContext, useContext, useState, useCallback } from 'react';

// Stub out AuthContext to maintain Next.js compatibility without throwing errors
interface AuthContextType {
  user: { email: string } | null;
  loading: boolean;
  signIn: (email?: string, password?: string) => Promise<void>;
  signUp: (email?: string, password?: string) => Promise<void>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({
  user: { email: 'Guest' },
  loading: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  getIdToken: async () => null,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Frictionless App Mode: Authentication is completely disabled.
  // CivicGuide now uses Zustand LocalStorage persistence, removing login barriers.
  
  const signIn = useCallback(async (_email?: string, _password?: string) => {}, []);
  const signUp = useCallback(async (_email?: string, _password?: string) => {}, []);
  const signOut = useCallback(async () => {}, []);
  const getIdToken = useCallback(async () => null, []);

  return (
    <AuthContext.Provider value={{ user: { email: 'Guest' }, loading: false, signIn, signUp, signOut, getIdToken }}>
      {children}
    </AuthContext.Provider>
  );
}
