import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/settings/theme-toggle';
import { LanguageSwitcher } from '@/components/settings/language-switcher';
import { ConnectedAccounts } from '@/components/settings/connected-accounts';
import { DeleteAccount } from '@/components/settings/delete-account';

export default function SettingsPage() {
  const t = useTranslations('settings');

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          {t('title')}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {t('subtitle')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('appearance')}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {t('appearanceDesc')}
          </p>
          <ThemeToggle />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('language')}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {t('languageDesc')}
          </p>
          <LanguageSwitcher />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('connections')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
            {t('connectionsDesc')}
          </p>
          <ConnectedAccounts />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('dangerZone')}</CardTitle>
        </CardHeader>
        <CardContent>
          <DeleteAccount />
        </CardContent>
      </Card>
    </div>
  );
}
