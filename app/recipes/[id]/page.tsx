import RecipeInfo from "@/app/ui/recipes/recipeInfo";
import { Suspense } from "react";
import { RecipeInfoSkeleton } from "@/app/ui/skeletons/recipeListSkeletons";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    return(
        <Suspense fallback={<RecipeInfoSkeleton />}>
            <RecipeInfo id={id} />
        </Suspense>
    );
}