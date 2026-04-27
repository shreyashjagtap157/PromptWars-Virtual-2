"use client"
import React from 'react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-primary/[0.03] rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-label-caps text-[10px] font-black uppercase tracking-widest text-primary">2026 Election Cycle Active</span>
        </div>
        
        <h1 className="font-h1 text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-on-surface mb-8 leading-[0.85] animate-in fade-in slide-in-from-bottom-8 duration-700">
          Your Election Process,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary select-none">Simplified.</span>
        </h1>
        
        <p className="font-body-lg text-xl md:text-2xl text-on-surface-variant max-w-3xl mx-auto mb-12 opacity-80 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          From registration to the VVPAT window. Get a verified, step-by-step roadmap tailored to your specific station and local laws.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
          <Link 
            href="/region" 
            className="group relative w-full sm:w-auto px-10 py-5 bg-primary text-on-primary rounded-2xl font-button overflow-hidden transition-all hover:translate-y-[-4px] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="relative flex items-center justify-center gap-3">
              <span className="font-bold uppercase tracking-widest">Get My Roadmap</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </div>
          </Link>
          
          <Link 
            href="/auth" 
            className="w-full sm:w-auto px-10 py-5 border border-outline-variant hover:border-primary hover:bg-primary/5 rounded-2xl font-button transition-all flex items-center justify-center gap-2">
            <span className="font-bold uppercase tracking-widest">Sign In to Sync</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
