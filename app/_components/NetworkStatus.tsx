'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext';
import { subscribeToSyncStatus } from '../_lib/sync';

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setHasChanged(true);
      const timer = setTimeout(() => setHasChanged(false), 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setHasChanged(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const unsubscribe = subscribeToSyncStatus(({ pendingCount, isSyncing: syncing }) => {
      setPendingSyncCount(pendingCount);
      setIsSyncing(syncing);
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      unsubscribe();
    };
  }, []);

  // When offline, or when sync is pending/active, or immediately after reconnect, display the small unobtrusive badge.
  if (isOnline && !hasChanged && pendingSyncCount === 0 && !isSyncing) {
    return null;
  }

  const offlineText = {
    ta: 'ஆஃப்லைன் · இந்த சாதனத்தில் சேமிக்கப்பட்டது',
    ar: 'غير متصل · محفوظ على هذا الجهاز',
    en: 'Offline · Saved on this device',
  }[language];

  const syncPendingText = {
    ta: isSyncing ? 'ஒத்திசைக்கிறது...' : 'ஒத்திசைவு நிலுவை',
    ar: isSyncing ? 'جارٍ المزامنة...' : 'المزامنة معلقة',
    en: isSyncing ? 'Syncing...' : 'Sync Pending',
  }[language];

  const onlineText = {
    ta: 'ஒத்திசைக்கப்பட்டது ✓',
    ar: 'تمت المزامنة ✓',
    en: 'Synced ✓',
  }[language];

  let displayText = onlineText;
  let statusColor = 'bg-emerald-500';

  if (!isOnline) {
    displayText = offlineText;
    statusColor = 'bg-amber-500';
  } else if (isSyncing || pendingSyncCount > 0) {
    displayText = syncPendingText;
    statusColor = 'bg-sky-500 animate-pulse';
  }

  return (
    <div className="flex justify-center px-4 py-1.5 transition-all">
      <div
        className={[
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors shadow-xs',
          !isOnline
            ? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
            : pendingSyncCount > 0
            ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
        ].join(' ')}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
        <span>{displayText}</span>
      </div>
    </div>
  );
}
