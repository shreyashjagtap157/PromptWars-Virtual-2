"use client"
import Link from 'next/link';
import { useStore } from '@/store/useStore';

export function Navbar() {
  const { theme, setTheme, language, setLanguage } = useStore();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en-US' ? 'es-ES' : 'en-US');
  };

  return (
    <nav className="fixed top-0 w-full z-40 border-b border-slate-200 dark:border-slate-800 shadow-[0px_1px_3px_rgba(15,23,42,0.05)] bg-white/95 dark:bg-slate-950/95 backdrop-blur-md flex justify-between items-center h-16 px-6 lg:hidden">
      <div className="flex items-center gap-xs">
        <span className="material-symbols-outlined text-[24px] text-primary">account_balance</span>
        <span className="text-xl font-bold text-slate-900 dark:text-slate-50 tracking-tight font-h3">CivicGuide</span>
      </div>
      
      <div className="flex items-center gap-sm">
        <button 
          onClick={toggleLanguage}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-200 p-2 rounded-full active:scale-[0.98] flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]">language</span>
        </button>
        <button 
          onClick={toggleTheme}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-200 p-2 rounded-full active:scale-[0.98] flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
        </button>
        <button className="font-button text-button font-medium tracking-tight text-slate-900 dark:text-slate-50 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-200 px-4 py-2 rounded-lg active:scale-[0.98]">
          Sign In
        </button>
      </div>
    </nav>
  );
}
