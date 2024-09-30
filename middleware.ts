import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

// export default NextAuth(authConfig).auth;
export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/dashboard') {
    const session = await auth();
    if (!session) {
      return NextResponse.redirect('/login');
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};