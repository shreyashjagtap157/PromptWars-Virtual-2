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
      const code = err?.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (code === 'auth/weak-password') {
        setError('Password must be at least 6 characters.');
      } else {
        setError(err.message || 'Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary text-on-primary flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[32px]">account_balance</span>
          </div>
          <h1 className="font-h1 text-3xl font-bold text-on-surface mb-2">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="font-body-md text-on-surface-variant">
            {isLogin ? 'Sign in to sync your progress across devices.' : 'Register to save and sync your election guide progress.'}
          </p>
        </div>

        <div className="bg-surface rounded-2xl border border-outline-variant p-8 shadow-[0px_4px_20px_-4px_rgba(0,0,0,0.08)]">
          {error && (
            <div className="mb-6 p-3 bg-error-container text-on-error-container rounded-lg text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 ml-1 uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 ml-1 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-button py-3 px-6 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2">
              {loading && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-outline-variant/30 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-primary font-button text-sm hover:underline">
              {isLogin ? "Don't have an account? Register" : 'Already have an account? Sign In'}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-on-surface-variant mt-6">
          Continue as a <a href="/guide" className="text-primary hover:underline font-medium">guest</a> without saving progress.
        </p>
      </div>
    </main>
  );
}
