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
