"use client"
import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import Link from 'next/link';

export default function DashboardPage() {
  const { region, language, theme, setTheme, guideProgress } = useStore();
  const [nextStep, setNextStep] = useState<any>(null);

  // Compute progress
  const totalSteps = Object.keys(guideProgress).length || 0;
  const completedSteps = Object.values(guideProgress).filter(s => s === 'completed').length;
  const progressPct = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (progressPct / 100) * circumference;

  // Fetch current active step from backend for the "Continue" card
  useEffect(() => {
    async function fetchActiveStep() {
      try {
        const queryRegion = region?.country || '';
        const url = queryRegion ? `/api/process?region=${encodeURIComponent(queryRegion)}` : `/api/process`;
        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();
        const steps = data.steps || [];
        const active = steps.find((s: any) => guideProgress[s.id] !== 'completed');
        setNextStep(active || null);
      } catch { /* silently fail */ }
    }
    fetchActiveStep();
  }, [region?.country, guideProgress]);

  const regionLabel = region ? `${region.country}, ${region.state}` : 'No region set';

  return (
    <main className="flex-1 px-4 md:px-8 lg:px-12 pb-24 max-w-7xl mx-auto w-full pt-8">
      {/* Welcome Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-container rounded-2xl p-8 md:p-12 text-on-primary mb-8 relative overflow-hidden shadow-[0px_4px_20px_-4px_rgba(0,0,0,0.1)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="font-h1 text-4xl md:text-5xl font-bold mb-2">Welcome back!</h1>
            <p className="font-body-lg text-primary-fixed opacity-90 max-w-lg mb-6">
              {totalSteps > 0
                ? `You've completed ${completedSteps} of ${totalSteps} steps. Keep going!`
                : 'Select a region below to begin your personalized election guide.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded-lg backdrop-blur-sm">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                <span className="font-body-md text-sm font-medium">{regionLabel}</span>
              </div>
              {region && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded-lg backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[16px]">how_to_vote</span>
                  <span className="font-body-md text-sm font-medium">Election Guide Active</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="shrink-0 flex items-center justify-center p-6 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 relative cursor-pointer hover:bg-white/20 transition-all">
            <div className="relative inline-flex items-center justify-center">
              <svg width="120" height="120" className="transform -rotate-90">
                <circle cx="60" cy="60" r="52" strokeWidth="8" className="stroke-white/20 fill-none" />
                <circle cx="60" cy="60" r="52" strokeWidth="8" strokeDasharray={`${circumference}`} strokeDashoffset={`${offset}`} className="stroke-secondary fill-none transition-all duration-1000 ease-out" strokeLinecap="round" />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-h2 text-3xl font-black text-white">{progressPct}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Continue Card — dynamic from backend */}
          <div className="bg-surface rounded-xl border border-outline-variant p-6 shadow-sm hover:border-primary/50 transition-colors group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-error-container text-on-error-container flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-[24px]">assignment_late</span>
              </div>
              {nextStep && (
                <span className="font-label-caps text-xs px-2 py-1 bg-error/10 text-error rounded font-bold tracking-wider uppercase">Action Needed</span>
              )}
            </div>
            
            <h2 className="font-h3 text-xl font-bold text-on-surface mb-2">
              {nextStep ? nextStep.title : (region ? 'All Steps Completed!' : 'Get Started')}
            </h2>
            <p className="font-body-md text-on-surface-variant mb-6">
              {nextStep
                ? nextStep.description
                : region
                  ? 'Congratulations! You have finished all election preparation steps.'
                  : 'Select your voting region to receive a personalized election guide.'}
            </p>
            
            <Link href={region ? "/guide" : "/region"} className="inline-flex items-center gap-2 font-button text-sm font-bold text-primary group-hover:bg-primary/5 px-4 py-2 rounded-lg -ml-4 transition-colors">
              {region ? 'Continue Guide' : 'Select Region'}
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
            </Link>
          </div>

          {/* Activity Feed */}
          <div className="bg-surface rounded-xl border border-outline-variant p-6 shadow-sm">
             <div className="flex items-center justify-between mb-6">
               <h2 className="font-h3 text-xl font-bold text-on-surface">Recent Activity</h2>
             </div>
             
             <div className="flex flex-col gap-4">
               {completedSteps > 0 ? (
                 Object.entries(guideProgress)
                   .filter(([, status]) => status === 'completed')
                   .map(([stepId]) => (
                     <div key={stepId} className="flex gap-4 p-4 rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-outline-variant/60 transition-colors">
                       <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                         <span className="material-symbols-outlined text-[20px]">check</span>
                       </div>
                       <div>
                         <h3 className="font-body-md font-bold text-on-surface">Step Completed</h3>
                         <p className="font-body-md text-sm text-on-surface-variant mt-0.5">Marked &quot;{stepId}&quot; as done</p>
                       </div>
                     </div>
                   ))
               ) : (
                 <div className="text-center py-8 text-on-surface-variant">
                   <span className="material-symbols-outlined text-4xl mb-2 block opacity-40">inbox</span>
                   <p className="font-body-md">No activity yet. Start your election guide to track progress.</p>
                 </div>
               )}

               {region && (
                 <div className="flex gap-4 p-4 rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-outline-variant/60 transition-colors">
                   <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center shrink-0">
                     <span className="material-symbols-outlined text-[20px]">location_on</span>
                   </div>
                   <div>
                     <h3 className="font-body-md font-bold text-on-surface">Region Set</h3>
                     <p className="font-body-md text-sm text-on-surface-variant mt-0.5">Set to {region.country}, {region.state}, {region.district}</p>
                   </div>
                 </div>
               )}
             </div>
          </div>
        </div>
        
        {/* Right Sidebar Preferences */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface rounded-xl border border-outline-variant p-6 shadow-sm">
            <h2 className="font-h3 text-xl font-bold text-on-surface mb-6">Preferences</h2>
            
            <div className="flex flex-col gap-4 border-b border-outline-variant/30 pb-6 mb-6">
               <label className="flex items-center justify-between cursor-pointer group">
                 <span className="font-body-md text-on-surface font-medium group-hover:text-primary transition-colors">Email Notifications</span>
                 <div className="relative inline-flex items-center cursor-pointer">
                   <input type="checkbox" className="sr-only peer" defaultChecked />
                   <div className="w-11 h-6 bg-outline-variant/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                 </div>
               </label>
               <label className="flex items-center justify-between cursor-pointer group">
                 <span className="font-body-md text-on-surface font-medium group-hover:text-primary transition-colors">SMS Alerts</span>
                 <div className="relative inline-flex items-center cursor-pointer">
                   <input type="checkbox" className="sr-only peer" />
                   <div className="w-11 h-6 bg-outline-variant/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                 </div>
               </label>
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center justify-between px-4 py-3 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors w-full group">
                <span className="flex items-center gap-3 font-body-md text-on-surface font-medium">
                   <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                   Theme
                </span>
                <span className="text-on-surface-variant font-label-caps uppercase text-[10px] tracking-wider">{theme}</span>
              </button>
              
              <button className="flex items-center justify-between px-4 py-3 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors w-full group">
                <span className="flex items-center gap-3 font-body-md text-on-surface font-medium">
                   <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-colors">language</span>
                   Language
                </span>
                <span className="text-on-surface-variant font-label-caps uppercase text-[10px] tracking-wider">{language}</span>
              </button>
            </div>
          </div>
          
          <div className="bg-surface-container-low rounded-xl border border-outline-variant p-6 shadow-inner flex flex-col items-center justify-center text-center">
             <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-4">
               <span className="material-symbols-outlined text-[24px]">support_agent</span>
             </div>
             <h3 className="font-h3 text-lg font-bold text-on-surface mb-2">Need help?</h3>
             <p className="font-body-md text-sm text-on-surface-variant mb-6">Contact our support team or browse our FAQs to get answers.</p>
             <button className="bg-surface text-primary border border-outline-variant font-button font-bold text-sm hover:bg-surface-container px-6 py-2.5 rounded-lg transition-colors w-full shadow-sm shadow-black/5">
               Visit Help Center
             </button>
          </div>
        </div>
        
      </div>
    </main>
  );
}
