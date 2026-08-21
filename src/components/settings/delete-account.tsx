'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { AlertTriangle, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function DeleteAccount() {
  const t = useTranslations('settings');
  const [open, setOpen] = useState(false);
  const [confirmValue, setConfirmValue] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setInput('');
    setError(null);
    fetch('/api/account/me')
      .then((res) => res.json())
      .then((data) => setConfirmValue(data.confirmValue ?? ''))
      .catch(() => setConfirmValue(''));
  }, [open]);

  const isMatch =
    confirmValue !== null && confirmValue !== '' && input === confirmValue;

  async function handleDelete() {
    if (!isMatch) return;
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch('/api/account', { method: 'DELETE' });
      if (!res.ok) throw new Error();
      await signOut({ callbackUrl: '/login' });
    } catch {
      setDeleting(false);
      setError(t('deleteAccountError'));
    }
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 rounded-lg border border-red-200 p-4 dark:border-red-900/50">
        <div>
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
            {t('deleteAccountTitle')}
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {t('deleteAccountDesc')}
          </p>
        </div>
        <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
          {t('deleteAccountCta')}
        </Button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !deleting && setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500" />
                <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
                  {t('deleteAccountConfirmTitle')}
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                disabled={deleting}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
              {t('deleteAccountConfirmDesc')}
            </p>

            <p className="mb-2 text-sm text-neutral-700 dark:text-neutral-300">
              {confirmValue === null ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  {t('connectionsLoading')}
                </span>
              ) : (
                t.rich('deleteAccountTypeToConfirm', {
                  value: confirmValue,
                  strong: (chunks) => (
                    <strong className="font-semibold text-neutral-900 dark:text-neutral-50">
                      {chunks}
                    </strong>
                  ),
                })
              )}
            </p>

            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={confirmValue === null || deleting}
              autoFocus
              autoComplete="off"
            />

            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {error}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={deleting}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={!isMatch || deleting}
              >
                {deleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  t('deleteAccountCta')
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
