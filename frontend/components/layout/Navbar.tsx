"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { theme, setTheme, language, setLanguage } = useStore();
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'My Guide', href: '/guide', icon: 'description' },
    { name: 'Region', href: '/region', icon: 'location_on' },
    { name: 'Dashboard', href: '/app', icon: 'person' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-40 border-b border-slate-200 dark:border-slate-800 shadow-[0px_1px_3px_rgba(15,23,42,0.05)] bg-white/95 dark:bg-slate-950/95 backdrop-blur-md flex justify-between items-center h-16 px-6 lg:hidden">
        <div className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-[24px] text-primary">account_balance</span>
          <span className="text-xl font-bold text-slate-900 dark:text-slate-50 tracking-tight font-h3">CivicGuide</span>
        </div>
        
        <div className="flex items-center gap-sm">
          <button 
            onClick={() => setLanguage(language === 'en-US' ? 'es-ES' : 'en-US')}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all p-2 rounded-full">
            <span className="material-symbols-outlined text-[20px]">language</span>
          </button>
          <button 
            onClick={toggleTheme}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all p-2 rounded-full">
            <span className="material-symbols-outlined text-[20px]">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all p-2 rounded-full">
            <span className="material-symbols-outlined text-[20px]">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-30 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-lg lg:hidden animate-in slide-in-from-top-2">
          <div className="flex flex-col py-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-6 py-4 font-sans text-[14px] font-semibold transition-colors",
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/30"
                  )}>
                  <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                  {link.name}
                </Link>
              );
            })}
            <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-3">
              {user ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 truncate">{user.email}</span>
                  <button onClick={() => { signOut(); setMenuOpen(false); }} className="text-sm text-error font-medium">Sign Out</button>
                </div>
              ) : (
                <Link href="/auth" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-primary font-medium text-sm">
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
