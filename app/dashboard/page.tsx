import { auth } from "@/auth";
import { playwrite } from "@/app/ui/global/fonts";
import UserImage from "@/app/ui/dashboard/UserImage";
import UserRecipes from "@/app/ui/dashboard/UserRecipes";

export default async function Page() {
    const session = await auth();
    const userImage = session?.user?.image || '';
    return (
      <>
        {/* Picture of the user */}
        <UserImage 
        divClassName="flex justify-center items-center mt-4 mb-4" 
        userImage={userImage} 
        imageClassName="w-16 h-16 rounded-full" />

        <h1 className="text-2xl text-center">Your Recipes, <span className={`${playwrite.className} block`}>{session?.user?.name}</span></h1>
        
        {/* Recipes list */}
        <UserRecipes email={session?.user?.email || ''} />
      </>
    );
}