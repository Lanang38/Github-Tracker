import { getTranslations } from "next-intl/server";
import { GitPullRequestArrow, GitBranch } from "lucide-react";
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const t = await getTranslations("auth");
  const { callbackUrl } = await searchParams;
  const redirectTo = callbackUrl || "/dashboard";

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 dark:bg-neutral-900">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex items-center gap-2">
            <GitPullRequestArrow className="h-6 w-6 text-emerald-700 dark:text-emerald-500" />
            <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
              TrackHub
            </span>
          </div>
          <CardTitle>{t("title")}</CardTitle>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {t("subtitle")}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo });
            }}
          >
            <Button type="submit" variant="outline" className="w-full">
              <GitBranch className="h-4 w-4" />
              {t("continueWithGithub")}
            </Button>
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo });
            }}
          >
            <Button type="submit" variant="outline" className="w-full">
              {t("continueWithGoogle")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
