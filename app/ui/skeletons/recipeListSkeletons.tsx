import { Skeleton } from '@mui/material';

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

export function RecipeInfoSkeleton() {
    return (
        <div className="content p-4 mt-4">
            <div className="recipe-info w-full lg:w-3/4 mx-auto flex flex-col mt-4">
                <div className="recipe-image w-full h-96">
                    <Skeleton variant="rectangular" height={600} />
                </div>
                <div className="my-8">
                    <Skeleton variant="text" width="60%" height={40} className="mx-auto" />
                    <Skeleton variant="text" width="40%" height={20} className="mx-auto mt-2" />
                </div>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <h3><Skeleton variant="text" width="30%" /></h3>
                        <div className="flex justify-start items-center mb-2 py-4 lg:mb-8">
                            <Skeleton variant="rectangular" width={100} height={30} className="mr-2" />
                            <Skeleton variant="rectangular" width={100} height={30} className="mr-2" />
                        </div>
                    </div>
                    <div>
                        <h3><Skeleton variant="text" width="30%" /></h3>
                        <div className="flex justify-start items-center py-4 mb-8">
                            <Skeleton variant="rectangular" width={100} height={30} className="mr-2" />
                            <Skeleton variant="rectangular" width={100} height={30} className="mr-2" />
                        </div>
                    </div>
                </div>
                <h3 className="text-xl"><Skeleton variant="text" width="15%" /></h3>
                <hr />
                <ul className="list-disc text-lg pl-4 mt-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <li key={index}>
                            <Skeleton variant="text" width="80%" />
                        </li>
                    ))}
                </ul>
                <br />
                <h3 className="text-xl"><Skeleton variant="text" width="15%" /></h3>
                <hr />
                <ul className="list-decimal text-lg pl-4 mt-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <li key={index}>
                            <Skeleton variant="text" width="80%" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}