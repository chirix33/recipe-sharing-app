export default function RecipeListSkeleton() {
    return (
        <div className="flex flex-col items-center">
            <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="p-4 bg-stone-50 rounded-lg animate-pulse">
                        <div className="w-full h-48 bg-zinc-200 mb-4"></div>
                        <div id="recipe-card-details" className="w-full flex flex-col justify-center">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                                <div className="h-6 bg-zinc-300 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-mallard-300 rounded w-1/4"></div>
                            </div>
                            <div className="flex mt-2">
                                {Array.from({ length: 3 }).map((_, idx) => (
                                    <div key={idx} className="h-4 bg-zinc-300 rounded mr-2 w-1/4"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}