import { useSession } from "next-auth/react";
import { auth } from "@/auth";

export default async function Page() {
    const session = await auth();
    console.log("Session on page: ", session);
    return (
      <>
        <h1>Hi! {session?.user?.name}</h1>
        <p>Welcome to the dashboard!</p>
      </>
    );
}