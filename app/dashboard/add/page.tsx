"use client";

import { useState } from 'react';
import MultiSelectDiv from '@/app/ui/forms/multiselect';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { categories, types, subCategories } from '@/app/lib/types';

export default function Page() {
    
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);

    return (
        <div className="w-full mx-auto lg:w-4/5">
            <h1 className="text-xl">Add Recipe</h1>
            <form action="" className="mt-4 space-y-6 w-full">
                <div className="relative mb-3">
                    <label htmlFor="name" className="text-gray-500">Recipe Title</label>
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
                <div className="relative mb-3">
                    <textarea
                    className="peer resize-y h-36 block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-base outline-2 placeholder:text-gray-500 focus:outline-mallard-500"
                    id="instructions"
                    name="instructions"
                    placeholder="Instructions"></textarea>
                </div>
            </form>
        </div>
    );
}