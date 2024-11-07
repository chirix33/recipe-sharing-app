import { auth } from "@/auth";
import Link from "next/link";
import { UserCircleIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/20/solid";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await auth();
  return (
    // Nav for all the Recipe Pages
    <div className="flex flex-col">
      <header className="flex justify-between bg-mallard-500 text-white p-4">
        <h1 className="text-xl">Explore Recipes</h1>
        {
          user ? 
          (<Link href="/dashboard" className="underline text-emerald-950 font-bold flex items-center justify-center gap-2"><UserCircleIcon className="w-6 h-6" /> My Account</Link>) : 
          (<Link href="/login" className="underline text-emerald-950 font-bold flex items-center justify-center gap-2"><ArrowRightEndOnRectangleIcon className="w-6 h-6" /> Login / Sign Up</Link>)
        }
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}