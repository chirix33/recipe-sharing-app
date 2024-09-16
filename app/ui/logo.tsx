import { playwrite } from "./fonts";

export default function Logo({ className } : { className?: string }) {
    return (
        <div className="mx-auto flex items-center space-x-2">
            <span className={`${className} ${playwrite.className}`}>RecipeShare</span>
        </div>
    );
}