import { getUserMeals } from "@/app/lib/functions";
import Table from "@/app/ui/dashboard/Table";

export default async function UserRecipes({ email } : { email: string }) {
    const userMeals = await getUserMeals(email);
    if (userMeals.length > 0) {
        return (
            <Table userMeals={userMeals} />
        );
    }

    return (
        <div className="flex justify-center items-center mt-4 min-h-24">
          <h3>You haven&apos;t added any recipes yet... Add now</h3>
        </div>
    );
}