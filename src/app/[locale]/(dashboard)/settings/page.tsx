import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/settings/theme-toggle';
import { LanguageSwitcher } from '@/components/settings/language-switcher';
import { ConnectedAccounts } from '@/components/settings/connected-accounts';
import { DeleteAccount } from '@/components/settings/delete-account';
import { NicknameSettings } from '@/components/settings/nickname-settings';

export default function SettingsPage() {
  const t = useTranslations('settings');

  return (
    <div className="flex max-w-5xl flex-col gap-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          {t('title')}
        </h1>

        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {t('subtitle')}
        </p>
      </div>

      {/* BARIS PERTAMA */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* APPEARANCE */}
        <Card>
          <CardHeader>
            <CardTitle>{t('appearance')}</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-4">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t('appearanceDesc')}
            </p>

            <ThemeToggle />
          </CardContent>
        </Card>

        {/* NICKNAME */}
        <Card>
          <CardHeader>
            <CardTitle>{t('nickname')}</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-3 text-sm text-neutral-500 dark:text-neutral-400">
              {t('nicknameDesc')}
            </p>

            <NicknameSettings />
          </CardContent>
        </Card>
      </div>

      {/* BARIS KEDUA */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* KOLOM KIRI */}
        <div className="flex flex-col gap-6">
          {/* LANGUAGE */}
          <Card>
            <CardHeader>
              <CardTitle>{t('language')}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-start gap-4">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {t('languageDesc')}
              </p>

              <LanguageSwitcher />
            </CardContent>
          </Card>

          {/* DANGER ZONE */}
          <Card>
            <CardHeader>
              <CardTitle>{t('dangerZone')}</CardTitle>
            </CardHeader>

            <CardContent>
              <DeleteAccount />
            </CardContent>
          </Card>
        </div>

        {/* KOLOM KANAN - CONNECTIONS */}
        <Card className="h-full">
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
      </div>
    </div>
  );
}
