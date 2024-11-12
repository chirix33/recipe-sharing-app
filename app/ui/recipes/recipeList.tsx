import Link from "next/link";
import Image from "next/image";
import { getAllMeals } from "@/app/lib/functions";

export default async function RecipeList({ query }: { query?: string }) {
    let meals = [];
    if (query) {
        meals = await getAllMeals(0, query);
    } else {
        meals = await getAllMeals(10);
    }

    return(
        <div className="flex flex-col items-center">
            <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                   meals.length > 0 ? meals.map((meal) => (
                        <Link href={`/recipes/${meal.id}`} key={meal.id} className="hover:opacity-85 transition-all duration-150 cursor-pointer p-4 bg-stone-50 text-zinc-700">
                            <div className="w-full h-48 bg-zinc-200 mb-4">
                                <Image src={meal.image} alt={meal.name} className="w-full h-full object-cover" height={300} width={300}/>
                            </div>
                            <div id="recipe-card-details" className="w-full flex flex-col justify-center">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                                    <h3 className="text-xl">{meal.name}</h3>
                                    <span className={`text-sm lg:text-xs mt-1 lg:mt-0 p-2 rounded-md bg-mallard-300 w-fit`}>By: {meal.chef}</span>
                                </div>
                                <span className={`font-bold mt-1 p-2 w-fit underline`}>
                                    {
                                        meal.mealtype.map((type: string) => (
                                            <span key={type} className="mr-2">{type.charAt(0).toUpperCase() + type.slice(1, type.length)}</span>
                                        ))
                                    }
                                </span>
                            </div>
                        </Link>
                    )) : <h2 className="text-xl">Be the first to <Link href="/dashboard/add" className="text-mallard-400 underline">add that recipe now!</Link></h2>
                }
            </div>
        </div>
    );
}