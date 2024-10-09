"use server";

import { z } from 'zod';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import type { User } from '@/app/lib/types';
import fs from 'fs/promises';
import path from 'path';
import { redirect } from 'next/navigation';
import { createUser } from './functions';
import type { Meal } from '@/app/lib/types';

// Function to authenticate user using form data
// Use the signIn function from next-auth to authenticate user
export async function authenticate(prevState: string | undefined, formData: FormData) {
    const loginType = formData.get('type') as string;
    try {
        await signIn(loginType, formData);
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
        name?: string[],
        email?: string[],
        password?: string[],
        cPassword?: string[]
    }
};

// Function to validate form data to create an account
export async function validate(prevState: FormState, formData: FormData) {
    const schema = z.object({
        name: z.string({invalid_type_error: "Name must be a string"}).min(3, { message: 'Name must be at least 3 characters long.' }),
        email: z.string().email(),
        password: z.string().min(6),
        cPassword: z.string().min(6)
    });

    const validatedFields = schema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        cPassword: formData.get('cPassword')}
    );

    if (!validatedFields.success) {
        console.log('Form data is invalid.');
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { name, email, password, cPassword } = validatedFields.data;
    
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
        await createUser(name, email, password, 'email');
    } catch (error) {
        console.error('Failed to validate form:', error);
        return { errors: { email: ['Failed to validate form.'] } };
    }

    redirect('/dashboard?new=true&email=' + email);
}

// Function to sign out the user
export async function signUserOut() {
    await signOut();
}

export async function deleteRecipe(recipeId: string) {
    const filePath = path.join(process.cwd(), 'app', 'data', 'meals.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const allMeals = JSON.parse(fileContents);
    const meals = allMeals.meals as Meal[];
    const updatedMeals = meals.filter((meal) => meal.id !== recipeId);
    allMeals.meals = updatedMeals;
    await fs.writeFile(filePath, JSON.stringify(allMeals, null, 2));
}

export async function addRecipe(formData: FormData) {
    console.log(formData);
}