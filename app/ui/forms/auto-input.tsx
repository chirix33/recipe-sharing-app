import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export default function AutoInput({ state, setState, label, type, addButtonText }: 
    { 
        state: string[], 
        setState: Dispatch<SetStateAction<string[]>>,
        label: string,
        type: string,
        addButtonText: string
    }) {
        function handleStateChange(index: number, e: ChangeEvent<HTMLInputElement>) {
            e.preventDefault();
            const values = [...state];
            values[index] = e.target.value;

            // Automatically add a new field if the last one is filled
            if (index === state.length - 1 && e.target.value.trim() !== '') {
                // add a new field to the ingredients array
                values.push('');
                setState([...values]);
            } else {
                setState(values);
            }
        }

        const handleRemoveState = (index: number) => {
            const updatedIngredients = [...state];
            if (updatedIngredients.length > 1) {
                updatedIngredients.splice(index, 1);
                console.log(updatedIngredients);
                setState(updatedIngredients);
            }
        };

        const handleAddAutoInput = () => {
            setState([...state, '']);
        }

        return(
            <div className="relative mb-3">
                <label htmlFor={type} className="text-sm font-medium text-gray-500">{label}</label>
                
                {
                    state.map((value, index) => (
                        <div key={index} className="relative">
                        <input
                            id={type}
                            className="peer block w-full rounded-md mb-2 border border-gray-200 py-[9px] pl-4 text-base outline-2 placeholder:text-gray-500 focus:outline-mallard-500"
                            type="text"
                            value={value}
                            onChange={(e) => handleStateChange(index, e)}
                        />
                        <button tabIndex={-1} onClick={()=>handleRemoveState(index)} className="absolute right-0 top-0 mt-3 mr-3" type="button">
                            <XCircleIcon className="text-mallard-500 w-6 h-6" />
                        </button>
                    </div>
                    ))
                }

                <button 
                onClick={handleAddAutoInput}
                className="block w-full bg-gray-200 hover:bg-gray-700 hover:text-white-50 font-bold text-lg p-2 rounded-md text-zinc-700 flex justify-center items-center mt-3 transition-all duration-300 ease-in-out" 
                type="button"
                >
                    {addButtonText + ' '}<PlusCircleIcon className="text-mallard-500 w-6 h-6" />
                </button>
            </div>
        );
}