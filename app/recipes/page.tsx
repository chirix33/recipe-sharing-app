import Image from "next/image";
import Link from "next/link";
import { generatePlaceholder, getAllMeals } from "../lib/functions";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

export default async function Page() {
    const meals = await getAllMeals(10);
    return (
        <>
        <div className="mb-8 w-full h-auto lg:h-28 bg-white-100 flex flex-col justify-center items-center p-4">
            <form method="get" className="w-3/4 flex items-center justify-center flex-col lg:flex-row gap-2 lg:gap-px">
                <input 
                type="text"
                name="search"
                autoFocus={true}
                placeholder={`Eg, '${generatePlaceholder()}'`} 
                className="flex-1 basis-3/4 w-full lg:w-1/2 p-2 my-2 outline-none pl-4 font-bold" />
                
                <button 
                type="submit" 
                className="flex-0 flex items-center justify-center gap-px w-full lg:w-auto lg:basis-1/4 p-2 bg-mallard-400 text-white-100">
                    <MagnifyingGlassCircleIcon className="w-6 h-6" />
                    Search
                </button>
            </form>
        </div>
        <div className="flex flex-col items-center">
            {/* <h2 className="text-2xl mb-2">Featured Recipes</h2> */}
            <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    meals.map((meal) => (
                        <Link href={`/recipes/${meal.id}`} key={meal.id} className="hover:transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#fec445] transition-all duration-150 cursor-pointer p-4 bg-stone-50 rounded-lg text-zinc-700">
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
                    ))
                }
            </div>
        </div>
        </>
    );
}