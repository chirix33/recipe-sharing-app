import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

// export default NextAuth(authConfig).auth;
export default async function middleware(request: NextRequest) {
  const visitingURL = request.nextUrl.pathname;
  const session = await auth();
  if (visitingURL.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
  } else if (visitingURL === '/login' || visitingURL === '/create') {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};