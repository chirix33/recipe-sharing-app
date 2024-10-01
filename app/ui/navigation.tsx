"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { signUserOut } from "@/app/lib/actions";

export default function Navigation() {
    const links = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/home", label: "Browse All Recipes" },
        { href: "/add", label: "Add Recipe" },
    ];

    const pathname = usePathname();

    return(
        <header className="bg-mallard-500 text-white p-4">
          <nav className="flex h-full items-center justify-center lg:justify-end">
            <ul role="navigation" className="list-none pl-0 flex h-full items-center justify-center text-sm lg:text-base">
                {
                    links.map(({href, label}) => (
                      <Link 
                      key={href} 
                      href={href} 
                      className={
                        clsx({
                            "text-white px-4 py-2 rounded-md bg-white-100 text-black": pathname === href, 
                            "text-white px-4 py-2 rounded-md hover:bg-mallard-400": pathname !== href
                        })
                    }
                      >{label}
                      </Link>
                    ))
                }
                <form action={signUserOut}><button className="inline-block bg-white-400 text-black px-4 py-2 rounded-md hover:bg-gray-100">Sign Out</button></form>
            </ul>
          </nav>
        </header>
    );
}