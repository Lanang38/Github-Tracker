'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Bell } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function Header() {
  const { data: session } = useSession();
  const t = useTranslations('header');
  const [notifOpen, setNotifOpen] = useState(false);

  const displayName = session?.user?.nickname || session?.user?.name || '';
  const initial = displayName ? displayName.charAt(0).toUpperCase() : '?';

  return (
    <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-8 py-4 dark:border-neutral-800 dark:bg-neutral-950">
      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
        {t('greeting')},{' '}
        <span className="font-semibold">{displayName || '...'}</span>
      </p>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen((open) => !open)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
            aria-label={t('notifications')}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {notifOpen && (
            <div
              className={cn(
                'absolute right-0 z-20 mt-2 w-72 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900',
              )}
            >
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                {t('notifications')}
              </p>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                {t('notificationsEmpty')}
              </p>
            </div>
          )}
        </div>

        <Avatar
          src={session?.user?.image}
          alt={displayName}
          fallback={initial}
          size={40}
        />
      </div>
    </header>
  );
}
