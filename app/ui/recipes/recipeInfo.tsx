import { notFound } from "next/navigation";
import Breadcrumbs from '../global/breadcrumbs';
import Image from 'next/image';
import { capitalize } from '@/app/lib/functions';
import { ClipboardDocumentListIcon, FlagIcon } from '@heroicons/react/20/solid';
import { getRecipe } from "@/app/lib/functions";

export default async function RecipeInfo({ id } : { id: string }) {
    const recipe = await getRecipe(id);
    if (!recipe) {
        notFound();
    }

    const links = [
        { label: 'Recipes', href: '/recipes' },
        { label: recipe.name, href: `/recipes/${recipe.id}`, active: true }
    ];

    return (
        <div className="content p-4 mt-4">
            <Breadcrumbs breadcrumbs={links} />
            <div className="recipe-info w-full lg:w-3/4 mx-auto flex flex-col mt-4">
                <div className="recipe-image w-full h-96">
                    <Image 
                    priority={true}
                    src={recipe.image} 
                    alt={recipe.name} 
                    height={600} 
                    width={600} 
                    className='w-full h-full object-cover' />
                </div>
                <div className="my-8">
                    <h2 className="text-2xl text-center">{recipe.name}</h2>
                    <p className="text-sm text-center">By: {recipe.chef}</p>
                    {
                        recipe.preptime != 0  && <p className="mt-4 text-base text-center font-bold">Prep Time: ~{recipe.preptime} minutes</p>
                    }
                </div>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <h3>Categories:</h3>
                        <div className="flex justify-start items-center mb-2 py-4 lg:mb-8">
                            {
                                recipe.category.map((category: string) => (
                                <div key={category} className="bg-mallard-400 text-gray-700 rounded-full p-2 text-sm font-bold mr-2">{capitalize(category)}</div>
                                ))
                            }
                            {
                                recipe.subcategory.map((subcategory: string) => (
                                <div key={subcategory} className="bg-mallard-400 text-gray-700 rounded-full p-2 text-sm font-bold mr-2">{capitalize(subcategory)}</div>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <h3>Type of Dish:</h3>
                        <div className="flex justify-start items-center py-4 mb-8">
                            {
                                recipe.mealtype.map((type: string) => (
                                <div key={type} className="text-white-50 bg-gray-700 rounded-full p-2 text-sm font-bold mr-2">{capitalize(type)}</div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <h3 className="text-xl"><ClipboardDocumentListIcon className="w-6 h-6 inline mr-2" /> Ingredients</h3>
                <hr />
                <ul className="list-disc text-lg pl-4 mt-4">
                    {recipe.ingredients.map((ingredient: string, index: number) => (
                        <li key={index} className="italic">{ingredient}</li>
                    ))}
                </ul>
                <br />
                <h3 className="text-xl"><FlagIcon className="w-6 h-6 inline mr-2" /> Instructions</h3>
                <hr />
                <ul className="list-decimal text-lg pl-4 mt-4">
                    {recipe.instructions.map((instruction: string, index: number) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}