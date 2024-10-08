"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { signUserOut } from "@/app/lib/actions";
import { UserCircleIcon, PlusIcon, ClipboardDocumentListIcon } from "@heroicons/react/20/solid";

export default function Navigation() {
    const links = [
        { href: "/dashboard", label: "Dashboard", icon: <UserCircleIcon className="inline w-6 h-6" /> },
        { href: "/dashboard/add", label: "Add Recipe", icon: <PlusIcon className="inline w-6 h-6" /> },
        { href: "/home", label: "All Recipes", icon: <ClipboardDocumentListIcon className="inline w-6 h-6" /> }
    ];

    const pathname = usePathname();

    return(
        <header className="bg-mallard-500 text-white p-4">
          <nav className="flex h-full items-center justify-center lg:justify-end">
            <ul role="navigation" className="list-none pl-0 flex h-full items-center justify-center text-sm lg:text-base">
                {
                    links.map(({href, label, icon}) => (
                      <Link 
                      key={href} 
                      href={href} 
                      className={
                        clsx({
                            "flex justify-center items-center gap-2 text-white px-4 py-2 rounded-md bg-white-100 text-black": pathname === href, 
                            "flex justify-center items-center gap-2 text-white px-4 py-2 rounded-md hover:bg-mallard-400": pathname !== href
                        })
                    }
                      >
                        {icon}
                        {label}
                      </Link>
                    ))
                }
                <form action={signUserOut}><button className="inline-block bg-white-400 text-black px-4 py-2 rounded-md hover:bg-gray-100">Sign Out</button></form>
            </ul>
          </nav>
        </header>
    );
}