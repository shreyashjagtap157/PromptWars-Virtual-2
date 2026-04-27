"use client"
import React, { useEffect, useState, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, region, guideProgress } = useStore();
  const [totalStepCount, setTotalStepCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const queryRegion = region?.country || '';
        const url = queryRegion 
          ? `/api/process?region=${encodeURIComponent(queryRegion)}` 
          : `/api/process`;
        
        const res = await fetch(url + '?v=' + Date.now());
        const data = await res.json();
        setTotalStepCount(data.steps?.length || 0);
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, [region?.country]);

  const totalCompleted = Object.values(guideProgress).filter(s => s === 'completed').length;
  const progressPct = totalStepCount > 0 ? Math.round((totalCompleted / totalStepCount) * 100) : 0;
  
  const circumference = 2 * Math.PI * 15.9155;
  const offset = circumference - (progressPct / 100) * circumference;

  const activity = useMemo(() => {
    return Object.entries(guideProgress)
      .slice(0, 3)
      .map(([id, status]) => ({ id, status }));
  }, [guideProgress]);

  return (
    <main className="flex-1 px-6 md:px-12 lg:px-16 py-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-12 animate-in fade-in slide-in-from-left-8 duration-700">
        <h1 className="font-h1 text-4xl md:text-5xl font-black text-on-surface tracking-tighter mb-2">
          Hello, {region?.country || 'Voter'}
        </h1>
        <p className="font-body-lg text-on-surface-variant opacity-70">
          Your Election Roadmap is {progressPct}% complete.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 p-8 bg-surface-container-lowest border border-outline-variant/30 rounded-[32px] shadow-sm flex flex-col md:flex-row items-center gap-10">
          <div className="w-40 h-40 rounded-full flex items-center justify-center relative bg-surface-container-low">
             <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
               <circle cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-secondary opacity-10" />
               <path className="text-secondary transition-all duration-1000 ease-in-out" strokeDasharray={`${circumference}`} strokeDashoffset={`${offset}`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
             </svg>
             <div className="text-center relative z-10">
               <span className="block font-h2 text-3xl font-black text-on-surface">{progressPct}%</span>
               <span className="block font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Progress</span>
             </div>
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="font-h3 text-xl font-bold mb-2">Keep going!</h3>
              <p className="font-body-md text-on-surface-variant">You have completed {totalCompleted} out of {totalStepCount} exhaustive steps for {region?.country || 'your region'}.</p>
            </div>
            <Link href="/guide" className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-button text-sm hover:translate-y-[-2px] transition-all cursor-pointer">
              Continue Roadmap <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="p-8 bg-primary/5 border border-primary/20 rounded-[32px] relative overflow-hidden flex flex-col justify-between h-full">
           <span className="material-symbols-outlined text-primary text-5xl opacity-20 absolute -right-4 -top-4 scale-150">verified</span>
           <div className="relative z-10">
             <h3 className="font-h3 text-xl font-black text-primary mb-2">Verified Status</h3>
             <p className="font-body-md text-on-surface-variant text-sm">Your identification has been pre-verified against {region?.country || 'general'} protocols.</p>
           </div>
           <div className="mt-8 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
               <span className="material-symbols-outlined text-[20px]">check</span>
             </div>
             <span className="font-body-md font-bold text-on-surface">Eligibility Active</span>
           </div>
        </div>
      </div>

      {/* Aligned Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Recent Activity */}
        <div className="flex flex-col bg-surface border border-outline-variant/30 rounded-[32px] overflow-hidden min-h-full">
          <div className="px-8 py-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/30">
            <h3 className="font-h3 text-lg font-bold">Recent Activity</h3>
            <span className="material-symbols-outlined text-on-surface-variant opacity-50">history</span>
          </div>
          <div className="p-8 space-y-4 flex-1">
            {activity.length > 0 ? activity.map((act) => (
              <div key={act.id} className="flex items-center gap-4 group">
                <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(var(--color-secondary),0.5)]"></div>
                <span className="font-body-md text-sm text-on-surface-variant">Marked step <b>{act.id.split('-')[1]}</b> as {act.status}</span>
              </div>
            )) : (
              <div className="text-on-surface-variant opacity-40 italic text-sm py-10 text-center">No activity yet. Start your guide.</div>
            )}
          </div>
        </div>

        {/* Need Help - Now aligned to Recent Activity */}
        <div className="flex flex-col bg-surface border border-outline-variant/30 rounded-[32px] overflow-hidden min-h-full">
          <div className="px-8 py-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/30">
            <h3 className="font-h3 text-lg font-bold">Quick Assistance</h3>
            <span className="material-symbols-outlined text-primary">chat_bubble</span>
          </div>
          <div className="p-8 space-y-4 flex-1">
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 hover:border-primary/30 transition-all cursor-pointer group">
              <h4 className="font-body-md font-bold text-sm mb-1 group-hover:text-primary transition-colors">Voter ID FAQ</h4>
              <p className="text-xs text-on-surface-variant">Common issues with digital EPIC downloads.</p>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 hover:border-primary/30 transition-all cursor-pointer group">
              <h4 className="font-body-md font-bold text-sm mb-1 group-hover:text-primary transition-colors">Find My Booth</h4>
              <p className="text-xs text-on-surface-variant">Live mapping support for your district.</p>
            </div>
          </div>
          <div className="px-8 py-4 bg-primary/5 text-center">
            <button className="text-primary font-bold text-xs uppercase tracking-widest cursor-pointer hover:underline">Contact Local Agent</button>
          </div>
        </div>
      </div>
    </main>
  );
}
