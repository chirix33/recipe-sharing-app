export interface User  {
  id: string;
  name: string;
  email: string;
  password: string;
  accountType: 'email' | 'google';
  image: string;
};

export interface NutritionalInfo {
  calories: number;
  fat: number;
  sugar: number;
  protein: number;
  carbs: number;
}

export const MealCategories = ["Breakfast", "Lunch", "Dinner"] as const;
export const SubCategories = ["Vegan","Vegetarian","Gluten-Free","Dairy-Free","Low-Carb","Low-Fat","Low-Sugar","High-Protein","Mediterranean","Kosher","Halal"] as const;
export const MealTypes = ["Main Course", "Side Dish", "Dessert", "Appetizer", "Salad", "Beverage", "Snack"] as const;

export type MealCategory = typeof MealCategories[number];
export type SubCategory = typeof SubCategories[number];
export type MealType = typeof MealTypes[number];

export interface Meal {
  id: string;
  user_email: string;
  name: string;
  category: MealCategory[]; // Breakfast, Lunch, Dinner
  mealType: MealType[]; // Main Course, Side Dish, etc.
  subCategory: SubCategory[]; // Vegan, Vegetarian, etc.
  ingredients: string[]; // List of ingredients as strings
  instructions: string; // Recipe instructions as a single string
  nutritionalInfo: NutritionalInfo; // Nutritional information object
  image: string; // URL for the meal image
}
