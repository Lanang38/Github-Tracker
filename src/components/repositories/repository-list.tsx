'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Star,
  GitFork,
  CircleDot,
  Lock,
  Globe,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';

interface Repository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  private: boolean;
  language: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  updatedAt: string;
}

type LoadState =
  | { status: 'loading' }
  | { status: 'not-connected' }
  | { status: 'error' }
  | { status: 'ready'; repos: Repository[] };

export function RepositoryList() {
  const t = useTranslations('repositories');
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  async function load() {
    setState({ status: 'loading' });
    try {
      const res = await fetch('/api/repositories');
      const data = await res.json();

      if (res.status === 409 && data.code === 'GITHUB_NOT_CONNECTED') {
        setState({ status: 'not-connected' });
        return;
      }
      if (!res.ok) {
        setState({ status: 'error' });
        return;
      }
      setState({ status: 'ready', repos: data.repositories });
    } catch {
      setState({ status: 'error' });
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (state.status === 'loading') {
    return (
      <div className="flex items-center gap-2 py-10 text-sm text-neutral-500 dark:text-neutral-400">
        <Loader2 className="h-4 w-4 animate-spin" />
        {t('loading')}
      </div>
    );
  }

  if (state.status === 'not-connected') {
    return (
      <Card className="flex flex-col items-start gap-3 p-6">
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          {t('notConnected')}
        </p>
        <Link href="/settings" className={buttonVariants({ size: 'sm' })}>
          {t('goToSettings')}
        </Link>
      </Card>
    );
  }

  if (state.status === 'error') {
    return (
      <Card className="flex flex-col items-start gap-3 p-6">
        <p className="text-sm text-red-600 dark:text-red-500">{t('error')}</p>
        <Button variant="outline" size="sm" onClick={load}>
          <RefreshCw className="h-4 w-4" />
          {t('retry')}
        </Button>
      </Card>
    );
  }

  if (state.repos.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {t('empty')}
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {state.repos.map((repo) => (
        <Card key={repo.id} className="flex flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-2">
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-sm font-semibold text-neutral-900 hover:underline dark:text-neutral-50"
              title={repo.fullName}
            >
              {repo.name}
            </a>
            <Badge variant={repo.private ? 'pending' : 'completed'}>
              {repo.private ? (
                <>
                  <Lock className="h-3 w-3" /> {t('private')}
                </>
              ) : (
                <>
                  <Globe className="h-3 w-3" /> {t('public')}
                </>
              )}
            </Badge>
          </div>

          <p className="line-clamp-2 min-h-10 text-sm text-neutral-500 dark:text-neutral-400">
            {repo.description || t('noDescription')}
          </p>

          <div className="mt-auto flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
            {repo.language && (
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              {repo.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3.5 w-3.5" />
              {repo.forks}
            </span>
            <span className="flex items-center gap-1">
              <CircleDot className="h-3.5 w-3.5" />
              {repo.openIssues}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
