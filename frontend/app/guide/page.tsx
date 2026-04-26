"use client"
import { useState, useEffect } from "react";
import { StepTimeline } from "@/components/guide/StepTimeline";
import { useStore } from "@/store/useStore";
import Link from "next/link";

export default function GuidePage() {
  const { region, guideProgress } = useStore();
  const [totalStepCount, setTotalStepCount] = useState<number>(0);

  // Fetch total steps for the region to show accurate progress
  useEffect(() => {
    async function fetchCount() {
      try {
        const queryRegion = region?.country || '';
        const url = queryRegion 
          ? `/api/process?region=${encodeURIComponent(queryRegion)}` 
          : `/api/process`;
        const res = await fetch(url + (url.includes('?') ? '&' : '?') + 't=' + Date.now());
        if (!res.ok) return;
        const data = await res.json();
        setTotalStepCount(data.steps?.length || 0);
      } catch { /* ignore */ }
    }
    fetchCount();
  }, [region?.country]);

  // Compute progress
  const totalCompleted = Object.values(guideProgress).filter(s => s === 'completed').length;
  const displayTotal = totalStepCount || Object.keys(guideProgress).length || 0;
  const progressPct = displayTotal > 0 ? Math.round((totalCompleted / displayTotal) * 100) : 0;
  
  const circumference = 2 * Math.PI * 15.9155;
  const offset = circumference - (progressPct / 100) * circumference;

  const regionLabel = region
    ? `${region.country}${region.state ? ', ' + region.state : ''}${region.district ? ', ' + region.district : ''}`
    : null;

  return (
    <main className="flex-1 px-4 md:px-8 lg:px-12 pb-24 max-w-5xl mx-auto pt-8">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-outline-variant/30">
        <div>
           {regionLabel ? (
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant/50 mb-4 shadow-sm">
               <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
               <span className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">{regionLabel}</span>
             </div>
           ) : (
             <Link href="/region" className="inline-flex items-center gap-2 px-3 py-1 bg-error-container rounded-full border border-error/30 mb-4 hover:bg-error-container/80 transition-colors shadow-sm">
               <span className="material-symbols-outlined text-[14px] text-error">warning</span>
               <span className="font-label-caps text-xs text-error uppercase tracking-wider">Set your region to see localized steps →</span>
             </Link>
           )}
           <h1 className="font-h1 text-4xl font-bold text-on-surface mb-2 tracking-tight">Your Election Guide</h1>
           <p className="font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
             Follow these {displayTotal > 0 ? `${displayTotal} exhaustive` : 'curated'} steps tailored to your local jurisdiction. Each step contains detailed instructions and TTS support.
           </p>
        </div>
        
        <div className="shrink-0 flex items-center gap-4 bg-surface px-5 py-3.5 rounded-xl border border-outline-variant shadow-md">
           <div className="w-14 h-14 rounded-full flex items-center justify-center relative bg-surface-container-lowest">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                 <circle cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-outline-variant opacity-20" />
                 <path className="text-secondary transition-all duration-1000 ease-in-out" strokeDasharray={`${circumference}`} strokeDashoffset={`${offset}`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="font-h2 text-sm font-black text-on-surface relative z-10">{progressPct}%</span>
           </div>
           <div>
             <div className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mb-0.5 opacity-70">Guide Status</div>
             <div className="font-body-md text-sm font-bold text-on-surface">
               {totalCompleted} of {displayTotal} steps completed
             </div>
           </div>
        </div>
      </div>
      
      <StepTimeline />
    </main>
  );
}
