import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CivicGuide | Your Ultimate Election Roadmap',
  description: 'Exhaustive, location-aware election protocols and guides for India and the USA. Accessible, multilingual, and verified.',
};

export default function LandingPage() {
  return (
    <main className="flex flex-col">
      <HeroSection />

      <section className="px-6 md:px-12 py-12 border-y border-outline-variant/30 bg-surface">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-center">Verified information from official sources</span>
          <div className="flex flex-wrap justify-center gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">gavel</span>
              <span className="font-h3 text-sm font-bold">State Dept</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">how_to_vote</span>
              <span className="font-h3 text-sm font-bold">Electoral Board</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">account_balance</span>
              <span className="font-h3 text-sm font-bold">Civic Trust</span>
            </div>
          </div>
        </div>
      </section>

      <FeatureCards />
    </main>
  );
}
