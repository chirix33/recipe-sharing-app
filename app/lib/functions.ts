import { randomUUID } from 'crypto';
import type { User } from './types';
import { QueryResultRow, sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

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

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function createUser(name: string, email: string, password: string, accountType: 'email' | 'google', id: string = randomUUID()): Promise<void> {
    // Create the user object and insert it into users.json
    const color = generateColor();
    const picture = `https://api.dicebear.com/9.x/adventurer/svg?seed=${name}&flip=true&backgroundColor=${color}`;
   try {
        // Hash the password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                // Insert the user into the database
                await sql`INSERT INTO users (id, name, email, password, image, accounttype) VALUES (${id}, ${name}, ${email}, ${hash}, ${picture}, ${accountType})`;
            });
        });
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

export async function getAllMeals(limit: number = 0, query: string = ''): Promise<Array<QueryResultRow>> {
    let meals = {
        rows: []
    };

    try {
        if (limit > 0) {
            meals = await sql`SELECT meals.id, meals.name, meals.mealtype, meals.image, users.name AS chef FROM meals JOIN users ON meals.user_email = users.email LIMIT ${limit}`;
        } else {
            if (query !== '') {
                meals = await sql`SELECT meals.id, meals.name, meals.mealtype, meals.image, users.name AS chef
                    FROM meals
                    JOIN users ON meals.user_email = users.email
                    WHERE meals.name ILIKE '%' || ${query} || '%'
                        OR EXISTS (
                            SELECT 1
                            FROM json_array_elements_text(meals.category) AS elem
                            WHERE elem ILIKE '%' || ${query} || '%'
                        )
                        OR EXISTS (
                            SELECT 1
                            FROM json_array_elements_text(meals.mealtype) AS elem
                            WHERE elem ILIKE '%' || ${query} || '%'
                        )
                        OR EXISTS (
                            SELECT 1
                            FROM json_array_elements_text(meals.subcategory) AS elem
                            WHERE elem ILIKE '%' || ${query} || '%'
                        )`;
            } else {
                meals = await sql`SELECT meals.id, meals.name, meals.mealtype, meals.image, users.name AS chef FROM meals JOIN users ON meals.user_email = users.email`;
            }
        }

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

export async function getRecipe(id: string): Promise<QueryResultRow | false> {
    try {
        const recipe = await sql`SELECT meals.id, meals.name, meals.category, meals.mealtype, meals.subcategory, meals.ingredients, meals.instructions, meals.image, users.name AS chef FROM meals JOIN users ON meals.user_email = users.email WHERE meals.id = ${id}`;
        return recipe.rows[0];
    } catch (error) {
        console.error('Failed to get recipe:', error);
        return false;
    }
}

// A function to generate random placeholder sentences for recipe search input
export function generatePlaceholder(): string {
    const placeholders = [
        "Dinner",
        "Lunch",
        "Breakfast",
        "Dessert",
        "Snack",
        "Appetizer",
        "Main Course",
        "Side Dish",
        "Beverage",
        "Cocktail",
        "Mocktail",
        "Soup",
        "Salad",
        "Sandwich",
        "Bread",
        "Pasta",
        "Rice",
        "Noodle",
        "Pizza",
        "Burger",
        "Taco",
        "Burrito",
        "Wrap",
        "Sushi",
        "Lasagna",
        "Casserole",
        "Stew",
    ];
    const placeholder = Math.floor(Math.random() * placeholders.length);
    return placeholders[placeholder];
}