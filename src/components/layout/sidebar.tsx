'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Calendar,
  Users,
  GitBranch,
  BarChart3,
  Settings,
  GitPullRequestArrow,
  LogOut,
} from 'lucide-react';
import { motion } from 'motion/react';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';

const menu = [
  { href: '/dashboard', key: 'dashboard', icon: LayoutDashboard },
  { href: '/projects', key: 'projects', icon: FolderKanban },
  { href: '/tasks', key: 'tasks', icon: CheckSquare },
  { href: '/calendar', key: 'calendar', icon: Calendar },
  { href: '/team', key: 'team', icon: Users },
  { href: '/repositories', key: 'repositories', icon: GitBranch },
  { href: '/analytics', key: 'analytics', icon: BarChart3 },
] as const;

const general = [
  { href: '/settings', key: 'settings', icon: Settings },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations('sidebar');

  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/login',
    });
  };

  return (
    <aside
      className="
        sticky top-0
        flex h-screen w-64 shrink-0 flex-col
        border-r border-neutral-200
        bg-white
        dark:border-neutral-800
        dark:bg-neutral-950
        rounded-r-2xl
      "
    >
      {/* LOGO */}
      <div className="shrink-0 px-6 py-6">
        <div className="flex items-center gap-2">
          <GitPullRequestArrow className="h-6 w-6 text-emerald-700 dark:text-emerald-500" />

          <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
            TrackHub
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex min-h-0 flex-1 flex-col px-4">
        {/* MENU */}
        <div className="min-h-0 flex-1 overflow-y-auto pt-8">
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
            {t('menu')}
          </p>

          <nav className="flex flex-col gap-1">
            {menu.map((item) => {
              const active = pathname?.startsWith(item.href);

              return (
                <Link key={item.href} href={item.href} className="relative">
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-lg bg-emerald-50 dark:bg-emerald-950"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className={cn(
                      'relative z-10 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100',
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {t(item.key)}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* GENERAL */}
          <p className="mb-2 mt-6 px-2 text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
            {t('general')}
          </p>

          <nav className="flex flex-col gap-1">
            {general.map((item) => {
              const active = pathname?.startsWith(item.href);

              return (
                <Link key={item.href} href={item.href} className="relative">
                  <span
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100',
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {t(item.key)}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* LOGOUT - TEPAT DI BAWAH SETTINGS */}
          <div className="mt-1 ">
            <button
              type="button"
              onClick={handleLogout}
              className="
                flex w-full items-center gap-3
                rounded-lg px-3 py-2
                text-left text-sm font-medium
                text-neutral-600
                transition-colors
                hover:bg-red-50 hover:text-red-600
                dark:text-neutral-400
                dark:hover:bg-red-950/40
                dark:hover:text-red-400
              "
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
