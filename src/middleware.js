import { NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export function middleware(req) {
  const has = !!getSessionCookie(req);
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/payment')) {
    if (!has) return NextResponse.redirect(new URL(`/sign-in?redirect=${encodeURIComponent(pathname)}`, req.url));
  } else if (has) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ['/dashboard/:path*', '/payment/:path*', '/sign-in', '/sign-up'] };
