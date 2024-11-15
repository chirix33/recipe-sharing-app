import { auth } from "@/auth";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/20/solid";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await auth();
  return (
    // Nav for all the Recipe Pages
    <div className="flex flex-col h-screen">
      <header className="flex justify-between bg-mallard-500 text-white p-4">
        <h1 className="text-xl"><Link href="/recipes">Explore Recipes</Link></h1>
        {
          user ? 
          (<Link href="/dashboard" className="text-emerald-950 font-bold flex items-center justify-center gap-2"><UserCircleIcon className="w-6 h-6" /> My Account</Link>) : 
          (<span className="text-emerald-950 font-bold flex items-center justify-center gap-2"><Link href="/login">Login</Link> | <Link href="/create">Sign Up</Link></span>)
        }
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}