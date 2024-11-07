export default function Page() {
    return (
        <>
        <div className="mb-8 w-full h-28 bg-white-100 flex flex-col justify-center items-center p-4">
            <h2>Search for Recipes</h2>
        </div>
        <div className="flex flex-col items-center">
            {/* <h2 className="text-2xl mb-2">Featured Recipes</h2> */}
            <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg">
                    <div className="w-full h-48 bg-zinc-400 mb-4"></div>
                    <h3 className="text-xl">Recipe 1</h3>
                    <p>Recipe description</p>
                </div>
                <div className="p-4 rounded-lg">
                    <div className="w-full h-48 bg-zinc-400 mb-4"></div>
                    <h3 className="text-xl">Recipe 2</h3>
                    <p>Recipe description</p>
                </div>
                <div className="p-4 rounded-lg">
                    <div className="w-full h-48 bg-zinc-400 mb-4"></div>
                    <h3 className="text-xl">Recipe 3</h3>
                    <p>Recipe description</p>
                </div>
            </div>
        </div>
        </>
    );
}