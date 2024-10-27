"use client";

import { useState, useRef } from 'react';
import { useFormState } from 'react-dom';
import Image from 'next/image';
import MultiSelectDiv from '@/app/ui/forms/multiselect';
import AutoInput from '@/app/ui/forms/auto-input';
import { XMarkIcon, CloudArrowUpIcon } from '@heroicons/react/20/solid';
import { categories, types, subCategories } from '@/app/lib/types';
import { addRecipe, RecipeFormState } from '@/app/lib/actions';

export default function Page() {

    // States
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [ingredients, setIngredients] = useState(['']);
    const [instructions, setInstructions] = useState(['']);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Reference to file input element
    // to let it be clicked on whenever the user clicks on the upload box 
    const fileRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

    // Preview of image uploaded
    const handlePreview = () => {
        if (fileRef.current) {
            const file = fileRef.current.files![0];
            if (file) {
                const objectUrl = URL.createObjectURL(file);
                setImagePreview(objectUrl);
            }
        }
    }

    // Form Submission
    const initialFormState: RecipeFormState = {};
    const addRecipewithStates = addRecipe.bind(null, selectedCategories, selectedTypes, selectedSubCategories, ingredients, instructions);
    const [formState, setFormState] = useFormState(addRecipewithStates, initialFormState);
    console.log(formState);
    return (
        <div className="w-full mx-auto lg:w-4/5">
            <h1 className="text-xl">Add Recipe</h1>
            <form action={setFormState} className="mt-4 space-y-6 w-full">
                <div className="relative mb-3">
                    <label htmlFor="name" className="text-sm font-medium text-gray-500">Recipe Title</label>
                    <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-base outline-2 placeholder:text-gray-500 focus:outline-mallard-500"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Type title here" />
                </div>
                <MultiSelectDiv
                    classNameDiv="relative mb-3"
                    options={categories}
                    value={selectedCategories}
                    onChangeEv={setSelectedCategories}
                    labelledBy="Select Meal Categories"
                    ClearSelectedIcon={<XMarkIcon />}
                    disableSearch={true}
                />
                <MultiSelectDiv
                    classNameDiv="relative mb-3"
                    options={types}
                    value={selectedTypes}
                    onChangeEv={setSelectedTypes}
                    labelledBy="Select Meal Type(s)"
                    ClearSelectedIcon={<XMarkIcon />}
                    disableSearch={false}
                />
                <MultiSelectDiv
                    classNameDiv="relative mb-3"
                    options={subCategories}
                    value={selectedSubCategories}
                    onChangeEv={setSelectedSubCategories}
                    labelledBy="Select Meal Sub Categories"
                    ClearSelectedIcon={<XMarkIcon />}
                    disableSearch={false}
                />
                <AutoInput 
                    state={ingredients} 
                    setState={setIngredients} 
                    label="Add Ingredient(s)"
                    type="ingredients"
                    addButtonText="Add Ingredient"
                />
                <AutoInput 
                    state={instructions} 
                    setState={setInstructions} 
                    label="Add Instructions"
                    type="instructions"
                    addButtonText="Add Instruction"
                />
                <div className="relative mb-3">
                    <div className="flex flex-col items-start">
                        <label className="mb-2 text-sm font-medium text-gray-500">
                            {imagePreview ? 'Click on the preview to reupload a picture' : 'Upload a picture'}
                        </label>
                        <div 
                        className="w-52 h-52 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
                        onClick={handleClick}
                        >
                            {
                                imagePreview && 
                                <Image
                                src={imagePreview}
                                height={150}
                                width={150}
                                alt="Preview"
                                className="inset-0 w-full h-full object-cover rounded-lg"
                                />
                            }
                            <CloudArrowUpIcon className="hover:z-50 h-10 w-10 text-gray-400" />
                            <input 
                            type="file"
                            name="picture"
                            ref={fileRef}
                            accept="image/*"
                            className="hidden"
                            onChange={handlePreview}
                            aria-describedby="picture-error"
                            />
                        </div>
                        <div id="picture-error" aria-live="polite" aria-atomic="true">
                        {}
                    </div>
                </div>
                </div>
                <br />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white-50 font-bold py-2 px-4 rounded">Add Recipe</button>
            </form>
        </div>
    );
}