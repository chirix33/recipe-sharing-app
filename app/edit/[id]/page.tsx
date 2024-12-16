import { EditFormSkeleton } from "@/app/ui/skeletons/formSkeletons";
import { getRecipe } from "@/app/lib/functions";
import { notFound } from "next/navigation";
import EditForm from "@/app/ui/forms/edit-form";
import { Suspense } from 'react';

export default async function Page(props: { params: Promise<{ id?: string }> }) {
    const params = await props.params;
    const id = params.id || '';
    const recipe = await getRecipe(id);
    if (!recipe) {
        notFound();
    }

    return (
        <Suspense fallback={<EditFormSkeleton />}>
            <EditForm
            recipeID={recipe.id}
            recipeName={recipe.name}
            recipeImage={recipe.image}
            theInstructions={recipe.instructions}
            theIngredients={recipe.ingredients}
            />
        </Suspense>
    );
}