import Image from "next/image";
import { getAllMeals } from "../lib/functions";

export default async function Page() {
    const meals = await getAllMeals();
    return (
        <>
        <div className="mb-8 w-full h-28 bg-white-100 flex flex-col justify-center items-center p-4">
            <h2>Search for Recipes</h2>
        </div>
        <div className="flex flex-col items-center">
            {/* <h2 className="text-2xl mb-2">Featured Recipes</h2> */}
            <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    meals.map((meal) => (
                        <div key={meal.id} className="cursor-pointer p-4 rounded-lg">
                            <div className="w-full h-48 bg-zinc-200 mb-4">
                                <Image src={meal.image} alt={meal.name} className="w-full h-full object-contain" height={300} width={300}/>
                            </div>
                            <h3 className="text-xl">{meal.name}</h3>
                            <p>{meal.chef}</p>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    );
}