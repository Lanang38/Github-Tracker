'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Check, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function NicknameSettings() {
  const t = useTranslations('settings');
  const { update } = useSession();

  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/account/nickname')
      .then((res) => res.json())
      .then((data) => setNickname(data.nickname ?? ''))
      .catch(() => setError(t('nicknameError')))
      .finally(() => setLoading(false));
  }, [t]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError(null);

    try {
      const res = await fetch('/api/account/nickname', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname }),
      });

      if (!res.ok) throw new Error();

      await update();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError(t('nicknameError'));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
        <Loader2 className="h-4 w-4 animate-spin" />
        {t('connectionsLoading')}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder={t('nicknamePlaceholder')}
        maxLength={32}
        disabled={saving}
      />

      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}

      <Button
        size="sm"
        className="self-end"
        disabled={saving || nickname.trim().length === 0}
        onClick={handleSave}
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : saved ? (
          <Check className="h-4 w-4" />
        ) : null}
        {saved ? t('nicknameSaved') : t('nicknameSave')}
      </Button>
    </div>
  );
}