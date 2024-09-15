import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/types';
import fs from 'fs/promises';
import path from 'path';

async function getUser(email: string): Promise<User | undefined> {
    try {
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

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
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
        if (comparePassword) return user;
      }
      console.log('Failed to authorize user:', parsedCredentials.error);
      return null;
    }
  })]
});