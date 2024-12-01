import { getUserMeals, capitalize } from "@/app/lib/functions";
import { DeleteRecipe, UpdateRecipe } from "../global/buttons";
import Link from "next/link";

export default async function UserRecipes({ email } : { email: string }) {
    const userMeals = await getUserMeals(email);
    if (userMeals.length > 0) {
        return (
            <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                <div className="md:hidden">
                    {userMeals?.map((meal) => (
                    <div
                        key={meal.id}
                        className="mb-6 w-full rounded-md bg-white p-4 border-b pb-4"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="mb-2 flex items-center">
                                    <p className="font-bold"><Link href={`/recipes/${meal.id}/`} target="_blank" className="hover:underline hover:text-white-600">{meal.name}</Link></p>
                                </div>
                                <p className="mb-3 text-sm text-gray-500">
                                    <span className="text-black">Category:</span> {
                                        meal.category.map((category: string, index: number) => index + 1 === meal.category.length ? capitalize(category) : capitalize(category) + ", ")
                                    }
                                </p>
                                
                                <p className="mb-3 text-sm text-gray-500">
                                    <span className="text-black">Meal Type:</span> {
                                        meal.mealtype.map((mealType: string, index: number) => index + 1 === meal.mealtype.length ? capitalize(mealType) : capitalize(mealType) + ", ")
                                    }
                                </p>

                                <p className="text-sm text-gray-500">
                                    <span className="text-black">Sub Category:</span> {
                                        meal.subcategory.map((subCategory: string, index: number) => index + 1 === meal.subcategory.length ? capitalize(subCategory) : capitalize(subCategory) + ", ")
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-between pt-4">
                            <div className="flex justify-end gap-2">
                                <UpdateRecipe id={meal.id} />
                                <DeleteRecipe id={meal.id} />
                            </div>
                        </div>
                    </div>
                    ))}
                </div>

                <table className="hidden min-w-full text-gray-900 md:table cursor-pointer">
                    <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        Meal Name
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                        Category
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                        Meal Type
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                        Sub Category
                        </th>
                        <th scope="col" className="relative py-3 pl-6 pr-3">
                        <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {userMeals?.map((meal) => (
                        <tr
                        key={meal.id}
                        className="w-full hover:bg-white-50 border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                        >
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <Link href={`/recipes/${meal.id}/`} target="_blank" className="hover:underline hover:text-white-600"><span className="font-bold">{meal.name}</span></Link>
                        </td>
                        <td className="whitespace-normal px-3 py-3">
                            {
                            meal.category.map((category: string, index: number) => 
                                (  
                                    index + 1 === meal.category.length ? capitalize(category) : capitalize(category) + ", " )
                                )
                            }
                        </td>
                        <td className="whitespace-normal px-3 py-3">
                            {
                            meal.mealtype.map((mealType: string, index: number) => 
                                (  
                                    index + 1 === meal.mealtype.length ? capitalize(mealType) : capitalize(mealType) + ", " )
                                )
                            }
                        </td>
                        <td className="whitespace-normal px-3 py-3">
                            {
                            meal.subcategory.map((subCategory: string, index: number) => 
                                (  
                                    index + 1 === meal.subcategory.length ? capitalize(subCategory) : capitalize(subCategory) + ", " )
                                )
                            }
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex justify-end gap-3">
                                <UpdateRecipe id={meal.id} />
                                <DeleteRecipe id={meal.id} />
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        );
    }

    return (
        <div className="flex justify-center items-center mt-4 min-h-24">
          <h3>You haven&apos;t added any recipes yet... <Link href="/dashboard/add" className="text-white-500 underline">Add now</Link></h3>
        </div>
    );
}