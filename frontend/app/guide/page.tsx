import { StepTimeline } from "@/components/guide/StepTimeline";

export default function GuidePage() {
  return (
    <main className="flex-1 px-4 md:px-8 lg:px-12 pb-24 max-w-5xl mx-auto w-full pt-8">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-outline-variant/30">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant/50 mb-4">
             <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
             <span className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">California, District 12</span>
           </div>
           <h1 className="font-h1 text-4xl font-bold text-on-surface mb-2 tracking-tight">Your Election Guide</h1>
           <p className="font-body-lg text-on-surface-variant max-w-2xl">Follow these curated steps based on your local jurisdiction's specific rules and timeline.</p>
        </div>
        
        <div className="shrink-0 flex items-center gap-4 bg-surface px-4 py-3 rounded-lg border border-outline-variant shadow-sm">
           <div className="w-12 h-12 rounded-full border-[3px] border-surface-container flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                 <path className="text-secondary" strokeDasharray="25, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
              <span className="font-button text-sm font-bold text-on-surface">25%</span>
           </div>
           <div>
             <div className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider mb-0.5">Overall Progress</div>
             <div className="font-body-md text-sm font-semibold text-on-surface">1 of 4 completed</div>
           </div>
        </div>
      </div>
      
      <StepTimeline />
    </main>
  );
}
