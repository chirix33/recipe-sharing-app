import { EditFormSkeleton } from "@/app/ui/skeletons/formSkeletons";
import { getRecipe } from "@/app/lib/functions";
import { notFound } from "next/navigation";
import EditForm from "@/app/ui/forms/edit-form";
import { Suspense } from 'react';

export default async function Page({ params }: { params: { id?: string } }) {
    const id = params.id || '';
    const recipe = await getRecipe(id);
    if (!recipe) {
        notFound();
    }

    return (
        <Suspense fallback={<EditFormSkeleton />}>
            <EditForm
            recipeName={recipe.name}
            recipeID={recipe.id}
            theInstructions={recipe.instructions}
            theIngredients={recipe.ingredients}
            />
        </Suspense>
    );
}