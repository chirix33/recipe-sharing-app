export interface User  {
  id: string;
  name: string;
  email: string;
  password: string;
  accounttype: 'email' | 'google';
  image: string;
};

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
  instructions: string[]; // Recipe instructions as strings
  image: string; // URL for the meal image
  prepTime: number; // Time in minutes
}

// Options for the  multi select componenet in the add recipe form
export const categories = [
  { label: "Breakfast", value: "breakfast" },
  { label: "Lunch", value: "lunch" },
  { label: "Dinner", value: "dinner" }
];

export const types = [
  { label: "Main Course", value: "main" },
  { label: "Side Dish", value: "side" },
  { label: "Dessert", value: "dessert" },
  { label: "Appetizer", value: "appetizer" },
  { label: "Salad", value: "salad" },
  { label: "Soup", value: "soup" },
  { label: "Snack", value: "snack" },
  { label: "Drink", value: "drink" }
];

export const subCategories = [
  { label: "Vegan", value: "vegan" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Gluten-Free", value: "gluten-free" },
  { label: "Dairy-Free", value: "dairy-free" },
  { label: "Low-Carb", value: "low-carb" },
  { label: "Low-Fat", value: "low-fat" },
  { label: "Low-Sugar", value: "low-sugar" },
  { label: "High-Protein", value: "high-protein" },
  { label: "Mediterranean", value: "mediterranean" },
  { label: "Kosher", value: "kosher" },
  { label: "Halal", value: "halal" }
];

// Rating and Review Types
export interface RecipeRating {
  id: string;
  recipe_id: string;
  user_email: string;
  rating: number; // 1-5 stars
  created_at: string;
}

export interface RecipeReview {
  id: string;
  recipe_id: string;
  user_email: string;
  user_name: string;
  user_image: string;
  rating: number; // 1-5 stars
  title: string;
  comment: string;
  photos: string[]; // URLs to review photos
  helpful_votes: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
  photos: File[];
}

export interface RecipeStats {
  average_rating: number;
  total_reviews: number;
  rating_distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}
