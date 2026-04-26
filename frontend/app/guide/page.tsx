"use client"
import { useState, useEffect } from "react";
import { StepTimeline } from "@/components/guide/StepTimeline";
import { useStore } from "@/store/useStore";
import Link from "next/link";

export default function GuidePage() {
  const { region, guideProgress } = useStore();
  const [totalStepCount, setTotalStepCount] = useState<number>(0);

  // Fetch true total steps for the region to show accurate progress
  useEffect(() => {
    async function fetchCount() {
      try {
        const queryRegion = region?.country || '';
        const url = queryRegion 
          ? `/api/process?region=${encodeURIComponent(queryRegion)}` 
          : `/api/process`;
        
        // Force no-cache to ensure 13-step guide is picked up
        const res = await fetch(url + (url.includes('?') ? '&' : '?') + 'v=' + Date.now(), {
          cache: 'no-store',
          headers: {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!res.ok) return;
        const data = await res.json();
        setTotalStepCount(data.steps?.length || 0);
      } catch { /* ignore */ }
    }
    fetchCount();
  }, [region?.country]);

  // Compute progress
  const totalCompleted = Object.values(guideProgress).filter(s => s === 'completed').length;
  // If fetch hasn't finished, use 0 instead of defaulting to 3
  const displayTotal = totalStepCount; 
  const progressPct = displayTotal > 0 ? Math.round((totalCompleted / displayTotal) * 100) : 0;
  
  const circumference = 2 * Math.PI * 15.9155;
  const offset = circumference - (progressPct / 100) * circumference;

  const regionLabel = region
    ? `${region.country}${region.state ? ', ' + region.state : ''}${region.district ? ', ' + region.district : ''}`
    : null;

  return (
    <main className="flex-1 px-4 md:px-8 lg:px-12 pb-24 max-w-6xl mx-auto pt-8">
      <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-outline-variant/20">
        <div className="animate-in slide-in-from-left duration-700">
           {regionLabel ? (
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full border border-primary/20 mb-6 shadow-sm">
               <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
               <span className="font-label-caps text-xs text-primary font-black uppercase tracking-widest">{regionLabel}</span>
             </div>
           ) : (
             <Link href="/region" className="inline-flex items-center gap-2 px-4 py-1.5 bg-error-container rounded-full border border-error/30 mb-6 hover:bg-error-container/80 transition-all shadow-sm group">
               <span className="material-symbols-outlined text-[16px] text-error group-hover:scale-110 transition-transform">warning</span>
               <span className="font-label-caps text-xs text-error font-black uppercase tracking-widest">Select region for exhaustive 13-step guide →</span>
             </Link>
           )}
           <h1 className="font-h1 text-5xl font-black text-on-surface mb-3 tracking-tighter leading-none">Your Election Roadmap</h1>
           <p className="font-body-lg text-on-surface-variant max-w-2xl text-lg leading-relaxed opacity-80">
             {displayTotal > 0 
               ? `Successfully loaded ${displayTotal} comprehensive steps verified for your current jurisdiction.` 
               : "Loading exhaustive election protocols..."}
           </p>
        </div>
        
        <div className="shrink-0 flex items-center gap-6 bg-surface-container-lowest px-6 py-4 rounded-[24px] border border-outline-variant/30 shadow-xl shadow-black/5 animate-in slide-in-from-right duration-700">
           <div className="w-16 h-16 rounded-full flex items-center justify-center relative bg-surface-container-low shadow-inner">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                 <circle cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="2" className="text-outline-variant opacity-10" />
                 <path className="text-secondary transition-all duration-1000 ease-in-out" strokeDasharray={`${circumference}`} strokeDashoffset={`${offset}`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="font-h2 text-base font-black text-on-surface relative z-10">{progressPct}%</span>
           </div>
           <div>
             <div className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-black mb-1 opacity-50">Strategy Status</div>
             <div className="font-body-md text-base font-black text-on-surface">
               {totalCompleted} / {displayTotal || '...'} Steps
             </div>
           </div>
        </div>
      </div>
      
      <StepTimeline />
    </main>
  );
}
