"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { useTranslation } from '@/lib/i18n';
import { ReaderControls } from './ReaderControls';

interface Step {
  id: string;
  title: string;
  description: string;
  order: number;
}

export function StepTimeline() {
  const { region, guideProgress, updateGuideProgress, language } = useStore();
  const { t } = useTranslation(language);
  const [steps, setSteps] = useState<Step[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSteps() {
      setIsLoading(true);
      setError(null);
      try {
        const queryRegion = region?.country || '';
        const url = queryRegion
          ? `/api/process?region=${encodeURIComponent(queryRegion)}`
          : `/api/process`;
        
        const response = await fetch(url + (url.includes('?') ? '&' : '?') + 'v=' + Date.now(), {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' }
        });
        if (!response.ok) throw new Error('Backend unavailable');
        const data = await response.json();
        
        const sortedSteps = (data.steps || []).sort((a: any, b: any) => a.order - b.order);
        console.log(`[StepTimeline] Loaded ${sortedSteps.length} steps for "${queryRegion}"`);
        setSteps(sortedSteps);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSteps();
  }, [region?.country]);

  const stepsWithStatus = useMemo(() => {
    if (steps.length === 0) return [];
    return steps.map((step, index) => {
      const storedStatus = guideProgress[step.id];
      if (storedStatus) return { ...step, status: storedStatus };
      
      const allPrevCompleted = steps.slice(0, index).every(s => guideProgress[s.id] === 'completed');
      if (allPrevCompleted) {
        return { ...step, status: 'active' as const };
      }
      return { ...step, status: 'pending' as const };
    });
  }, [steps, guideProgress]);

  useEffect(() => {
    if (steps.length > 0 && Object.keys(guideProgress).length === 0) {
      updateGuideProgress(steps[0].id, 'active');
    }
  }, [steps, guideProgress, updateGuideProgress]);

  if (isLoading) {
    return (
      <div className="mt-8 flex flex-col gap-8">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="pl-20 relative">
            <div className="absolute left-4 top-0 w-8 h-8 rounded-full bg-surface-container animate-pulse"></div>
            <div className="rounded-2xl border border-outline-variant/20 p-8 animate-pulse bg-surface-container/5">
              <div className="h-6 bg-surface-container rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-surface-container rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-error font-body-md bg-error-container/20 border border-error/30 rounded-2xl mt-8">
        <span className="material-symbols-outlined text-4xl mb-3 block">cloud_off</span>
        <h3 className="font-h3 text-lg font-bold mb-1">Timeline Offline</h3>
        <p className="opacity-70">Please start the backend service to access the guide.</p>
        <span className="text-xs bg-error/10 px-2 py-1 rounded mt-4 inline-block">Error: {error}</span>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col relative before:absolute before:inset-y-0 before:left-8 before:w-[2px] before:bg-gradient-to-b before:from-primary/20 before:via-outline-variant/30 before:to-transparent mt-8">
      {stepsWithStatus.map((step, index) => {
        const isCompleted = step.status === 'completed';
        const isActive = step.status === 'active';

        return (
          <div key={step.id} className="relative pl-20 pb-10 group animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
             {/* Timeline Marker */}
            <div className={`absolute left-4 top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-surface transition-all duration-500 z-10 ${isCompleted ? 'border-secondary bg-secondary/20 text-secondary' : isActive ? 'border-primary shadow-[0_0_0_6px_var(--color-primary-container)] text-primary scale-110' : 'border-outline-variant text-outline-variant'}`}>
              {isCompleted ? (
                 <span className="material-symbols-outlined text-[18px]">check</span>
              ) : (
                 <span className="font-h3 text-[14px] font-black">{index + 1}</span>
              )}
            </div>
            
            {/* Content Card */}
            <div className={`rounded-2xl border transition-all duration-500 overflow-hidden ${isActive ? 'bg-surface border-primary shadow-[0px_8px_32px_-8px_rgba(0,0,0,0.1)] ring-1 ring-primary/20' : isCompleted ? 'bg-surface-container-lowest border-outline-variant/20 opacity-80' : 'bg-surface border-outline-variant/20 opacity-50'}`}>
               
               {/* Card Header */}
               <div className="px-8 py-6 border-b border-outline-variant/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <div>
                   <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <h3 className={`font-h3 text-xl font-bold tracking-tight ${isActive ? 'text-primary' : 'text-on-surface'}`}>{step.title}</h3>
                      {isActive && (
                         <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-error text-on-error shadow-sm shadow-error/30 animate-pulse-slow">{t('guide_action_needed')}</span>
                      )}
                      {isCompleted && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-secondary-container text-on-secondary-container">{t('guide_verified')}</span>
                      )}
                   </div>
                   <p className="font-label-caps text-[11px] text-on-surface-variant flex items-center gap-2 uppercase tracking-wide opacity-70">
                      <span className="material-symbols-outlined text-[14px]">verified_user</span>
                      {region?.country || 'General'} Election Protocol
                   </p>
                 </div>
                 
                 {/* Clickable "I have completed this" — shown for active AND pending steps */}
                 {!isCompleted && (
                   <button 
                     onClick={() => updateGuideProgress(step.id, 'completed')}
                     className="shrink-0 bg-primary text-on-primary px-5 py-2.5 rounded-xl font-button text-sm hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2 active:scale-95 cursor-pointer">
                     <span className="material-symbols-outlined text-[18px]">check_circle</span>
                     {t('guide_completed_btn')}
                   </button>
                 )}
               </div>

               {/* Card Body */}
               <div className="px-8 py-6 bg-gradient-to-b from-transparent to-surface-container-low/20">
                 <p className="font-body-lg text-on-surface leading-relaxed mb-6">
                    {step.description}
                 </p>
                 
                 <div className="flex items-center justify-between gap-4">
                    <ReaderControls text={step.description} />
                    <div className="text-[10px] font-bold text-on-surface-variant opacity-50">{t('guide_step_of', { curr: index + 1, total: steps.length })}</div>
                 </div>
               </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
