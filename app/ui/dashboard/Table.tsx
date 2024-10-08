import type { Meal } from "@/app/lib/types";
import { DeleteRecipe, UpdateRecipe } from "../global/buttons";
import Link from "next/link";
// import { randomUUID } from "crypto";
// import { sumana } from "@/app/ui/global/fonts";

export default function UserRecipesTable({ userMeals } : { userMeals: Meal[] }) {
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
                                    <p>{meal.name}</p>
                                </div>
                                <p className="mb-3 text-sm text-gray-500">
                                    <span className="text-black">Category:</span> {
                                        meal.category.map((category, index) => index + 1 === meal.category.length ? category : category + ", ")
                                    }
                                </p>
                                
                                <p className="mb-3 text-sm text-gray-500">
                                    <span className="text-black">Meal Type:</span> {
                                        meal.mealType.map((mealType, index) => index + 1 === meal.mealType.length ? mealType : mealType + ", ")
                                    }
                                </p>

                                <p className="text-sm text-gray-500">
                                    <span className="text-black">Sub Category:</span> {
                                        meal.subCategory.map((subCategory, index) => index + 1 === meal.subCategory.length ? subCategory : subCategory + ", ")
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
                            <Link href={`/home/${meal.id}/`} className="hover:underline hover:text-white-600"><span className="font-bold">{meal.name}</span></Link>
                        </td>
                        <td className="whitespace-normal px-3 py-3">
                            {
                            meal.category.map((category, index) => 
                                (  
                                    index + 1 === meal.category.length ? category : category + ", " )
                                )
                            }
                        </td>
                        <td className="whitespace-normal px-3 py-3">
                            {
                            meal.mealType.map((mealType, index) => 
                                (  
                                    index + 1 === meal.mealType.length ? mealType : mealType + ", " )
                                )
                            }
                        </td>
                        <td className="whitespace-normal px-3 py-3">
                            {
                            meal.subCategory.map((subCategory, index) => 
                                (  
                                    index + 1 === meal.subCategory.length ? subCategory : subCategory + ", " )
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