"use client"
import { useState, useEffect } from "react";
import { StepTimeline } from "@/components/guide/StepTimeline";
import { useStore } from "@/store/useStore";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";

export default function GuidePage() {
  const { region, guideProgress, language } = useStore();
  const { t } = useTranslation(language);
  const [totalStepCount, setTotalStepCount] = useState<number>(0);

  useEffect(() => {
    async function fetchCount() {
      try {
        const queryRegion = region?.country || '';
        const url = queryRegion 
          ? `/api/process?region=${encodeURIComponent(queryRegion)}` 
          : `/api/process`;
        
        const res = await fetch(url + (url.includes('?') ? '&' : '?') + 'v=' + Date.now(), {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' }
        });
        if (!res.ok) return;
        const data = await res.json();
        setTotalStepCount(data.steps?.length || 0);
      } catch { /* ignore */ }
    }
    fetchCount();
  }, [region?.country]);

  const totalCompleted = Object.values(guideProgress).filter(s => s === 'completed').length;
  const displayTotal = totalStepCount; 
  const progressPct = displayTotal > 0 ? Math.round((totalCompleted / displayTotal) * 100) : 0;
  
  // Clockwise progress: use positive dashoffset
  const circumference = 2 * Math.PI * 15.9155;
  const offset = circumference - (progressPct / 100) * circumference;

  const regionLabel = region
    ? `${region.country}${region.state ? ', ' + region.state : ''}`
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
             <Link href="/region" className="inline-flex items-center gap-2 px-4 py-1.5 bg-error-container rounded-full border border-error/30 mb-6 hover:bg-error-container/80 transition-all shadow-sm group cursor-pointer">
               <span className="material-symbols-outlined text-[16px] text-error group-hover:scale-110 transition-transform">warning</span>
               <span className="font-label-caps text-xs text-error font-black uppercase tracking-widest">{t('guide_select_region')} →</span>
             </Link>
           )}
           <h1 className="font-h1 text-5xl font-black text-on-surface mb-3 tracking-tighter leading-none">{t('guide_header')}</h1>
           <p className="font-body-lg text-on-surface-variant max-w-2xl text-lg leading-relaxed opacity-80">
             {displayTotal > 0 
               ? t('guide_loaded', { total: displayTotal })
               : t('guide_loading')}
           </p>
        </div>
        
        <div className="shrink-0 flex items-center gap-6 bg-surface-container-lowest px-6 py-4 rounded-[24px] border border-outline-variant/30 shadow-xl shadow-black/5 animate-in slide-in-from-right duration-700">
           <div className="w-16 h-16 rounded-full flex items-center justify-center relative bg-surface-container-low shadow-inner">
              {/* Clockwise SVG: rotate(90deg) and use standard arc direction */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                 <circle cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="2" className="text-outline-variant opacity-10" />
                 <circle
                   cx="18" cy="18" r="15.9155"
                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                   className="text-secondary transition-all duration-1000 ease-in-out"
                   strokeDasharray={circumference}
                   strokeDashoffset={offset}
                 />
              </svg>
              <span className="font-h2 text-base font-black text-on-surface relative z-10">{progressPct}%</span>
           </div>
           <div>
             <div className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-black mb-1 opacity-50">{t('guide_strategy')}</div>
             <div className="font-body-md text-base font-black text-on-surface">
               {totalCompleted} / {displayTotal || '...'} {t('guide_steps_label')}
             </div>
           </div>
        </div>
      </div>
      
      <StepTimeline />
    </main>
  );
}
