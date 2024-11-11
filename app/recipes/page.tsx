import { generatePlaceholder } from "../lib/functions";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { Suspense } from "react";
import RecipeList from "../ui/recipes/recipeList";
import RecipeListSkeleton from "../ui/skeletons/recipeListSkeletons";

export default function Page({ searchParams }:  { searchParams?: {search?: string} }) {
    const search = searchParams?.search || '';
    return (
        <>
        <div className="mb-8 w-full h-auto lg:h-28 bg-white-200 flex flex-col justify-center items-center p-4">
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
        <Suspense fallback={<RecipeListSkeleton />}>
            <RecipeList query={search} />
        </Suspense>
        </>
    );
}