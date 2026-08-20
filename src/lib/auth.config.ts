import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe NextAuth config.
 *
 * This file must NOT import anything Node-only (MongoDB adapter/driver,
 * mongoose, etc.) because it is imported by `middleware.ts`, which runs
 * on the Edge runtime. The full config (providers + adapter) lives in
 * `auth.ts` and spreads this object in.
 */
export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
