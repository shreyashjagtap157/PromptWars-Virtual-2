"use client"
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  if (user) {
    router.push('/app');
    return null;
  }

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
      router.push('/app');
    } catch (err: any) {
      const msg = err?.message || '';
      const code = err?.code || '';
      
      if (msg.includes('api-key-not-valid') || code === 'auth/invalid-api-key') {
        setError('⚠️ Firebase Web API Key is missing or invalid. Please update the NEXT_PUBLIC_FIREBASE_API_KEY in your frontend/.env.local file to enable authentication.');
      } else if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (code === 'auth/weak-password') {
        setError('Password must be at least 6 characters.');
      } else {
        setError(msg || 'An unexpected error occurred. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-20">
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary text-on-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[32px]">account_balance</span>
          </div>
          <h1 className="font-h1 text-3xl font-bold text-on-surface mb-2 tracking-tight">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-[280px] mx-auto">
            {isLogin ? 'Sign in to sync your progress across devices.' : 'Register to save and sync your election guide progress.'}
          </p>
        </div>

        <div className="bg-surface rounded-2xl border border-outline-variant p-8 shadow-[0px_4px_30px_-4px_rgba(0,0,0,0.1)] relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
          
          {error && (
            <div className="mb-6 p-4 bg-error-container/50 border border-error/20 text-on-error-container rounded-xl text-sm leading-relaxed flex items-start gap-3">
              <span className="material-symbols-outlined text-[20px] text-error shrink-0">warning</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
            <div>
              <label className="block font-label-caps text-[11px] text-on-surface-variant mb-2 ml-1 uppercase tracking-widest font-bold">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="voter@example.com"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3.5 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:opacity-50"
              />
            </div>
            <div>
              <label className="block font-label-caps text-[11px] text-on-surface-variant mb-2 ml-1 uppercase tracking-widest font-bold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3.5 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-button py-4 px-6 rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 shadow-md shadow-primary/20">
              {loading ? (
                <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
              ) : (
                <span className="flex items-center gap-2">
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <span className="material-symbols-outlined text-[18px]">{isLogin ? 'login' : 'person_add'}</span>
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-on-surface-variant font-body-md text-sm hover:text-primary transition-colors inline-flex items-center gap-1.5 focus:outline-none">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span className="text-primary font-bold hover:underline">{isLogin ? "Register now" : "Sign in instead"}</span>
            </button>
          </div>
        </div>

        <p className="text-center text-[13px] text-on-surface-variant mt-8 px-8 leading-relaxed">
          Need to browse first? Continue as a <a href="/guide" className="text-primary hover:underline font-bold">guest</a> to see the guide without saving progress.
        </p>
      </div>
    </main>
  );
}
