"use client"
import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { useTranslation } from '@/lib/i18n';
import Link from 'next/link';
import { fetchProcessStepCount } from '@/lib/process';

export default function DashboardPage() {
  const region = useStore((state) => state.region);
  const guideProgress = useStore((state) => state.guideProgress);
  const language = useStore((state) => state.language);
  const activityLog = useStore((state) => state.activityLog);
  const { t } = useTranslation(language);
  const [totalStepCount, setTotalStepCount] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const count = await fetchProcessStepCount(region?.country);
        if (!cancelled) {
          setTotalStepCount(count);
        }
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      }
    }

    fetchStats();

    return () => {
      cancelled = true;
    };
  }, [region?.country]);

  const totalCompleted = Object.values(guideProgress).filter(s => s === 'completed').length;
  const progressPct = totalStepCount > 0 ? Math.round((totalCompleted / totalStepCount) * 100) : 0;
  const hasGuideStats = totalStepCount > 0;
  
  const circumference = 2 * Math.PI * 15.9155;
  const offset = circumference - (progressPct / 100) * circumference;

  return (
    <main className="flex-1 px-6 md:px-12 lg:px-16 py-12 max-w-7xl mx-auto">
      <div className="mb-12 animate-in fade-in slide-in-from-left-8 duration-700">
        <h1 className="font-h1 text-4xl md:text-5xl font-black text-on-surface tracking-tighter mb-2">
          {t('dash_welcome')}, {region?.country || 'Voter'}
        </h1>
        <p className="font-body-lg text-on-surface-variant opacity-70">
          {hasGuideStats ? t('dash_progress', { pct: progressPct }) : "..."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 p-8 bg-surface-container-lowest border border-outline-variant/30 rounded-[32px] shadow-sm flex flex-col md:flex-row items-center gap-10">
          <div className="w-40 h-40 rounded-full flex items-center justify-center relative bg-surface-container-low">
             {/* Clockwise progress ring */}
             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
               <circle cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-secondary opacity-10" />
               <circle
                 cx="18" cy="18" r="15.9155"
                 fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                 className="text-secondary transition-all duration-1000 ease-in-out"
                 strokeDasharray={circumference}
                 strokeDashoffset={offset}
               />
             </svg>
             <div className="text-center relative z-10 transition-opacity duration-300" style={{ opacity: hasGuideStats ? 1 : 0 }}>
               <span className="block font-h2 text-3xl font-black text-on-surface">{progressPct}%</span>
               <span className="block font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Progress</span>
             </div>
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="font-h3 text-xl font-bold mb-2">{t('dash_keep_going')}</h3>
              <p className="font-body-md text-on-surface-variant">
                  {hasGuideStats ? t('dash_steps_completed', { done: totalCompleted, total: totalStepCount || '...' }) : '...'}
              </p>
            </div>
            <Link href="/guide" className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-button text-sm hover:translate-y-[-2px] transition-all cursor-pointer">
              {t('dash_continue')} <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="p-8 bg-primary/5 border border-primary/20 rounded-[32px] overflow-hidden flex flex-col justify-between h-full">
           <div className="relative z-10">
             <h3 className="font-h3 text-xl font-black text-primary mb-2">{t('dash_verified')}</h3>
             <p className="font-body-md text-on-surface-variant text-sm">{t('dash_id_mapped')}</p>
           </div>
           <div className="mt-8 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
               <span className="material-symbols-outlined text-[20px]">check</span>
             </div>
             <span className="font-body-md font-bold text-on-surface">{t('dash_eligibility')}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="flex flex-col bg-surface border border-outline-variant/30 rounded-[32px] overflow-hidden min-h-full">
          <div className="px-8 py-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/30">
            <h3 className="font-h3 text-lg font-bold">{t('dash_recent')}</h3>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-3">
             {!hasGuideStats ? (
                <div className="italic text-on-surface-variant opacity-40 text-sm">{t('dash_synced')}</div>
             ) : activityLog.length === 0 ? (
                <div className="italic text-on-surface-variant opacity-40 text-sm">No recent activity detected.</div>
             ) : (
                activityLog.slice(0, 4).map(act => {
                  // Determine translated title
                  let translatedMessage = act.message;
                  if (act.stepId && (act.type === 'complete' || act.type === 'undo')) {
                    const stepTitleKey = `${act.stepId}_title`;
                    const translatedTitle = t(stepTitleKey) === stepTitleKey ? act.message.replace(/^(Completed: |Reverted: )/, '') : t(stepTitleKey);
                    translatedMessage = t(act.type === 'complete' ? 'act_completed' : 'act_undone', { step: translatedTitle });
                  }

                  return (
                    <div key={act.id} className="flex gap-4 items-start p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/10 text-sm">
                       <span className={`material-symbols-outlined text-[18px] shrink-0 ${act.type === 'complete' ? 'text-secondary' : act.type === 'undo' ? 'text-primary' : 'text-on-surface-variant'}`}>
                         {act.type === 'complete' ? 'check_circle' : act.type === 'undo' ? 'undo' : 'info'}
                       </span>
                       <div>
                         <div className="font-bold text-on-surface">{translatedMessage}</div>
                         <div className="text-[10px] text-on-surface-variant mt-0.5">{new Date(act.timestamp).toLocaleTimeString()}</div>
                       </div>
                    </div>
                  );
                })
             )}
          </div>
        </div>
        <div className="flex flex-col bg-surface border border-outline-variant/30 rounded-[32px] overflow-hidden min-h-full">
          <div className="px-8 py-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/30">
            <h3 className="font-h3 text-lg font-bold">{t('dash_help')}</h3>
          </div>
          <div className="p-8 flex-1 italic text-on-surface-variant opacity-40 text-sm">{t('dash_agent')}</div>
        </div>
      </div>
    </main>
  );
}
