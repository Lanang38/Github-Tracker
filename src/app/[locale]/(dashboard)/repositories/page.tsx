import { useTranslations } from 'next-intl';
import { RepositoryList } from '@/components/repositories/repository-list';

export default function RepositoriesPage() {
  const t = useTranslations('repositories');

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          {t('title')}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {t('subtitle')}
        </p>
      </div>

      <RepositoryList />
    </div>
  );
}
