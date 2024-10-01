import { auth } from "@/auth";
import { playwrite } from "../ui/fonts";
import Image from "next/image";

export default async function Page() {
    const session = await auth();
    const userImage = session?.user?.image || '';
    return (
      <>
      {/* Picture of the user */}
        <div className="flex justify-center items-center mt-4 mb-4">
          <Image 
          src={userImage} 
          alt="User profile picture" 
          className="w-16 h-16 rounded-full" 
          height={70}
          width={70}
          />
        </div>
        <h1 className="text-2xl text-center">Your Recipes, <span className={`${playwrite.className} block`}>{session?.user?.name}</span></h1>
        {/* Recipes list */}
        <div className="flex justify-center items-center mt-4 min-h-24">
          <h3>You haven&apos;t added any recipes yet... Add now</h3>
        </div>
      </>
    );
}