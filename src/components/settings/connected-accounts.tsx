'use client';

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ALL_PROVIDERS = ['google', 'github'] as const;
type Provider = (typeof ALL_PROVIDERS)[number];

const PROVIDER_LABEL: Record<Provider, string> = {
  google: 'Google',
  github: 'GitHub',
};

export function ConnectedAccounts() {
  const t = useTranslations('settings');
  const [linked, setLinked] = useState<Provider[] | null>(null);
  const [connecting, setConnecting] = useState<Provider | null>(null);

  useEffect(() => {
    fetch('/api/account/providers')
      .then((res) => res.json())
      .then((data) => setLinked((data.providers as Provider[]) ?? []))
      .catch(() => setLinked([]));
  }, []);

  async function handleConnect(provider: Provider) {
    setConnecting(provider);
    // Runs while the user already has an active session, so the signIn
    // callback in auth.ts links this provider to the current user instead
    // of treating it as a fresh login.
    await signIn(provider, { callbackUrl: '/settings' });
  }

  if (linked === null) {
    return (
      <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
        <Loader2 className="h-4 w-4 animate-spin" />
        {t('connectionsLoading')}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {ALL_PROVIDERS.map((provider) => {
        const isLinked = linked.includes(provider);
        return (
          <div
            key={provider}
            className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 dark:border-neutral-800"
          >
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
              {PROVIDER_LABEL[provider]}
            </span>
            {isLinked ? (
              <span className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
                <Check className="h-4 w-4" />
                {t('connected')}
              </span>
            ) : (
              <Button
                variant="outline"
                size="sm"
                disabled={connecting !== null}
                onClick={() => handleConnect(provider)}
              >
                {connecting === provider ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  t('connect')
                )}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
