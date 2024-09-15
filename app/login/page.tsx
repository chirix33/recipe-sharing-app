import LoginForm from "@/app/ui/login-form";
import Logo from "../ui/logo";

export default function Page() {
    return (
        <main className="flex h-screen items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <Logo className="text-xl font-semibold text-center" />
                <LoginForm />
            </div>
        </main>
    );
}