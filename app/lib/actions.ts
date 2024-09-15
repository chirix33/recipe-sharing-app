"use server";

import { z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import type { User } from '@/app/lib/types';
import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { redirect } from 'next/navigation';

// Function to authenticate user using form data
// Use the signIn function from next-auth to authenticate user
export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                  return 'Invalid credentials.';
                default:
                  return 'Something went wrong.';
              }
        }
        throw error;
    }
}

// Function to check if email is already in use
async function checkEmail(email: string) {
    const filePath = path.join(process.cwd(), 'app', 'data', 'users.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const allUsers = JSON.parse(fileContents);
    const users = allUsers.users as User[];
    return users.find((user) => user.email === email);
}

// State to manage the create account form
export type FormState = {
    errors? : {
        email?: string[],
        password?: string[],
        cPassword?: string[]
    }
};

// Function to validate form data to create an account
export async function validate(prevState: FormState, formData: FormData) {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        cPassword: z.string().min(6)
    });

    const validatedFields = schema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        cPassword: formData.get('cPassword')}
    );

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { email, password, cPassword } = validatedFields.data;
    
    if (password !== cPassword) {
        return { errors: { cPassword: ['Passwords do not match.'] } };
    }

    try {
        // Check if email is already in use
        const res = await checkEmail(email); 

        if (res) {
            return { errors: { email: ['Email is already in use.'] } };
        }

        // Create the user object and insert it into users.json
        const id = randomUUID();
        const picture = `https://avatars.dicebear.com/api/avataaars/${id}.svg`;
        
        const user: User = { id, email, password, image: picture, accountType: 'email' };
        const allUsers = JSON.parse(await fs.readFile(path.join(process.cwd(), 'app', 'data', 'users.json'), 'utf-8'));
        allUsers.users.push(user);
        await fs.writeFile(path.join(process.cwd(), 'app', 'data', 'users.json'), JSON.stringify(allUsers, null, 2));
        authenticate('create', formData);
    } catch (error) {
        console.error('Failed to validate form:', error);
        return { errors: { email: ['Failed to validate form.'] } };
    }

    redirect('/login?account=created');
}