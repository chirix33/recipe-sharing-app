import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
// import { NextResponse } from 'next/server';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { z } from 'zod';
import { getUser, createUser } from './app/lib/functions';
import bcrypt from 'bcryptjs';

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
        
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
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
    authorized({ auth }) {
      console.log("Authorized callback");
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) {
        // Redirect authenticated users to dashboard
        return !!auth?.user;
      }
      return false;
    },
    async signIn({ user, account}) {

      if (account?.provider == 'google') {
        const userEmail = user.email?.toString() || '';
        const checkEmail = await getUser(userEmail);
        
        // If user is signing up
        if (checkEmail && checkEmail.accounttype == "email") {
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
  
        return obj;
      }
  
      // If access token has expired, try to refresh it
      return token;
    },
    async session ({ session, token, user }) { 
      
        const sessionObj = {
          ...session,
          ...user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          provider: token.provider
        };
  
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