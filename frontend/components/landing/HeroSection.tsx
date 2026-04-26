import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-container-low to-background -z-10"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-fixed/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 -z-10 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/50 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse-slow"></span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">2026 ELECTION CYCLE ACTIVE</span>
        </div>
        
        <h1 className="font-h1 text-h1 text-on-surface mb-6 leading-tight tracking-tight">
          Your Election Process,<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-sm">Simplified.</span>
        </h1>
        
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
          Navigate the voting process with confidence. Clear, accurate, and localized information designed to empower your civic participation.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/guide" className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary rounded-lg font-button text-button shadow-[0px_1px_3px_rgba(15,23,42,0.1),0px_10px_15px_-3px_rgba(15,23,42,0.15)] hover:bg-primary/90 transition-all duration-200 relative overflow-hidden group flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              Start My Guide
              <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
            </span>
          </Link>
          <Link href="/region" className="w-full sm:w-auto px-8 py-4 bg-transparent border-[1.5px] border-outline text-on-surface rounded-lg font-button text-button hover:bg-surface-variant/50 transition-colors duration-200 flex items-center justify-center">
            Choose My Region
          </Link>
        </div>
      </div>
    </section>
  );
}
