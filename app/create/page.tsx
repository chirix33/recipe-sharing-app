import CreateForm from "@/app/ui/create-form";
import Logo from "../ui/logo";
import { Suspense } from "react";
import { FormSkeleton } from "../ui/Skeletons/formSkeletons";

export default function Page() {
    return (
        <main className="flex h-screen items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
                <Logo className="text-xl font-semibold text-center mt-10" />
                <Suspense fallback={<FormSkeleton />}>
                    <CreateForm />
                </Suspense>
            </div>
        </main>
    );
}