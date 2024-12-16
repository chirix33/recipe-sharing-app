"use client";

import { useState, useRef, useEffect } from 'react';
import { useActionState } from 'react';
import Image from 'next/image';
import Breadcrumbs from '@/app/ui/global/breadcrumbs';
import MultiSelectDiv from '@/app/ui/forms/multiselect';
import AutoInput from '@/app/ui/forms/auto-input';
import { XMarkIcon, CloudArrowUpIcon, HomeIcon } from '@heroicons/react/20/solid';
import { categories, types, subCategories } from '@/app/lib/types';
import { addRecipe, RecipeFormState } from '@/app/lib/actions';

export default function EditForm(
    { recipeID, recipeName, recipeImage, theIngredients, theInstructions }: 
    { 
        recipeID: string,
        recipeName: string,
        recipeImage: string,
        theIngredients: string[], 
        theInstructions: string[] 
    }) {
    const links = [
        { label: 'Dashboard', href: '/dashboard', icon: <HomeIcon className='w-6 h-6' /> },
        { label: `Edit Recipe: ${recipeName}`, href: `/edit/${recipeID}`, active: true }
    ];

    // States
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [ingredients, setIngredients] = useState(theIngredients);
    const [instructions, setInstructions] = useState(theInstructions);
    const [imagePreview, setImagePreview] = useState<string | null>(recipeImage);

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

    // clear form function
    const clearForm = () => {
        setSelectedCategories([]);
        setSelectedTypes([]);
        setSelectedSubCategories([]);
        setIngredients(['']);
        setInstructions(['']);
        setImagePreview(null);
    };

    // Form Submission
    const initialFormState: RecipeFormState = {};
    const addRecipewithStates = addRecipe.bind(null, selectedCategories, selectedTypes, selectedSubCategories, ingredients, instructions);
    const [formState, setFormState] = useActionState(addRecipewithStates, initialFormState);

    // Clear form when formState.success is true
    useEffect(() => {
        if (formState.success) {
            // send the user to the top of the page
            window.scrollTo(0, 0);
            clearForm();
        }
    }, [formState.success]);

    return (
        <div className="w-full mx-auto my-14 lg:w-4/5">
            {
                formState.success &&
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Recipe added successfully! </strong>
                    <span className="block sm:inline">You can now add another recipe. <a href="/dashboard" className="text-white-600 underline">View your recipes here</a></span>
                </div>
            }
            <Breadcrumbs breadcrumbs={links} />
            <form action={setFormState} className="mt-4 space-y-6 w-full">
                <div className="relative mb-3">
                    <label htmlFor="name" className="text-sm font-medium text-gray-500">Recipe Title</label>
                    <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-base outline-2 placeholder:text-gray-500 focus:outline-mallard-500"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Type title here" 
                    value={recipeName}
                    autoFocus={true}
                    />
                    {
                        formState.errors?.name && formState.errors.name[0] ? 
                        <span className="text-red-500">{
                            formState.errors.name[0]
                        }</span> : ''
                    }
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
                {
                    formState.errors?.categories && formState.errors.categories[0] ? 
                    <span className="text-red-500">{
                        formState.errors.categories[0]
                    }</span> : ''
                }
                <MultiSelectDiv
                    classNameDiv="relative mb-3"
                    options={types}
                    value={selectedTypes}
                    onChangeEv={setSelectedTypes}
                    labelledBy="Select Meal Type(s)"
                    ClearSelectedIcon={<XMarkIcon />}
                    disableSearch={false}
                />
                {
                    formState.errors?.types && formState.errors.types[0] ? 
                    <span className="text-red-500">{
                        formState.errors.types[0]
                    }</span> : ''
                }
                <MultiSelectDiv
                    classNameDiv="relative mb-3"
                    options={subCategories}
                    value={selectedSubCategories}
                    onChangeEv={setSelectedSubCategories}
                    labelledBy="Select Meal Sub Categories"
                    ClearSelectedIcon={<XMarkIcon />}
                    disableSearch={false}
                />
                {
                    formState.errors?.subCategories && formState.errors.subCategories[0] ? 
                    <span className="text-red-500">{
                        formState.errors.subCategories[0]
                    }</span> : ''
                }
                <AutoInput 
                    state={ingredients} 
                    setState={setIngredients} 
                    label="Add Ingredient(s)"
                    type="ingredients"
                    addButtonText="Add Ingredient"
                />
                {
                    formState.errors?.ingredients && formState.errors.ingredients[0] ? 
                    <span className="text-red-500">{
                        formState.errors.ingredients[0]
                    }</span> : ''
                }
                <AutoInput 
                    state={instructions} 
                    setState={setInstructions} 
                    label="Add Instructions"
                    type="instructions"
                    addButtonText="Add Instruction"
                />
                {
                    formState.errors?.instructions && formState.errors.instructions[0] ? 
                    <span className="text-red-500">{
                        formState.errors.instructions[0]
                    }</span> : ''
                }
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
                    {
                        formState.errors?.imagePreview && formState.errors.imagePreview[0] ? 
                        <span className="text-red-500">{
                            formState.errors.imagePreview[0]
                        }<br /></span> : ''
                    }
                </div>
                </div>
                <br />
                {
                    formState.errors?.other && formState.errors.other[0] ? 
                    <span className="text-red-500">{
                        formState.errors.other[0]
                    }<br /></span> : ''
                }
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white-50 font-bold py-2 px-4 rounded">Update Recipe</button>
            </form>
        </div>
    );
}