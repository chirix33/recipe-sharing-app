import { notFound } from "next/navigation";
import { getRecipe } from "@/app/lib/functions";
import RecipeInfo from "@/app/ui/recipes/recipeInfo";
// import { RecipeInfoSkeleton } from "@/app/ui/skeletons/recipeListSkeletons";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const recipe = await getRecipe(id);
    if (!recipe) {
        notFound();
    }

    return(
        <RecipeInfo recipe={recipe} />
    );
}