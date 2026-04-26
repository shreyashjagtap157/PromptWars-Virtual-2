"use client"
import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { ReaderControls } from './ReaderControls';

export function StepTimeline() {
  const { region, guideProgress, updateGuideProgress } = useStore();
  const [steps, setSteps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSteps() {
      setIsLoading(true);
      setError(null);
      try {
        const queryRegion = region?.country || 'general';
        const response = await fetch(`http://localhost:8080/process?region=${queryRegion}`);
        if (!response.ok) throw new Error('Backend process not found or offline');
        const data = await response.json();
        
        // Append missing UI states mapping onto the fetched backend entity
        const mappedSteps = data.steps.map((step: any, index: number) => ({
          ...step,
          status: index === 0 ? 'active' : 'pending',
          date: 'Based on local regulations',
          actions: []
        }));
        
        setSteps(mappedSteps);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSteps();
  }, [region?.country]);

  if (isLoading) {
    return <div className="p-8 text-center animate-pulse text-on-surface-variant font-body-md border rounded-xl border-outline-variant/30 mt-6">Loading tailored election steps...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-error font-body-md bg-error-container rounded-xl mt-6">Failed to load timeline. Please ensure the backend server is running on port 8080. ({error})</div>;
  }
  
  return (
    <div className="flex flex-col relative before:absolute before:inset-y-0 before:left-8 before:w-[2px] before:bg-outline-variant/30 mt-4">
      {steps.map((step, index) => {
        const statusFromStore = guideProgress[step.id];
        const isCompleted = statusFromStore === 'completed' || step.status === 'completed';
        const isActive = statusFromStore === 'active' || (step.status === 'active' && statusFromStore !== 'completed');
        const isLocked = step.status === 'locked' && !isActive && !isCompleted;

        return (
          <div key={step.id} className="relative pl-20 py-6 group">
             {/* Timeline Marker */}
            <div className={`absolute left-4 top-6 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-surface transition-colors ${isCompleted ? 'border-secondary bg-secondary/10 text-secondary' : isActive ? 'border-primary shadow-[0_0_0_4px_var(--color-primary-container)] text-primary' : 'border-outline-variant text-outline-variant'}`}>
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
                   </div>
                   <p className="font-body-md text-sm text-on-surface-variant flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      {step.date}
                   </p>
                 </div>
                 
                 {isActive && (
                   <button 
                     onClick={() => updateGuideProgress(step.id, 'completed')}
                     className="shrink-0 bg-primary text-on-primary px-4 py-2 rounded-lg font-button text-sm hover:bg-primary/90 transition-colors">
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
