"use client"
import React, { useState } from 'react';
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
      if (msg.includes('CONFIGURATION_NOT_FOUND')) {
        setError('🔴 Firebase Configuration Error: "Email/Password" sign-in is disabled in your Firebase Console. Please go to Authentication > Sign-in method and enable the "Email/Password" provider.');
      } else if (msg.includes('API_KEY_INVALID') || msg.includes('api-key-not-valid')) {
        setError('🔴 Invalid API Key. Please check your .env.local and Ensure the key has no restrictions in the Google Cloud Console.');
      } else {
        setError(err.message || 'Authentication failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fcf8fa] dark:bg-[#111318] flex flex-col items-start justify-center px-6 md:px-12 lg:px-24 py-20 relative overflow-hidden">
      {/* Background Polish */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/4 -translate-y-1/4"></div>
      
      <div className="w-full max-w-5xl">
        <div className="mb-16 animate-in fade-in slide-in-from-left-8 duration-700">
          <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
            <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-xl shadow-primary/20 group-hover:scale-105 transition-all">
              <span className="material-symbols-outlined text-[32px]">account_balance</span>
            </div>
            <span className="font-h1 text-3xl font-black text-on-surface tracking-tighter">CivicGuide</span>
          </Link>
          
          <h1 className="font-h1 text-5xl md:text-6xl font-black text-on-surface tracking-tighter mb-6 max-w-3xl leading-[1.1]">
            {isLogin ? 'Sign in to access your roadmap.' : 'Join your local civic community.'}
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl text-xl leading-relaxed">
            {isLogin 
              ? 'Enter your credentials below to sync your election verification status and localized guide progress across all devices.' 
              : 'Register today to save your progress, receive real-time electoral alerts, and get a personalized verification roadmap.'}
          </p>
        </div>

        {error && (
          <div className="mb-12 p-6 bg-error-container/40 border-l-4 border-error text-on-error-container rounded-r-2xl text-base leading-relaxed flex items-start gap-4 max-w-4xl animate-in shake-in duration-500">
            <span className="material-symbols-outlined text-error shrink-0 text-[24px]">report</span>
            <div className="font-body-md font-bold">{error}</div>
          </div>
        )}

        {/* Spread out form */}
        <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-surface border border-outline-variant/30 rounded-[32px] p-8 md:p-12 shadow-[0px_20px_50px_-20px_rgba(0,0,0,0.1)] animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-[0.2em] font-black ml-1">Voter Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="voter@example.com"
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-2xl px-6 py-5 font-body-md text-lg text-on-surface focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:opacity-20"
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end px-1">
                <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-[0.2em] font-black">Secure Password</label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-2xl px-6 py-5 font-body-md text-lg text-on-surface focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:opacity-20"
              />
            </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center gap-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto min-w-[240px] bg-primary text-on-primary font-button py-5 px-10 rounded-2xl hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 shadow-xl shadow-primary/10">
              {loading ? (
                <span className="material-symbols-outlined text-[28px] animate-spin">progress_activity</span>
              ) : (
                <>
                  <span className="text-base font-bold uppercase tracking-widest">{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <span className="material-symbols-outlined text-[24px]">login</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="font-body-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group text-lg">
              <span className="opacity-60">{isLogin ? "New here?" : "Already a member?"}</span>
              <span className="font-bold underline decoration-2 underline-offset-4 decoration-primary/20 group-hover:decoration-primary">
                {isLogin ? "Register now" : "Go to Login"}
              </span>
            </button>
          </div>
        </form>
        
        <div className="mt-12 flex items-center gap-10 animate-in fade-in duration-1000 delay-500">
           <Link href="/guide" className="font-button text-sm text-on-surface-variant hover:text-primary transition-all flex items-center gap-2 px-6 py-3 bg-surface border border-outline-variant/20 rounded-xl hover:bg-surface-container-low">
              <span className="material-symbols-outlined text-[20px]">account_circle</span>
              <span className="font-bold uppercase tracking-widest text-[11px]">Continue as Guest</span>
           </Link>
           <p className="text-on-surface-variant text-xs opacity-40 max-w-sm leading-relaxed">
             By continuing, you agree to our terms and conditions and privacy policy for civic tech applications.
           </p>
        </div>
      </div>
    </main>
  );
}
