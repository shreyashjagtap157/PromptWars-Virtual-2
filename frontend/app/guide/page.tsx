"use client"
import { StepTimeline } from "@/components/guide/StepTimeline";
import { useStore } from "@/store/useStore";
import Link from "next/link";

export default function GuidePage() {
  const { region, guideProgress } = useStore();

  // Compute progress
  const totalCompleted = Object.values(guideProgress).filter(s => s === 'completed').length;
  const totalSteps = Object.keys(guideProgress).length || 1;
  const progressPct = Math.round((totalCompleted / totalSteps) * 100);
  const circumference = 2 * Math.PI * 15.9155;
  const offset = circumference - (progressPct / 100) * circumference;

  const regionLabel = region
    ? `${region.country}${region.state ? ', ' + region.state : ''}${region.district ? ', ' + region.district : ''}`
    : null;

  return (
    <main className="flex-1 px-4 md:px-8 lg:px-12 pb-24 max-w-5xl mx-auto w-full pt-8">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-outline-variant/30">
        <div>
           {regionLabel ? (
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant/50 mb-4">
               <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
               <span className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">{regionLabel}</span>
             </div>
           ) : (
             <Link href="/region" className="inline-flex items-center gap-2 px-3 py-1 bg-error-container rounded-full border border-error/30 mb-4 hover:bg-error-container/80 transition-colors">
               <span className="material-symbols-outlined text-[14px] text-error">warning</span>
               <span className="font-label-caps text-xs text-error uppercase tracking-wider">Set your region →</span>
             </Link>
           )}
           <h1 className="font-h1 text-4xl font-bold text-on-surface mb-2 tracking-tight">Your Election Guide</h1>
           <p className="font-body-lg text-on-surface-variant max-w-2xl">Follow these curated steps based on your local jurisdiction&apos;s specific rules and timeline.</p>
        </div>
        
        <div className="shrink-0 flex items-center gap-4 bg-surface px-4 py-3 rounded-lg border border-outline-variant shadow-sm">
           <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                 <circle cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="3" className="text-surface-container" />
                 <path className="text-secondary transition-all duration-700 ease-out" strokeDasharray={`${circumference}`} strokeDashoffset={`${offset}`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span className="font-button text-sm font-bold text-on-surface relative z-10">{progressPct}%</span>
           </div>
           <div>
             <div className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider mb-0.5">Overall Progress</div>
             <div className="font-body-md text-sm font-semibold text-on-surface">{totalCompleted} of {totalSteps} completed</div>
           </div>
        </div>
      </div>
      
      <StepTimeline />
    </main>
  );
}
