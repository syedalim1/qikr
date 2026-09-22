'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import BottomNav from './BottomNav';
import NetworkStatus from './NetworkStatus';
import SessionRecoveryModal from './SessionRecoveryModal';
import { initializeLocalDatabase } from '../_db/local';
import { flushSyncQueue, syncServerRoutines } from '../_lib/sync';
import { startReminderScheduler } from '../_lib/notifications';
import { getLocalSettings } from '../_db/settings';

interface Props {
  children: React.ReactNode;
}

function applyTheme(theme: 'system' | 'light' | 'dark') {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;

  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export default function AppShell({ children }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Initialize local-first database and sync
    initializeLocalDatabase().then(() => {
      flushSyncQueue();
      syncServerRoutines();
    });

    // 2. Start reminder notification scheduler
    const stopScheduler = startReminderScheduler();

    // 3. Register PWA Service Worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(() => {
            // Service worker active
          })
          .catch(() => {
            // Service worker fallback
          });
      });
    }

    // 4. Initialize & watch theme preference
    getLocalSettings().then((settings) => {
      const activeTheme = settings.theme || 'system';
      applyTheme(activeTheme);
    });

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      getLocalSettings().then((settings) => {
        if (!settings.theme || settings.theme === 'system') {
          applyTheme('system');
        }
      });
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    const handleCustomThemeChange = (e: CustomEvent<'system' | 'light' | 'dark'>) => {
      if (e.detail) {
        applyTheme(e.detail);
      }
    };

    window.addEventListener('qikr-theme-change', handleCustomThemeChange as EventListener);

    return () => {
      stopScheduler();
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
      window.removeEventListener('qikr-theme-change', handleCustomThemeChange as EventListener);
    };
  }, []);

  if (pathname?.startsWith('/admin')) {
    return <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between selection:bg-emerald-500/20">
      <div className="w-full">
        <NetworkStatus />
        <main className="max-w-lg mx-auto pb-24">{children}</main>
      </div>
      <SessionRecoveryModal />
      <BottomNav />
    </div>
  );
}

