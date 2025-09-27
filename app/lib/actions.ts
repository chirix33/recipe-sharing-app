"use server";

import { z } from 'zod';
import { auth, signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import type { Meal, MealCategory, SubCategory, MealType, ReviewFormData } from '@/app/lib/types';
import { getUser, createUser, getRecipeImageURL, estimateCookTime, addRecipeReview, updateReviewHelpfulVotes, deleteRecipeReview } from './functions';
import { randomUUID } from 'crypto';
import { put, del } from '@vercel/blob';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Function to authenticate user using form data
// Use the signIn function from next-auth to authenticate user
export async function authenticate(prevState: string | undefined, formData: FormData) {
    const loginType = formData.get('type') as string;
    try {
        await signIn(loginType, formData);
        // Redirect back to the login page. If the user is authenticated
        // they will be redirected to the dashboard page by the middleware.
        redirect('/login');
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
        const res = await getUser(email); 

        if (res) {
            return { errors: { email: ['Email is already in use.'] } };
        }

        await createUser(name, email, password, 'email');
        
    } catch (error) {
        console.error('Failed to create user:', error);
        return { errors: { email: ['Failed to create user. Please try again.'] } };
    }

    redirect('/login');
}

// Function to sign out the user
export async function signUserOut() {
    await signOut();
}

export async function deleteRecipe(recipeId: string) {
    try {
        // Get the image URL of the recipe and delete the image from Vercel Blob
        const imageUrl = await getRecipeImageURL(recipeId);
        if (!imageUrl) {
            console.error('Image of the recipe not found.');
            return;
        }
        await del(imageUrl);

        // Delete the recipe from the database
        await sql`DELETE FROM meals WHERE id = ${recipeId}`;
    } catch (error) {
        console.error('Failed to delete the recipe:', error);
    }

    revalidatePath('/dashboard');
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
    success?: boolean,
    prepTime?: number
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
    if (!file || !['jpg', 'jpeg', 'png', 'webp'].includes(fileExtension!)) {
        return { errors: { imagePreview: ['Please upload a valid image file.'] } };
    }

    // If file is greater than 4MB
    if (file.size > 4 * 1024 * 1024) {
        return { errors: { imagePreview: ['Please upload an image file less than 2MB.'] } };
    }

    const MealCategories : MealCategory[] = validatedFields.data.categories.map(({ value }) => value as MealCategory);
    const MealTypes : MealType[] = validatedFields.data.types.map(({ value }) => value as MealType);
    const SubCategories : SubCategory[] = validatedFields.data.subCategories.map(({ value }) => value as SubCategory);
    const user = await auth();


    try {
        // Move the image to Vercel Blob
        const blob = await put(`images/${file.name}`, file, { access: "public"});
        const estimatedCookTime = await estimateCookTime(ingredients, instructions);

        // Add the recipe to the database
        const newMeal : Meal = {
            id: randomUUID(),
            name: validatedFields.data.name,
            user_email: user?.user?.email as string,
            category: MealCategories,
            mealType: MealTypes,
            subCategory: SubCategories,
            ingredients: validatedFields.data.ingredients,
            instructions: validatedFields.data.instructions,
            image: blob.url,
            prepTime: estimatedCookTime
        };

        await sql`INSERT INTO meals (id, name, user_email, category, mealtype, subcategory, ingredients, instructions, image, preptime) 
        VALUES (${newMeal.id}, ${newMeal.name}, ${newMeal.user_email}, ${JSON.stringify(newMeal.category)}, ${JSON.stringify(newMeal.mealType)}, ${JSON.stringify(newMeal.subCategory)}, ${JSON.stringify(newMeal.ingredients)}, ${JSON.stringify(newMeal.instructions)}, ${newMeal.image}, ${newMeal.prepTime})`;
        
        console.log("Recipe added successfully.");
        return { success: true, prepTime: newMeal.prepTime };

    } catch(error) {
        console.error('Failed to add the recipe:', error);
        return { errors: { other: ['Failed to add the recipe.'] } };
    }
    
}

export async function updateRecipe() {
    return {};
}

// Review Form State
export type ReviewFormState = {
    errors?: {
        rating?: string[],
        title?: string[],
        comment?: string[],
        photos?: string[],
        other?: string[]
    },
    success?: boolean
}

// Review schema
const reviewSchema = z.object({
    rating: z.number().min(1, { message: 'Please select a rating.' }).max(5, { message: 'Rating must be between 1 and 5.' }),
    title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }).max(100, { message: 'Title must be less than 100 characters.' }),
    comment: z.string().min(10, { message: 'Comment must be at least 10 characters long.' }).max(1000, { message: 'Comment must be less than 1000 characters.' }),
});

export async function submitReview(
    recipeId: string,
    prevState: ReviewFormState,
    formData: FormData,
): Promise<ReviewFormState> {
    const session = await auth();
    if (!session?.user?.email) {
        return { errors: { other: ['You must be logged in to submit a review.'] } };
    }

    const rating = parseInt(formData.get('rating') as string);
    const title = formData.get('title') as string;
    const comment = formData.get('comment') as string;
    const photos = formData.getAll('photos') as File[];

    const validatedFields = reviewSchema.safeParse({
        rating,
        title,
        comment
    });

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    // Validate photos
    const validPhotos: string[] = [];
    for (const photo of photos) {
        if (photo.size > 0) {
            const fileExtension = photo.name.split('.').pop()?.toLowerCase();
            if (!['jpg', 'jpeg', 'png', 'webp'].includes(fileExtension!)) {
                return { errors: { photos: ['Please upload valid image files (jpg, jpeg, png, webp).'] } };
            }
            if (photo.size > 5 * 1024 * 1024) {
                return { errors: { photos: ['Please upload image files less than 5MB each.'] } };
            }
        }
    }

    try {
        // Upload photos to Vercel Blob
        for (const photo of photos) {
            if (photo.size > 0) {
                const blob = await put(`review-photos/${randomUUID()}-${photo.name}`, photo, { access: "public" });
                validPhotos.push(blob.url);
            }
        }

        // Add review to database
        const success = await addRecipeReview(
            recipeId,
            session.user.email,
            session.user.name || 'Anonymous',
            session.user.image || '',
            rating,
            title,
            comment,
            validPhotos
        );

        if (success) {
            revalidatePath(`/recipes/${recipeId}`);
            return { success: true };
        } else {
            return { errors: { other: ['Failed to submit review. Please try again.'] } };
        }
    } catch (error) {
        console.error('Failed to submit review:', error);
        return { errors: { other: ['Failed to submit review. Please try again.'] } };
    }
}

export async function voteReviewHelpful(reviewId: string, increment: boolean = true): Promise<boolean> {
    try {
        const success = await updateReviewHelpfulVotes(reviewId, increment);
        if (success) {
            revalidatePath('/recipes');
        }
        return success;
    } catch (error) {
        console.error('Failed to vote on review:', error);
        return false;
    }
}

export async function deleteReview(reviewId: string, recipeId: string): Promise<boolean> {
    const session = await auth();
    if (!session?.user?.email) {
        return false;
    }

    try {
        const success = await deleteRecipeReview(reviewId);
        if (success) {
            revalidatePath(`/recipes/${recipeId}`);
        }
        return success;
    } catch (error) {
        console.error('Failed to delete review:', error);
        return false;
    }
}