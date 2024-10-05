import { getUserMeals } from "@/app/lib/functions";
import type { Meal } from "@/app/lib/types";
import { randomUUID } from "crypto";

export default async function UserRecipes({ email } : { email: string }) {
    const userMeals = await getUserMeals(email);
    if (userMeals.length > 0) {
        return (
            <RecipeCards userMeals={userMeals} />
        );
    }
    return (
        <div className="flex justify-center items-center mt-4 min-h-24">
          <h3>You haven&apos;t added any recipes yet... Add now</h3>
        </div>
    );
}

function RecipeCards({ userMeals } : { userMeals: Meal[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userMeals.map((meal) => (
                <div key={randomUUID()} className="bg-white shadow-md rounded-md p-4">
                    <h3 className="text-lg font-semibold">{meal.name}</h3>
                </div>
            ))}
        </div>
    );
}