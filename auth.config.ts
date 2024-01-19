import type { NextAuthConfig } from 'next-auth';
import { redirect } from 'next/navigation';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
      } else if (isLoggedIn) {
        console.log('redirecting to /dashboard');
        Response.redirect(new URL('localhost:3000/dashboard', nextUrl));
      }
      return false;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
