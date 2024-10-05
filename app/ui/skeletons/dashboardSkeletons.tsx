export function UserRecipesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <RecipesCards key={index} />
      ))}
    </div>
  );
}

const RecipesCards = () => (
  <div className="relative bg-gray-200 rounded-md p-4 min-h-48 animate-pulse">
    <div className="h-6 bg-gray-300 rounded-full w-3/4 mb-4" />
    <div className="h-1 w-10 bg-gray-400 rounded-full my-2" />
    <div className="h-4 bg-gray-300 rounded-full w-1/2 mb-2" />
    <div className="h-4 bg-gray-300 rounded-full w-2/3 mb-4" />
    <div className="absolute bottom-2.5 left-4 bg-gray-400 h-10 w-24 rounded-md" />
  </div>
);