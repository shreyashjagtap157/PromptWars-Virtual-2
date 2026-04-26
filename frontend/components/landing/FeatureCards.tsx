import React from 'react';

export function FeatureCards() {
  return (
    <section className="px-6 md:px-12 py-xl max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-h2 text-h2 text-on-surface mb-4">Everything you need to vote confidently</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          We've broken down complex institutional processes into clear, actionable steps.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
        {/* Feature 1 */}
        <div className="md:col-span-2 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/40 shadow-[0px_1px_3px_rgba(15,23,42,0.05),0px_10px_15px_-3px_rgba(15,23,42,0.08)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-fixed/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="w-12 h-12 rounded-lg bg-secondary-container/30 text-on-secondary-container flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[24px]">steppers</span>
          </div>
          <h3 className="font-h3 text-h3 text-on-surface mb-3 relative z-10">Step-by-step guidance</h3>
          <p className="font-body-md text-body-md text-on-surface-variant relative z-10 max-w-md">
            From registration to casting your ballot, follow a personalized timeline that adapts to your specific situation and deadlines.
          </p>
          <div className="mt-8 flex gap-3 relative z-10 opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-2 rounded-full bg-secondary"></div>
            <div className="w-8 h-2 rounded-full bg-outline-variant"></div>
            <div className="w-8 h-2 rounded-full bg-outline-variant"></div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/40 shadow-[0px_1px_3px_rgba(15,23,42,0.05),0px_10px_15px_-3px_rgba(15,23,42,0.08)] flex flex-col">
          <div className="w-12 h-12 rounded-lg bg-tertiary-fixed/40 text-on-tertiary-fixed-variant flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[24px]">map</span>
          </div>
          <h3 className="font-h3 text-h3 text-on-surface mb-3">Region-specific info</h3>
          <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
            Election laws vary widely. Get accurate details tailored exactly to your local jurisdiction.
          </p>
          <div className="mt-6 w-full h-24 rounded-lg bg-surface-container-high relative overflow-hidden">
             <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#1b1b1d 1px, transparent 1px)', backgroundSize: '8px 8px'}}></div>
             <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary">location_on</span>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/40 shadow-[0px_1px_3px_rgba(15,23,42,0.05),0px_10px_15px_-3px_rgba(15,23,42,0.08)]">
          <div className="w-12 h-12 rounded-lg bg-primary-fixed/40 text-on-primary-fixed-variant flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[24px]">translate</span>
          </div>
          <h3 className="font-h3 text-h3 text-on-surface mb-3">Multilingual support</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Civic participation is for everyone. Access critical information in over 15 languages, clearly translated.
          </p>
        </div>

        {/* Feature 4 Stats */}
        <div className="md:col-span-2 bg-inverse-surface text-inverse-on-surface rounded-xl p-8 shadow-[0px_1px_3px_rgba(15,23,42,0.05),0px_10px_15px_-3px_rgba(15,23,42,0.08)] relative overflow-hidden flex flex-col justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-inverse-surface to-surface-tint opacity-50"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="font-label-caps text-label-caps text-inverse-primary uppercase tracking-widest mb-2">Trusted By</p>
              <p className="font-h1 text-h1 text-white">2.5M+</p>
              <p className="font-body-lg text-body-lg text-inverse-on-surface/80">Citizens successfully navigated the process.</p>
            </div>
            <div className="hidden md:flex w-20 h-20 rounded-full border-4 border-inverse-primary/30 items-center justify-center">
              <span className="material-symbols-outlined text-[40px] text-inverse-primary">check_circle</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
