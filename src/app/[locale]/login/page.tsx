import { useTranslations } from "next-intl";
import { GitPullRequestArrow, LayoutDashboard, Users2, Video } from "lucide-react";
import { OAuthButtons } from "@/components/auth/oauth-buttons";

export default function LoginPage() {
  const t = useTranslations("login");

  return (
    <div className="flex min-h-screen">
      {/* Left: branding panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-emerald-800 p-10 text-white lg:flex">
        <div className="flex items-center gap-2">
          <GitPullRequestArrow className="h-6 w-6" />
          <span className="text-lg font-bold">TrackHub</span>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="max-w-sm text-3xl font-bold leading-tight">
            {t('tagline')}
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm text-emerald-100">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700">
                <LayoutDashboard className="h-4 w-4" />
              </span>
              Dashboard proyek terhubung langsung ke repo GitHub
            </div>
            <div className="flex items-center gap-3 text-sm text-emerald-100">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700">
                <Users2 className="h-4 w-4" />
              </span>
              Lihat progress tiap anggota tim secara real-time
            </div>
            <div className="flex items-center gap-3 text-sm text-emerald-100">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700">
                <Video className="h-4 w-4" />
              </span>
              Jadwalkan meeting dengan link Google Meet otomatis
            </div>
          </div>
        </div>

        <p className="text-xs text-emerald-200">
          © {new Date().getFullYear()} TrackHub. All rights reserved.
        </p>

        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-700/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-emerald-600/30 blur-3xl"
        />
      </div>

      {/* Right: login form */}
      <div className="flex w-full flex-1 flex-col items-center justify-center bg-white px-6 dark:bg-neutral-950">
        <div className="flex w-full max-w-sm flex-col gap-8">
          <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
            <div className="mb-2 flex items-center gap-2 lg:hidden">
              <GitPullRequestArrow className="h-6 w-6 text-emerald-700 dark:text-emerald-500" />
              <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
                TrackHub
              </span>
            </div>
            <h1 className="text-2xl font-bold mx-auto text-neutral-900 dark:text-neutral-50">
              {t('title')}
            </h1>
            <p className="text-sm text-center text-neutral-500 dark:text-neutral-400">
              {t('subtitle')}
            </p>
          </div>

          <OAuthButtons />

          <p className="text-center text-xs text-neutral-400 dark:text-neutral-500">
            {t('terms')}
          </p>
        </div>
      </div>
    </div>
  );
}
