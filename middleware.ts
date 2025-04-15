import { auth } from "auth";
import { NextResponse } from "next/server";

const authRoutes = ["/login"];
const protectedRouteBase = "/app";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute =
    nextUrl.pathname === protectedRouteBase ||
    nextUrl.pathname.startsWith(`${protectedRouteBase}/`);
  const isAuthApi = nextUrl.pathname.startsWith("/api/auth");

  // Allow access to auth routes (like /login) if not logged in
  // or if it is an auth api route
  // and any routes that are public and available both while sign in or logged out
  if (!isProtectedRoute || isAuthApi || (!isLoggedIn && isAuthRoute)) {
    return NextResponse.next();
  }

  // if user is logged in and tries to access an auth route, redirect to home
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(protectedRouteBase, nextUrl));
  }

  // else redirect to login
  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// This also excludes the plasmic-host path from the middleware
export const config = {
  matcher: ["/:path((?!_next/|api/|favicon\\.ico|plasmic-host).*)"],
};
