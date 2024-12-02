export const BasicSkeleton = ({ className }:  { className: string }) => {
    return(
        <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
    );
}

export const FormSkeleton = () => {
    return(
        <div className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <BasicSkeleton className="h-6 w-48 mb-4" />
          <BasicSkeleton className="h-4 w-32 mb-2" />
          <BasicSkeleton className="h-10 w-full mb-4" />
          <BasicSkeleton className="h-4 w-32 mb-2" />
          <BasicSkeleton className="h-10 w-full mb-4" />
          <BasicSkeleton className="h-12 w-full mt-4" />
          <BasicSkeleton className="h-12 w-full mt-4" />
        </div>
      </div>
    );
}

export const EditFormSkeleton = () => {
  return (
    <div className="w-full mx-auto lg:w-4/5 animate-pulse">
        <div className="bg-gray-200 h-6 rounded mb-4"></div>
        <div className="relative mb-3">
            <label className="text-sm font-medium text-gray-500">Recipe Title</label>
            <div className="peer block w-full rounded-md border border-gray-200 py-[9px] text-base placeholder:text-gray-500 bg-gray-300 h-8"></div>
        </div>
        <div className="relative mb-3">
            <label className="text-sm font-medium text-gray-500">Select Meal Categories</label>
            <div className="h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="relative mb-3">
            <label className="text-sm font-medium text-gray-500">Select Meal Type(s)</label>
            <div className="h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="relative mb-3">
            <label className="text-sm font-medium text-gray-500">Select Meal Sub Categories</label>
            <div className="h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="relative mb-3">
            <label className="text-sm font-medium text-gray-500">Add Ingredient(s)</label>
            <div className="h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="relative mb-3">
            <label className="text-sm font-medium text-gray-500">Add Instructions</label>
            <div className="h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="relative mb-3">
            <label className="mb-2 text-sm font-medium text-gray-500">Upload a picture</label>
            <div className="w-52 h-52 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-300"></div>
        </div>
        <button className="bg-gray-400 h-10 w-32 rounded"></button>
    </div>
  );
}