import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { User } from './types';
import type { Meal } from './types';

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
    const username = email.split('@')[0];
    const color = generateColor();
    const picture = `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}&flip=true&backgroundColor=${color}`;
    
    const user: User = { id, name, email, password, image: picture, accountType };
    const allUsers = JSON.parse(await fs.readFile(path.join(process.cwd(), 'app', 'data', 'users.json'), 'utf-8'));
    allUsers.users.push(user);
    await fs.writeFile(path.join(process.cwd(), 'app', 'data', 'users.json'), JSON.stringify(allUsers, null, 2));
}

export async function getUserMeals(userEmail: string): Promise<Meal[]> {
    const meals = JSON.parse(await fs.readFile(path.join(process.cwd(), 'app', 'data', 'meals.json'), 'utf-8'));
    const userMeals: Meal[] = meals.meals.filter((meal: Meal) => meal.user_email == userEmail);
    return userMeals;
}