import type { Metadata } from "next";
import { quicksand } from "@/app/ui/global/fonts";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Recipe & Meals Sharing App",
  description: "A simple app to share recipes and meals.",
  icons: ["/icon.ico"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} antialiased`}
      >
        <SessionProvider basePath={"/auth"} session={session}>
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
