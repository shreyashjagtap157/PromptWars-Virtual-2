"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme, language, setLanguage } = useStore();

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', href: '/app' },
    { name: 'My Guide', icon: 'map', href: '/guide' },
    { name: 'Region', icon: 'location_on', href: '/region' },
    { name: 'Multilingual', icon: 'translate', href: '/translate' },
  ];

  const languages = [
    { code: 'en-US', name: 'English' },
    { code: 'hi-IN', name: 'हिन्दी' },
    { code: 'mr-IN', name: 'मराठी' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-outline-variant/30 hidden lg:flex flex-col z-50">
      <div className="p-8 border-b border-outline-variant/10">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">account_balance</span>
          </div>
          <span className="font-h1 text-xl font-black text-on-surface tracking-tighter group-hover:text-primary transition-colors">CivicGuide</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex items-center gap-4 px-6 py-4 rounded-xl font-body-md transition-all cursor-pointer group ${pathname === item.href ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}>
            <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="font-bold text-sm tracking-tight">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Preferences Section */}
      <div className="p-6 space-y-8 border-t border-outline-variant/10 bg-surface-container-low/20">
        
        {/* Language Switcher */}
        <div className="space-y-3">
          <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant font-black">Language</span>
          <div className="grid grid-cols-1 gap-2">
            {languages.map((lang) => (
              <button 
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-left px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${language === lang.code ? 'bg-primary/10 text-primary border border-primary/20' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}>
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="space-y-3">
          <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant font-black">Theme</span>
          <div className="flex bg-surface-container-highest rounded-xl p-1 gap-1">
            {(['light', 'dark'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-all cursor-pointer ${theme === t ? 'bg-surface text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>
                <span className="material-symbols-outlined text-[18px]">
                  {t === 'light' ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
