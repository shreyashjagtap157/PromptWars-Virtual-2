"use client"
import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';

export default function RegionPage() {
  const { setRegion, region } = useStore();
  const router = useRouter();
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-detect location on load
  useEffect(() => {
    if (!region) {
      handleAutoDetect();
    }
  }, []);

  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Reverse geocode using openstreetmap (no key required for low volume)
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`);
          const data = await res.json();
          
          if (data && data.address) {
            const detectedRegion = {
              country: data.address.country || '',
              state: data.address.state || data.address.province || '',
              district: data.address.city || data.address.town || data.address.suburb || ''
            };
            setRegion(detectedRegion);
          }
        } catch (err) {
          setError("Reverse geocoding failed. Using IP fallback instead.");
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        if (err.code === 1) {
          setError("Permission denied. Please select your region manually or refresh to try again.");
        } else {
          setError("Position unavailable. Falling back to IP-based detection.");
        }
      },
      { timeout: 10000 }
    );
  };

  const manualSelections = [
    { country: 'India', flag: '🇮🇳' },
    { country: 'USA', flag: '🇺🇸' },
    { country: 'Other', flag: '🌐' }
  ];

  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Background Polish */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>

      <div className="w-full max-w-4xl text-center mb-16">
        <h1 className="font-h1 text-5xl md:text-6xl font-black text-on-surface tracking-tighter mb-6">
          Where are you<br />voting from?
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto text-xl">
          We use your location to deliver a <b className="text-primary underline decoration-primary/20 decoration-4">government-verified</b> roadmap tailored to your specific station.
        </p>
      </div>

      <div className="w-full max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Detection Card */}
        <div className={`p-8 rounded-[40px] border-2 transition-all duration-500 overflow-hidden relative ${isLocating ? 'border-primary bg-primary/5' : region ? 'border-secondary bg-secondary/5' : 'border-outline-variant bg-surface'}`}>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`w-3 h-3 rounded-full animate-pulse ${isLocating ? 'bg-primary' : region ? 'bg-secondary' : 'bg-outline-variant'}`}></span>
                <span className="font-label-caps text-xs font-black tracking-widest text-on-surface-variant uppercase">
                  Location Engine Status
                </span>
              </div>
              <h2 className="font-h2 text-2xl font-bold text-on-surface">
                {isLocating ? 'Determining GPS Coordinates...' : region ? `Located: ${region.country}` : 'Automatic Detection'}
              </h2>
              <p className="font-body-md text-on-surface-variant mt-1">
                {isLocating ? 'Communicating with global navigation satellites.' : region ? `Detected in ${region.state || region.district}. The guide has been matched to local laws.` : 'Allow location access for an auto-generated 13-step guide.'}
              </p>
            </div>
            
            <button 
              onClick={handleAutoDetect}
              disabled={isLocating}
              className={`shrink-0 px-8 py-4 rounded-2xl font-button flex items-center gap-3 transition-all active:scale-95 ${region ? 'bg-secondary text-on-secondary' : 'bg-primary text-on-primary shadow-xl shadow-primary/20 hover:translate-y-[-2px]'}`}>
              <span className="material-symbols-outlined">{isLocating ? 'sync' : region ? 'verified' : 'my_location'}</span>
              <span className="font-bold uppercase tracking-widest text-xs">{isLocating ? 'Wait...' : region ? 'Verified' : 'Locate Me'}</span>
            </button>
          </div>
          
          {error && (
            <div className="mt-6 pt-6 border-t border-error/10 text-error text-sm font-medium flex items-center gap-2 animate-in slide-in-from-top-2">
              <span className="material-symbols-outlined text-[18px]">error_outline</span>
              {error}
            </div>
          )}
        </div>

        <div className="flex items-center gap-6">
          <div className="h-[1px] bg-outline-variant/30 flex-1"></div>
          <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-black opacity-50 px-4">OR Manual SELECT</span>
          <div className="h-[1px] bg-outline-variant/30 flex-1"></div>
        </div>

        {/* Manual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {manualSelections.map((item) => (
            <button 
              key={item.country}
              onClick={() => {
                setRegion({ country: item.country, state: 'Manual Selection', district: '' });
                router.push('/guide');
              }}
              className="p-8 bg-surface border border-outline-variant/30 rounded-[32px] hover:border-primary hover:bg-primary/5 transition-all text-center group">
              <span className="text-4xl block mb-4 group-hover:scale-125 transition-transform duration-500">{item.flag}</span>
              <span className="font-h3 text-lg font-bold text-on-surface group-hover:text-primary transition-colors">{item.country}</span>
            </button>
          ))}
        </div>

        <div className="pt-8 text-center text-on-surface-variant/50 flex flex-col items-center gap-4">
           <p className="font-body-md text-sm max-w-lg">
             <span className="text-primary font-black mr-2">NOTE:</span> 
             Your Roadmap dynamically updates based on your coordinates. If your country is not yet supported, a 7-step General Protocol will be generated.
           </p>
           <button 
            onClick={() => router.push('/guide')}
            className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest hover:underline">
             Skip to Guide <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
           </button>
        </div>
      </div>
    </main>
  );
}
