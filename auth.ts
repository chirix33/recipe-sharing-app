import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { z } from 'zod';
import type { User } from '@/app/lib/types';
import fs from 'fs/promises';
import path from 'path';
import { createUser } from './app/lib/functions';

async function getUser(email: string): Promise<User | undefined> {
    try {
      if (email === '') throw new Error('Failed to fetch user.');
      const filePath = path.join(process.cwd(), 'app', 'data', 'users.json');
      const fileContents = await fs.readFile(filePath, 'utf-8');
      const allUsers = JSON.parse(fileContents);
      const users = allUsers.users as User[];
      return users.find((user) => user.email === email);
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

async function refreshAccessToken(token: any) {
  try {
    const url = `https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${token.refreshToken}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    console.log('Response:', response.json());
    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000, // Expires in * 1000 to convert seconds to ms
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token if new one isn't returned
    };
  } catch (error) {
    console.error('Error refreshing access token:', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  providers: [
    Credentials({
    async authorize(credentials) {
      const parsedCredentials = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }).safeParse(credentials);

      if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) return null;
        const comparePassword = password === user.password;
        if (comparePassword) {
          console.log("User: ", user); 
          return {
            ...user,
            authorizationType: credentials.authorizationType
          };
        }
        console.log('Invalid credentials.');
        return null;
      }
      console.log('Failed to authorize user:', parsedCredentials.error);
      return null;
    }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: { 
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // Redirect authenticated users to dashboard
        return NextResponse.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    async signIn({ user, account, profile}) {

      if (account?.provider == 'google') {
        const userEmail = user.email?.toString() || '';
        const checkEmail = await getUser(userEmail);

        // If user is signing up
        if (checkEmail && checkEmail.accountType == "email") {
          // User is already registered as an email user, not google user
          console.log('User already exists as an email account.');
          return false;
        }

        if (!checkEmail) {
          // Create user
          console.log('Creating user.');
          await createUser(user.name || '', userEmail, '', 'google', user.id);
        }
      }

      return true;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        const obj = {
          ...token,
          user,
          accessToken: account?.access_token,
          refreshToken: account?.refresh_token,
          expiry: account?.expires_at ? account?.expires_at * 1000 : undefined,
          provider: account?.provider
        }
  
        // If token has not expired, return it
        if (Date.now() < (token?.expiry as number)) {
          return token;
        }
  
        // console.log('Token:', obj);
        return obj;
      }
  
      // If access token has expired, try to refresh it
      return token;
    },
    async session ({ session, token, user }) { 
      // const sessionObj = {
      //   ...session
      // };
  
      // if (token) {
        const sessionObj = {
          ...session,
          ...user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          provider: token.provider
        };
  
        // return sessionObj;
      // }
  
      return sessionObj;
    }
  }
};
export const {
  handlers: { GET, POST }, 
  auth, 
  signIn, 
  signOut 
} = NextAuth(authConfig);