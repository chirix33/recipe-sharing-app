import { randomUUID } from 'crypto';
import type { User } from './types';
import { QueryResultRow, sql } from '@vercel/postgres';

export function generateColor(withHash : boolean = false): string {
    const colors = [
        "FF5733", // Vibrant Orange
        "33FF57", // Bright Green
        "5733FF", // Bold Blue
        "FF33A6", // Vivid Pink
        "33FFF1", // Aqua Blue
        "FFBD33", // Bright Yellow-Orange
        "FF3380", // Hot Pink
        "33FF88", // Neon Green
        "FF8633", // Fiery Orange
        "FF3333", // Bright Red
        "DC3545"  // Bootstrap Red (added)
    ];
    const color = Math.floor(Math.random() * colors.length);
    return withHash ? `#${colors[color]}` : colors[color];
}

export async function createUser(name: string, email: string, password: string, accountType: 'email' | 'google', id: string = randomUUID()): Promise<void> {
    // Create the user object and insert it into users.json
    const color = generateColor();
    const picture = `https://api.dicebear.com/9.x/adventurer/svg?seed=${name}&flip=true&backgroundColor=${color}`;
   try {
        await sql`INSERT INTO users (id, name, email, password, image, accounttype) VALUES (${id}, ${name}, ${email}, ${password}, ${picture}, ${accountType})`;
   } catch (error) {
        console.error('Failed to create user:', error);
   }
}

export async function getUserMeals(userEmail: string): Promise<Array<QueryResultRow>> {
    try {
        const meals = await sql`SELECT * FROM meals WHERE user_email = ${userEmail}`;
        return meals.rows;
    } catch (error) {
        console.error('Failed to get user meals:', error);
        return [];
    }
}

export async function getAllMeals(): Promise<Array<QueryResultRow>> {
    try {
        const meals = await sql`SELECT meals.id, meals.name, meals.mealtype, meals.image, users.name AS chef FROM meals JOIN users ON meals.user_email = users.email`;
        return meals.rows;
    } catch (error) {
        console.error('Failed to get all meals:', error);
        return [];
    }
}

export async function getUser(email: string): Promise<User | false> {
    if (email === '') return false;
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user) {
        return user.rows[0] as User;
    }
    return false;
}

export async function getRecipeImageURL(recipeId: string): Promise<string | false> {
    try {
        const image = await sql`SELECT image FROM meals WHERE id = ${recipeId}`;
        return image.rows[0].image;
    } catch (error) {
        console.error('Failed to get recipe image URL:', error);
        return false;
    }
}