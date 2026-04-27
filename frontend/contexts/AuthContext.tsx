"use client"
import React, { createContext, useContext, useState, useCallback } from 'react';

// Stub out AuthContext to maintain Next.js compatibility without throwing errors
interface AuthContextType {
  user: null;
  loading: boolean;
  signIn: () => Promise<void>;
  signUp: () => Promise<void>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
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
  
  const signIn = useCallback(async () => {}, []);
  const signUp = useCallback(async () => {}, []);
  const signOut = useCallback(async () => {}, []);
  const getIdToken = useCallback(async () => null, []);

  return (
    <AuthContext.Provider value={{ user: null, loading: false, signIn, signUp, signOut, getIdToken }}>
      {children}
    </AuthContext.Provider>
  );
}
