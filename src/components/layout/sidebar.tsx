"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
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
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const menu = [
  { href: "/dashboard", key: "dashboard", icon: LayoutDashboard },
  { href: "/projects", key: "projects", icon: FolderKanban },
  { href: "/tasks", key: "tasks", icon: CheckSquare },
  { href: "/calendar", key: "calendar", icon: Calendar },
  { href: "/team", key: "team", icon: Users },
  { href: "/repositories", key: "repositories", icon: GitBranch },
  { href: "/analytics", key: "analytics", icon: BarChart3 },
] as const;

const general = [{ href: "/settings", key: "settings", icon: Settings }] as const;

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations("sidebar");

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-neutral-200 bg-white px-4 py-6 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mb-8 flex items-center gap-2 px-2">
        <GitPullRequestArrow className="h-6 w-6 text-emerald-700 dark:text-emerald-500" />
        <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
          TrackHub
        </span>
      </div>

      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
        {t("menu")}
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
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={cn(
                  "relative z-10 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                )}
              >
                <item.icon className="h-4 w-4" />
                {t(item.key)}
              </span>
            </Link>
          );
        })}
      </nav>

      <p className="mb-2 mt-6 px-2 text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
        {t("general")}
      </p>
      <nav className="flex flex-col gap-1">
        {general.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}>
              <span
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                )}
              >
                <item.icon className="h-4 w-4" />
                {t(item.key)}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
