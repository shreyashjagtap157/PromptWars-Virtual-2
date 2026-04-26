"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { ReaderControls } from './ReaderControls';

interface Step {
  id: string;
  title: string;
  description: string;
  order: number;
}

export function StepTimeline() {
  const { region, guideProgress, updateGuideProgress } = useStore();
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
        const response = await fetch(url);
        if (!response.ok) throw new Error('Backend unavailable');
        const data = await response.json();
        setSteps(data.steps || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSteps();
  }, [region?.country]);

  // Derive step statuses from store progress
  const stepsWithStatus = useMemo(() => {
    if (steps.length === 0) return [];
    return steps.map((step, index) => {
      const storedStatus = guideProgress[step.id];
      if (storedStatus) return { ...step, status: storedStatus };
      // Auto-set the first incomplete step as active
      const allPrev = steps.slice(0, index).every(s => guideProgress[s.id] === 'completed');
      if (allPrev && !guideProgress[step.id]) {
        return { ...step, status: index === 0 ? 'active' as const : 'pending' as const };
      }
      return { ...step, status: 'pending' as const };
    });
  }, [steps, guideProgress]);

  // Recompute first active step whenever progress changes
  useEffect(() => {
    if (steps.length === 0) return;
    const firstIncomplete = steps.find(s => guideProgress[s.id] !== 'completed');
    if (firstIncomplete && guideProgress[firstIncomplete.id] !== 'active') {
      updateGuideProgress(firstIncomplete.id, 'active');
    }
  }, [steps, guideProgress, updateGuideProgress]);

  if (isLoading) {
    return (
      <div className="mt-6 flex flex-col gap-6">
        {[1,2,3].map(i => (
          <div key={i} className="pl-20 relative">
            <div className="absolute left-4 top-0 w-8 h-8 rounded-full bg-surface-container animate-pulse"></div>
            <div className="rounded-xl border border-outline-variant/30 p-6 animate-pulse">
              <div className="h-5 bg-surface-container rounded w-1/3 mb-3"></div>
              <div className="h-4 bg-surface-container rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-error font-body-md bg-error-container rounded-xl mt-6">
        <span className="material-symbols-outlined text-3xl mb-2 block">cloud_off</span>
        Failed to load timeline. Please ensure the backend server is running on port 8080.
        <br /><span className="text-sm opacity-70 mt-1 block">({error})</span>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col relative before:absolute before:inset-y-0 before:left-8 before:w-[2px] before:bg-outline-variant/30 mt-4">
      {stepsWithStatus.map((step, index) => {
        const isCompleted = step.status === 'completed';
        const isActive = step.status === 'active';

        return (
          <div key={step.id} className="relative pl-20 py-6 group">
             {/* Timeline Marker */}
            <div className={`absolute left-4 top-6 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-surface transition-all duration-300 ${isCompleted ? 'border-secondary bg-secondary/10 text-secondary' : isActive ? 'border-primary shadow-[0_0_0_4px_var(--color-primary-container)] text-primary' : 'border-outline-variant text-outline-variant'}`}>
              {isCompleted ? (
                 <span className="material-symbols-outlined text-[16px]">check</span>
              ) : (
                 <span className="font-button text-[12px] font-bold">{index + 1}</span>
              )}
            </div>
            
            {/* Content Card */}
            <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${isActive ? 'bg-surface border-primary/30 shadow-[0px_4px_20px_-4px_rgba(0,0,0,0.1)]' : isCompleted ? 'bg-surface-container-lowest border-outline-variant/30 opacity-70 hover:opacity-100' : 'bg-surface border-outline-variant/30 opacity-50'}`}>
               
               {/* Card Header */}
               <div className="p-6 border-b border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <div>
                   <div className="flex items-center gap-3 mb-1">
                      <h3 className={`font-h3 text-xl font-bold ${isActive ? 'text-primary' : 'text-on-surface'}`}>{step.title}</h3>
                      {isActive && (
                         <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-error-container text-on-error-container">Action Needed</span>
                      )}
                      {isCompleted && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-secondary-container text-on-secondary-container">Done</span>
                      )}
                   </div>
                   <p className="font-body-md text-sm text-on-surface-variant flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      Based on local regulations
                   </p>
                 </div>
                 
                 {isActive && (
                   <button 
                     onClick={() => updateGuideProgress(step.id, 'completed')}
                     className="shrink-0 bg-primary text-on-primary px-4 py-2 rounded-lg font-button text-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
                     <span className="material-symbols-outlined text-[16px]">check_circle</span>
                     Mark Complete
                   </button>
                 )}
               </div>

               {/* Card Body */}
               <div className="p-6">
                 <p className="font-body-lg text-on-surface leading-relaxed mb-4">
                   {step.description}
                 </p>
                 
                 <ReaderControls text={step.description} />
               </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
