import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import i18n from '../next-intl.config';
import { updateSession } from './utils/supabase/middleware';

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('🛎️  Incoming cookies:', request.cookies.getAll());

  // 1) Always let Supabase refresh/set cookies first
  const supabaseResponse = await updateSession(request);
  const setCookies = supabaseResponse.cookies.getAll();
  console.log('📦 Supabase set-cookie:', setCookies);

  // 2) If this is a protected route, skip i18n entirely
  if (
    pathname === '/dashboard' ||
    pathname.startsWith('/dashboard/') ||
    pathname === '/profile'   ||
    pathname.startsWith('/profile/') ||
    pathname === '/settings'  ||
    pathname.startsWith('/settings/')
  ) {
    return supabaseResponse;
  }

  // 3) Otherwise run the i18n middleware
  const defaultLocale =
    request.headers.get('x-your-custom-locale') ||
    i18n.defaultLocale;
  const handleI18n = createMiddleware({
    locales: i18n.locales,
    defaultLocale
  });
  const intlResponse = handleI18n(request);

  // 4) Merge any headers from the i18n step into the Supabase response
  intlResponse.headers.forEach((value, key) => {
    supabaseResponse.headers.set(key, value);
  });

  // 5) And also merge cookies (in case i18n wants to set one)
  intlResponse.cookies.getAll().forEach((cookie) => {
    const { name, value, ...opts } = cookie;
    supabaseResponse.cookies.set(name, value, opts);
  });
  // 6) Return the supabaseResponse (now enriched with i18n headers/cookies)
  return supabaseResponse;
}

export const config = {
  matcher: [
    '/',                       // root
    '/(en|de|ru|tm)/:path*',   // i18n-prefixed pages
    '/dashboard/:path*',       // protected—skip i18n
    '/profile/:path*',         // protected—skip i18n
    '/settings/:path*'         // protected—skip i18n
  ]
};
