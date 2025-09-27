import { randomUUID } from 'crypto';
import type { User, RecipeReview, RecipeRating, RecipeStats } from './types';
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
            meals = await sql`SELECT meals.id, meals.name, meals.mealtype, meals.image, users.image AS chef_image, users.name AS chef FROM meals JOIN users ON meals.user_email = users.email LIMIT ${limit}`;
        } else {
            if (query !== '') {
                meals = await sql`SELECT meals.id, meals.name, meals.mealtype, meals.image, users.image AS chef_image, users.name AS chef
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
                meals = await sql`SELECT meals.id, meals.name, meals.mealtype, meals.image, users.image AS chef_image, users.name AS chef FROM meals JOIN users ON meals.user_email = users.email`;
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
    
    const user = await sql`SELECT * FROM users WHERE email = ${email.trim()}`;
    if (user) {
        console.log("User found:", typeof user.rows[0]);
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
        const recipe = await sql`SELECT meals.id, meals.name, meals.category, meals.mealtype, meals.subcategory, meals.ingredients, meals.instructions, meals.image, meals.preptime, users.name AS chef FROM meals JOIN users ON meals.user_email = users.email WHERE meals.id = ${id}`;
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

// A function to estimate prep time for a recipe
export async function estimateCookTime(ingredients: string[], instructions: string[]): Promise<number> {
    const request_body = {
        ingredients: ingredients.join(' '),
        instructions: instructions.join(' ')
    }
    const API_URL = process.env.RECIPESHARE_API_URL;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${process.env.API_SECRET}`
        },
        body: JSON.stringify(request_body)
    }

    try {
        const response = await fetch(`${API_URL}/estimate-recipe-time`, options);
        if (!response.ok) {
            console.error('API call failed with status:', response.status);
            console.error('Response:', response.text());
            return 0; // Return 0 if the API call fails
        }

        const data = await response.json();

        if (!data || typeof data.estimatedTimeInMinutes !== 'number') {
            console.error('Invalid response from API:', data);
            return 0; // Return 0 if the response is invalid
        }

        return data.estimatedTimeInMinutes;
    } catch (e) {
        console.error('Error estimating cook time:', e);
        return 0;
    }
}

// Rating and Review Functions
export async function addRecipeReview(
    recipeId: string, 
    userEmail: string, 
    userName: string, 
    userImage: string,
    rating: number, 
    title: string, 
    comment: string, 
    photos: string[]
): Promise<boolean> {
    try {
        const reviewId = randomUUID();
        const now = new Date().toISOString();
        
        await sql`
            INSERT INTO recipe_reviews 
            (id, recipe_id, user_email, user_name, user_image, rating, title, comment, photos, helpful_votes, created_at, updated_at)
            VALUES (${reviewId}, ${recipeId}, ${userEmail}, ${userName}, ${userImage}, ${rating}, ${title}, ${comment}, ${JSON.stringify(photos)}, 0, ${now}, ${now})
        `;
        
        return true;
    } catch (error) {
        console.error('Failed to add recipe review:', error);
        return false;
    }
}

export async function getRecipeReviews(recipeId: string): Promise<RecipeReview[]> {
    try {
        const reviews = await sql`
            SELECT * FROM recipe_reviews 
            WHERE recipe_id = ${recipeId} 
            ORDER BY created_at DESC
        `;
        return reviews.rows as RecipeReview[];
    } catch (error) {
        console.error('Failed to get recipe reviews:', error);
        return [];
    }
}

export async function getRecipeStats(recipeId: string): Promise<RecipeStats | null> {
    try {
        const stats = await sql`
            SELECT 
                AVG(rating) as average_rating,
                COUNT(*) as total_reviews,
                COUNT(CASE WHEN rating = 5 THEN 1 END) as rating_5,
                COUNT(CASE WHEN rating = 4 THEN 1 END) as rating_4,
                COUNT(CASE WHEN rating = 3 THEN 1 END) as rating_3,
                COUNT(CASE WHEN rating = 2 THEN 1 END) as rating_2,
                COUNT(CASE WHEN rating = 1 THEN 1 END) as rating_1
            FROM recipe_reviews 
            WHERE recipe_id = ${recipeId}
        `;
        
        if (stats.rows.length === 0) {
            return null;
        }
        
        const row = stats.rows[0];
        return {
            average_rating: parseFloat(row.average_rating) || 0,
            total_reviews: parseInt(row.total_reviews) || 0,
            rating_distribution: {
                5: parseInt(row.rating_5) || 0,
                4: parseInt(row.rating_4) || 0,
                3: parseInt(row.rating_3) || 0,
                2: parseInt(row.rating_2) || 0,
                1: parseInt(row.rating_1) || 0,
            }
        };
    } catch (error) {
        console.error('Failed to get recipe stats:', error);
        return null;
    }
}

export async function getUserReviewForRecipe(recipeId: string, userEmail: string): Promise<RecipeReview | null> {
    try {
        const review = await sql`
            SELECT * FROM recipe_reviews 
            WHERE recipe_id = ${recipeId} AND user_email = ${userEmail}
        `;
        return review.rows[0] as RecipeReview || null;
    } catch (error) {
        console.error('Failed to get user review:', error);
        return null;
    }
}

export async function updateReviewHelpfulVotes(reviewId: string, increment: boolean = true): Promise<boolean> {
    try {
        if (increment) {
            await sql`
                UPDATE recipe_reviews 
                SET helpful_votes = helpful_votes + 1 
                WHERE id = ${reviewId}
            `;
        } else {
            await sql`
                UPDATE recipe_reviews 
                SET helpful_votes = GREATEST(helpful_votes - 1, 0) 
                WHERE id = ${reviewId}
            `;
        }
        return true;
    } catch (error) {
        console.error('Failed to update helpful votes:', error);
        return false;
    }
}

export async function deleteRecipeReview(reviewId: string): Promise<boolean> {
    try {
        await sql`DELETE FROM recipe_reviews WHERE id = ${reviewId}`;
        return true;
    } catch (error) {
        console.error('Failed to delete recipe review:', error);
        return false;
    }
}