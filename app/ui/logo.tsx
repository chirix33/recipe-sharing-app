import { playwrite } from "./fonts";
import Link from "next/link";

export default function Logo({ className } : { className?: string }) {
    return (
        <div className="mx-auto flex items-center space-x-2">
            <span className={`${className} ${playwrite.className}`}><Link href={`/`}>RecipeShare</Link></span>
        </div>
    );
}