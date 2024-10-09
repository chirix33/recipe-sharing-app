import { Dispatch, SetStateAction } from 'react';
import { MultiSelect } from 'react-multi-select-component';

export default function MultiSelectDiv({ 
    classNameDiv,
    options,
    value,
    onChangeEv,
    labelledBy,
    ClearSelectedIcon,
    disableSearch = false
 }: {
    classNameDiv: string,
    options: { label: string, value: string }[],
    value: { label: string, value: string }[],
    onChangeEv: Dispatch<SetStateAction<never[]>>,
    labelledBy: string,
    ClearSelectedIcon: JSX.Element,
    disableSearch: boolean}) {
        return(
            <div className={classNameDiv}>
            {
                value.length === 0 ? <label htmlFor="name" className="text-gray-500">{labelledBy}</label> : 
                <div className="mb-2 w-full bg-gray-300 flex gap-2 rounded-md py-2 px-4">
                {value.map(({ label }) => <span className="inline-block h-6 flex justify-center items-center bg-white-50 rounded-md p-4 text-sm" key={label}>{label}</span>)}
                </div>
            }
                <MultiSelect
                    options={options}
                    value={value}
                    onChange={onChangeEv}
                    labelledBy={labelledBy}
                    ClearSelectedIcon={ClearSelectedIcon}
                    disableSearch={disableSearch}
                />
            </div>
        )
}