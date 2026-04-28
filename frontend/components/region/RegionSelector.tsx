"use client"
import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';

const COUNTRIES: Record<string, { states: Record<string, string[]> }> = {
  'US': {
    states: {
      'California': ['District 12', 'District 4', 'District 8'],
      'New York': ['District 1', 'District 3'],
      'Texas': ['District 5', 'District 10'],
    }
  },
  'India': {
    states: {
      'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
      'Delhi': ['New Delhi', 'Central Delhi', 'South Delhi'],
      'Karnataka': ['Bangalore North', 'Bangalore South', 'Mysore'],
    }
  },
  'Canada': {
    states: {
      'Ontario': ['Toronto Centre', 'Ottawa South'],
      'Quebec': ['Montreal', 'Quebec City'],
    }
  },
};

export function RegionSelector() {
  const region = useStore((state) => state.region);
  const setRegion = useStore((state) => state.setRegion);
  const router = useRouter();
  
  const [selectedCountry, setSelectedCountry] = useState(region?.country || '');
  const [selectedState, setSelectedState] = useState(region?.state || '');
  const [selectedDistrict, setSelectedDistrict] = useState(region?.district || '');

  const countryData = selectedCountry ? COUNTRIES[selectedCountry] : null;
  const states = countryData ? Object.keys(countryData.states) : [];
  const districts = countryData && selectedState ? (countryData.states[selectedState] || []) : [];

  const handleAutoDetect = () => {
    // Simulate auto-detection defaulting to India
    setRegion({ country: 'India', state: 'Maharashtra', district: 'Mumbai' });
    router.push('/guide');
  }

  const handleManualSelect = () => {
    if (selectedCountry && selectedState && selectedDistrict) {
      setRegion({ country: selectedCountry, state: selectedState, district: selectedDistrict });
      router.push('/guide');
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Detection & Selection */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        {/* Auto Detect Card */}
        <div className="bg-surface rounded-xl border border-outline-variant p-6 shadow-[0px_1px_3px_rgba(15,23,42,0.05),0px_10px_15px_-3px_rgba(15,23,42,0.08)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container"></div>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">my_location</span>
            </div>
            <div>
              <h2 className="font-h3 text-h3 text-on-surface mb-1">Detect My Location</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Use your device&apos;s location to quickly find your voting district.</p>
            </div>
          </div>
          <button
            onClick={handleAutoDetect}
            className="w-full bg-primary text-on-primary font-button text-button py-3 px-6 rounded-lg shadow-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="material-symbols-outlined text-[18px]">radar</span>
            Detect Location Automatically
          </button>
        </div>

        <div className="flex items-center gap-4 py-2">
          <div className="h-px bg-outline-variant/50 flex-1"></div>
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Or select manually</span>
          <div className="h-px bg-outline-variant/50 flex-1"></div>
        </div>

        {/* Manual Selection Card */}
        <div className="bg-surface rounded-xl border border-outline-variant p-6 shadow-[0px_1px_3px_rgba(15,23,42,0.05)]">
          <h2 className="font-h3 text-h3 text-on-surface mb-6">Manual Selection</h2>
          <div className="flex flex-col gap-5">
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 ml-1">Country</label>
              <div className="relative">
                <select 
                  value={selectedCountry}
                  onChange={(e) => { setSelectedCountry(e.target.value); setSelectedState(''); setSelectedDistrict(''); }}
                  className="w-full appearance-none bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-sm">
                  <option disabled value="">Select Country</option>
                  {Object.keys(COUNTRIES).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 ml-1">State / Province</label>
              <div className="relative">
                <select 
                  value={selectedState}
                  onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(''); }}
                  disabled={!selectedCountry}
                  className={`w-full appearance-none border rounded-lg px-4 py-3 font-body-md text-body-md transition-all shadow-sm ${!selectedCountry ? 'bg-surface-container-low border-outline-variant/50 text-on-surface-variant opacity-70 cursor-not-allowed' : 'bg-surface-container-lowest border-outline-variant text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10'}`}>
                  <option disabled value="">Select State</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <div className={`absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-on-surface-variant ${!selectedCountry ? 'opacity-70' : ''}`}>
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 ml-1">District / County</label>
              <div className="relative">
                <select 
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedState}
                  className={`w-full appearance-none border rounded-lg px-4 py-3 font-body-md text-body-md transition-all shadow-sm ${!selectedState ? 'bg-surface-container-low border-outline-variant/50 text-on-surface-variant opacity-70 cursor-not-allowed' : 'bg-surface-container-lowest border-outline-variant text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10'}`}>
                  <option disabled value="">Select District</option>
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <div className={`absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-on-surface-variant ${!selectedState ? 'opacity-70' : ''}`}>
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
              {!selectedState && (
                <p className="font-body-md text-[13px] text-on-surface-variant mt-2 ml-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Select a state first to view districts.
                </p>
              )}
            </div>
            
            <div className="mt-4">
               <button 
                  onClick={handleManualSelect}
                  disabled={!selectedDistrict} 
                  className="w-full bg-primary text-on-primary font-button text-button py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:bg-primary/90">
                  Confirm Manual Selection
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Visual Map Context */}
      <div className="lg:col-span-5">
        <div className="sticky top-24 bg-surface-container-low rounded-xl border border-outline-variant overflow-hidden h-[400px] lg:h-[600px] flex flex-col shadow-inner relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse scale-110"></div>
              <span className="material-symbols-outlined text-primary text-4xl">map</span>
            </div>
            <h3 className="font-h3 text-h3 text-on-surface mb-2">Regional Context</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Selecting your region ensures you receive only the ballot measures and candidate profiles applicable to your specific precinct.
            </p>
          </div>
          
          <div className="relative z-10 bg-surface border-t border-outline-variant p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">location_city</span>
            </div>
            <div>
              <div className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider mb-0.5">Current Selection</div>
              <div className="font-body-md text-[14px] font-semibold text-on-surface">
                 {region ? `${region.country}, ${region.state}, ${region.district}` : 'None selected'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
