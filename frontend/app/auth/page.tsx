"use client"
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const router = useRouter();

  // FIX: Redirect using useEffect to resolve "update while rendering" warning
  useEffect(() => {
    if (user) {
      router.push('/app');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : '';
      if (msg.includes('CONFIGURATION_NOT_FOUND')) {
        setError('🔴 Email/Password auth is disabled. Please enable it in Firebase Console.');
      } else {
        setError(msg || 'Auth failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-on-background flex flex-col items-start justify-center px-6 md:px-12 lg:px-24 py-20 relative overflow-hidden transition-colors duration-400">
      {/* Decorative Background (Semantic) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/4 -translate-y-1/4"></div>
      
      <div className="w-full max-w-5xl">
        <div className="mb-16 animate-in slide-in-from-left-8 duration-700">
          <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
            <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-xl shadow-primary/30">
              <span className="material-symbols-outlined text-[32px]">account_balance</span>
            </div>
            <span className="font-h1 text-3xl font-black text-on-surface tracking-tighter">CivicGuide</span>
          </Link>
          
          <h1 className="font-h1 text-5xl md:text-6xl font-black text-on-surface tracking-tighter mb-6 max-w-3xl leading-[1.1]">
            {isLogin ? 'Access your civic roadmap.' : 'Join the mission.'}
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl text-xl leading-relaxed opacity-70">
            {isLogin 
              ? 'Enter your credentials to sync your verified election roadmap and localized progress tracking.' 
              : 'Register to unlock persistent progress tracking, VVPAT verification guides, and localized voter protocols.'}
          </p>
        </div>

        {error && (
          <div className="mb-12 p-6 bg-error-container/20 border-l-4 border-error text-on-error-container rounded-r-2xl text-base flex items-start gap-4 max-w-4xl animate-in shake-in duration-500">
            <span className="material-symbols-outlined text-error shrink-0">report</span>
            <div className="font-body-md font-bold">{error}</div>
          </div>
        )}

        {/* Robust Spread-out Form Layout */}
        <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-surface border border-outline-variant/30 rounded-[32px] p-8 md:p-12 shadow-2xl animate-in slide-in-from-bottom-8 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-[0.2em] font-black">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-2xl px-6 py-5 font-body-md text-on-surface"
              />
            </div>
            <div className="space-y-4">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-[0.2em] font-black">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-2xl px-6 py-5 font-body-md text-on-surface"
              />
            </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center gap-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto min-w-[240px] bg-primary text-on-primary font-button py-5 px-10 rounded-2xl hover:translate-y-[-4px] hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-4">
              <span className="text-base font-bold uppercase tracking-widest">{isLogin ? 'Log In' : 'Sign Up'}</span>
              <span className="material-symbols-outlined text-[24px]">login</span>
            </button>

            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-body-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group text-lg">
              <span>{isLogin ? "New user?" : "Existing user?"}</span>
              <span className="font-bold underline decoration-primary/20 group-hover:decoration-primary">{isLogin ? "Create Account" : "Access Account"}</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
