export default function Page() {
    return (
        <div className="w-full mx-auto lg:w-4/5">
            <h1 className="text-xl">Add Recipe</h1>
            <form action="" className="mt-4 space-y-6 w-full">
                <div className="relative">
                    <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-base outline-2 placeholder:text-gray-500 focus:outline-mallard-500"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Recipe Title"
                    />
                </div>
                <div className="relative">
                    <textarea
                    className="peer resize-y h-36 block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-base outline-2 placeholder:text-gray-500 focus:outline-mallard-500"
                    id="instructions"
                    name="instructions"
                    placeholder="Instructions"></textarea>
                </div>
                <div className="relative">
                    <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-base outline-2 placeholder:text-gray-500 focus:outline-mallard-500"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Prep Time"
                    />
                </div>
            </form>
        </div>
    );
}