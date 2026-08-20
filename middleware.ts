import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { authConfig } from "./src/lib/auth.config";
import { locales, defaultLocale } from "./src/i18n/config";

const { auth } = NextAuth(authConfig);

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

// Route segments (without the locale prefix) that require an authenticated
// session. Everything else — including /login — stays public.
const protectedSegments = [
  "dashboard",
  "projects",
  "tasks",
  "calendar",
  "team",
  "repositories",
  "analytics",
  "settings",
];

function localeFromPath(pathname: string) {
  const [, maybeLocale] = pathname.split("/");
  return (locales as readonly string[]).includes(maybeLocale)
    ? maybeLocale
    : defaultLocale;
}

function pathWithoutLocale(pathname: string, locale: string) {
  const stripped = pathname.replace(new RegExp(`^/${locale}`), "");
  return stripped === "" ? "/" : stripped;
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const locale = localeFromPath(pathname);
  const bare = pathWithoutLocale(pathname, locale);

  const isProtected = protectedSegments.some(
    (segment) => bare === `/${segment}` || bare.startsWith(`/${segment}/`)
  );

  if (isProtected && !req.auth) {
    const loginUrl = new URL(`/${locale}/login`, req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
