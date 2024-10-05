import { sumana } from "../global/fonts";
import Link from "next/link";
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
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userMeals.map((meal) => (
                <div key={meal.id} className="relative bg-white-100 rounded-md p-4 min-h-48">
                    <h3 className={`text-lg font-semibold ${sumana.className}`}>{meal.name}</h3>
                    <div className="h-1 w-10 bg-mallard-500 rounded-full my-2" />
                    <p className="text-sm text-gray-500">
                        Category: {
                            meal.category.map((category, index) => (
                                <span key={randomUUID()} className="font-bold">{
                                    index + 1 === meal.category.length ? category + "." : category + ", "
                                } </span>
                            ))
                        }
                    </p>
                    <p className="text-sm text-gray-500">
                        Meal Type: {
                            meal.mealType.map((mealType, index) => (
                                <span key={randomUUID()} className="font-bold">{
                                    index + 1 === meal.mealType.length ? mealType + "." : mealType + ", "
                                } </span>
                            ))
                        }
                    </p>
                    <Link href={`/home/view/`+meal.id} className="absolute bottom-2.5 left-4 bg-mallard-500 px-4 py-2 text-white-50 font-bold rounded-md">View</Link>
                </div>
            ))}
        </div>
    );
}