"use server";

import { z } from 'zod';
import { auth, signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import type { Meal, MealCategory, SubCategory, MealType, User } from '@/app/lib/types';
import fs from 'fs/promises';
import path from 'path';
import { redirect } from 'next/navigation';
import { createUser } from './functions';
import { randomUUID } from 'crypto';
// import { generateObject } from 'ai';
// import { openai } from '@ai-sdk/openai';

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
    // Get picture of the meal
    const targetMeal = meals.find((meal) => meal.id === recipeId);
    if (targetMeal) {
        const imagePath = path.join(process.cwd(), 'app', 'data', 'images', targetMeal.image.split('/').pop()!);
        await fs.unlink(imagePath);
        const updatedMeals = meals.filter((meal) => meal.id !== recipeId);
        allMeals.meals = updatedMeals;
        await fs.writeFile(filePath, JSON.stringify(allMeals, null, 2));
    } else {
        console.error('Failed to delete recipe. Recipe not found');
    }
}

export type RecipeFormState = {
    errors?: {
        name?: string[],
        categories?: string[],
        types?: string[],
        subCategories?: string[],
        ingredients?: string[],
        instructions?: string[],
        imagePreview?: string[] | null,
        other?: string[] | null
    },
    success?: boolean
} 

// recipe schema
const recipeSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }),
    categories: z.array(z.object(
        { 
            label: z.string(), 
            value: z.string() 
        })).nonempty({ message: 'Select at least one category.' }),
    types: z.array(z.object(
        { 
            label: z.string(), 
            value: z.string() 
        })).nonempty({ message: 'Select at least one type.' }),
    subCategories: z.array(z.object(
        { 
            label: z.string(), 
            value: z.string() 
        })).nonempty({ message: 'Select at least one sub category.' }),
    ingredients: z.array(z.string().min(1, { message: 'Please add a valid ingredient' })).nonempty({ message: 'Add at least one ingredient.' }),
    instructions: z.array(z.string().min(1, { message: 'Please add a valid instruction' })).nonempty({ message: 'Add at least one instruction.' }),
});

export async function addRecipe(
    categories: never[], 
    types: never[], 
    subCategories: string[], 
    ingredients: string[], 
    instructions: string[],
    prevState: RecipeFormState,
    formData: FormData,
): Promise<RecipeFormState> {
    ingredients = ingredients.filter((ingredient) => ingredient.trim() !== '');
    instructions = instructions.filter((instruction) => instruction.trim() !== '');

    const validatedFields = recipeSchema.safeParse({
        name: formData.get('name'),
        categories,
        types,
        subCategories,
        ingredients,
        instructions
    });

    if (!validatedFields.success) {
        console.log('Form data is invalid.', validatedFields.error.flatten().fieldErrors);
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    // Form validated, now validate the image
    const file = formData.get('picture') as File;
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!file || !['jpg', 'jpeg', 'png'].includes(fileExtension!)) {
        return { errors: { imagePreview: ['Please upload a valid image file.'] } };
    }

    const MealCategories : MealCategory[] = validatedFields.data.categories.map(({ value }) => value as MealCategory);
    const MealTypes : MealType[] = validatedFields.data.types.map(({ value }) => value as MealType);
    const SubCategories : SubCategory[] = validatedFields.data.subCategories.map(({ value }) => value as SubCategory);
    const user = await auth();

    // const prepTimeSchema = z.object({
    //     prepTime: z.number().min(1).max(180)
    // });

    // const prompt = `
    //     Name: ${validatedFields.data.name}
    //     Ingredients: ${validatedFields.data.ingredients.join(', ')}
    //     Instructions: ${validatedFields.data.instructions.join(', ')}

    //     Based on the recipe details above, please provide an estimated preparation time in minutes.
    //     Consider factors like ingredient preparation, cooking time, and complexity of steps.
    // `;

    try {
        // Move the image to /data/images
        await fs.writeFile(path.join(process.cwd(), 'app', 'data', 'images', file.name),  Buffer.from(await file.arrayBuffer()));
        
        // const { object: prepTimeData } = await generateObject({
        //     model: openai('gpt-4o-mini'),
        //     schema: prepTimeSchema,
        //     prompt: prompt,
        //     maxRetries: 3
        // });

        // Add the recipe to meals.json
        const filePath = path.join(process.cwd(), 'app', 'data', 'meals.json');
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const allMeals = JSON.parse(fileContents);
        const meals = allMeals.meals as Meal[];
        const newMeal : Meal = {
            id: randomUUID(),
            name: validatedFields.data.name,
            user_email: user?.user?.email as string,
            category: MealCategories,
            mealType: MealTypes,
            subCategory: SubCategories,
            ingredients: validatedFields.data.ingredients,
            instructions: validatedFields.data.instructions,
            image: '/data/images/' + file.name
        };
        meals.push(newMeal);
        allMeals.meals = meals;
        await fs.writeFile(filePath, JSON.stringify(allMeals, null, 2));

    } catch(error) {
        console.error('Failed to add the recipe:', error);
        return { errors: { other: ['Failed to add the recipe.'] } };
    }

    console.log("Recipe added successfully.");

    return { success: true };
}