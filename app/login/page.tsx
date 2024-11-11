import Logo from "../ui/global/logo";
import { Suspense } from "react";
import LoginForm from "@/app/ui/forms/login-form";
import { FormSkeleton } from "@/app/ui/skeletons/formSkeletons";

export default function Page() {
    // TODO: Grap the user's email from the query string and check if it exists in the database
    // If it does, set the email input field to the user's email
    // If it doesn't, do nothing
    return (
        <main className="flex h-screen items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <Logo className="text-xl font-semibold text-center" />
                <Suspense fallback={<FormSkeleton />}>
                    <LoginForm />
                </Suspense>
            </div>
        </main>
    );
}