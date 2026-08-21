import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';

const sessionCookieName =
  process.env.NODE_ENV === 'production'
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: { scope: 'read:user user:email repo' },
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
    }),
  ],
  session: {
    strategy: 'database',
  },
  callbacks: {
    async signIn({ account }) {
      if (!account) return false;

      const client = await clientPromise;
      const db = client.db();

      const existingAccount = await db.collection('accounts').findOne({
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      });
      if (existingAccount) return true;

      const cookieStore = await cookies();
      const sessionToken = cookieStore.get(sessionCookieName)?.value;
      if (!sessionToken) return true;

      const session = await db.collection('sessions').findOne({
        sessionToken,
        expires: { $gt: new Date() },
      });
      if (!session) return true;

      await db.collection('accounts').insertOne({
        userId: session.userId,
        type: account.type,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        access_token: account.access_token,
        refresh_token: account.refresh_token,
        expires_at: account.expires_at,
        token_type: account.token_type,
        scope: account.scope,
        id_token: account.id_token,
        session_state: account.session_state,
      });

      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
