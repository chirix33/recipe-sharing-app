"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { signUserOut } from "@/app/lib/actions";
import { UserCircleIcon, PlusIcon, ClipboardDocumentListIcon, XMarkIcon } from "@heroicons/react/20/solid";

export default function Navigation() {
    const links = [
        { href: "/dashboard", label: "Dashboard", icon: <UserCircleIcon className="inline w-6 h-6" /> },
        { href: "/dashboard/add", label: "Add Recipe", icon: <PlusIcon className="inline w-6 h-6" /> },
        { href: "/recipes", label: "All Recipes", icon: <ClipboardDocumentListIcon className="inline w-6 h-6" /> }
    ];

    const pathname = usePathname();

    const [isNavVisible, setNavVisible] = useState(false);


    return(
        <header className="bg-mallard-500 text-white h-16 lg:h-auto p-4">
          <div className="flex justify-between items-center lg:hidden">
            <h1 className="text-xl">
              {
                links.find(({href}) => href === pathname)?.label
              }
            </h1>
            <button onClick={() => setNavVisible(!isNavVisible)} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
          
          {/* Navbar on Mobile Screens */}
          <nav className={`z-50 lg:hidden transition-all transition-300 fixed w-full top-0 left-0 bg-mallard-500 flex flex-col justify-center items-center gap-8 nav-menu ${isNavVisible ? 'show' : ''}`}>
          <button className="absolute top-5 right-4" onClick={() => setNavVisible(!isNavVisible)}>
            <XMarkIcon className="w-8 h-8" />
          </button>
          {
              links.map(({href, label, icon}) => (
                <Link
                key={href} 
                href={href} 
                className={
                  clsx("flex justify-center items-center gap-2 text-white px-4 py-2 rounded-md", {
                      "bg-white-100 text-black": pathname === href, 
                      "hover:bg-mallard-400": pathname !== href
                  })
                }
                onClick={() => setNavVisible(false)}
                >
                  {icon}
                  {label}
                </Link>
              ))
          }
          <form action={signUserOut}><button className="inline-block bg-white-500 text-black px-4 py-2 rounded-md hover:bg-gray-100">Sign Out</button></form>
          </nav>

          {/* Navbar on Large Screen */}
          <nav className="hidden lg:flex h-full items-center justify-center lg:justify-end">
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