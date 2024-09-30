import { signOut } from "@/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col h-screen">
        <header className="bg-mallard-500 text-white p-4">
          <h1 className="text-2xl mb-2">Dashboard</h1>
          <form action={async () => {'use server'; await signOut();}}><button className="inline-block bg-white-200 text-black px-4 py-2 rounded-md hover:bg-gray-100">Sign Out</button></form>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    );
}