import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export default function IngredientsInput({ ingredients, setIngredients }: 
    { 
        ingredients: string[], 
        setIngredients: Dispatch<SetStateAction<string[]>> 
    }) {
        function handleIngredientChange(index: number, e: ChangeEvent<HTMLInputElement>) {
            e.preventDefault();
            const values = [...ingredients];
            values[index] = e.target.value;

            // Automatically add a new field if the last one is filled
            if (index === ingredients.length - 1 && e.target.value.trim() !== '') {
                // add a new field to the ingredients array
                values.push('');
                setIngredients([...values]);
            } else {
                setIngredients(values);
            }
        }

        const handleRemoveIngredient = (index: number) => {
            const updatedIngredients = [...ingredients];
            if (updatedIngredients.length > 1) {
                updatedIngredients.splice(index, 1);
                console.log(updatedIngredients);
                setIngredients(updatedIngredients);
            }
        };

        const handleAddIngredient = () => {
            setIngredients([...ingredients, '']);
        }

        return(
            <div id="ingredients" className="relative mb-3">
                <label htmlFor="ingredients" className="text-gray-500">Add Ingredient(s)</label>
                
                {
                    ingredients.map((ingredient, index) => (
                        <div key={index} className="relative">
                        <input
                            className="peer block w-full rounded-md mb-2 border border-gray-200 py-[9px] pl-4 text-base outline-2 placeholder:text-gray-500 focus:outline-mallard-500"
                            type="text"
                            value={ingredient}
                            onChange={(e) => handleIngredientChange(index, e)}
                        />
                        <button onClick={()=>handleRemoveIngredient(index)} className="absolute right-0 top-0 mt-3 mr-3" type="button">
                            <XCircleIcon className="text-mallard-500 w-6 h-6" />
                        </button>
                    </div>
                    ))
                }

                <button 
                onClick={handleAddIngredient}
                className="block w-full bg-gray-200 hover:bg-gray-700 hover:text-white-50 font-bold text-lg p-2 rounded-md text-zinc-700 flex justify-center items-center mt-3 transition-all duration-300 ease-in-out" 
                type="button"
                >
                    Add Ingredient <PlusCircleIcon className="text-mallard-500 w-6 h-6" />
                </button>
            </div>
        );
}