"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import { useAuth } from '@/contexts/AuthContext';

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme, language, setLanguage } = useStore();
  const { user, signOut } = useAuth();

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
    <aside className="fixed left-0 top-0 h-screen w-64 border-r hidden lg:flex flex-col border-slate-200 dark:border-slate-800 shadow-none bg-white dark:bg-slate-950 z-50">
      <div className="px-6 pt-lg pb-md border-b border-outline-variant/30">
        <Link href="/" className="flex items-center gap-xs mb-base pointer-events-auto cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center">
             <span className="material-symbols-outlined text-[20px]">account_balance</span>
          </div>
          <span className="text-lg font-black text-slate-900 dark:text-slate-50 font-h3 tracking-tight">CivicGuide</span>
        </Link>
        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest block pl-10">Election Assistant</span>
      </div>

      <div className="flex flex-col pt-sm pb-8 h-full px-sm gap-xs">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "cursor-pointer flex items-center gap-3 px-6 py-4 rounded-lg font-sans text-[13px] font-semibold transition-transform hover:translate-x-1 duration-200",
                isActive 
                  ? "text-slate-900 dark:text-white border-r-4 border-slate-900 dark:border-slate-50 bg-slate-50 dark:bg-slate-900/50" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/30"
              )}
            >
              <span className={cn("material-symbols-outlined text-[20px]", isActive && "icon-fill")}>{link.icon}</span>
              {link.name}
            </Link>
          )
        })}

        <div className="mt-auto flex flex-col gap-2">
          {/* Auth button */}
          <div className="px-4 py-3 border-t border-outline-variant/30">
            {user ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 px-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 truncate flex-1">{user.email}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="text-xs text-error hover:bg-error/10 rounded-lg px-3 py-2 transition-colors text-left font-medium">
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-medium px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                <span className="material-symbols-outlined text-[18px]">login</span>
                Sign In
              </Link>
            )}
          </div>
          
          <div className="px-6 py-4 border-t border-outline-variant/30 flex items-center justify-between">
            <button 
                onClick={() => setLanguage(language === 'en-US' ? 'es-ES' : 'en-US')}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors p-2 rounded-full active:scale-[0.98]">
                <span className="material-symbols-outlined text-[20px]">language</span>
            </button>
            <button 
                onClick={toggleTheme}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors p-2 rounded-full active:scale-[0.98]">
                <span className="material-symbols-outlined text-[20px]">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
