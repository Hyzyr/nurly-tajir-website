import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request (example)
  const defaultLocale = request.headers.get('x-your-custom-locale') || 'en';
  const locales = ['en', 'de'];
  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware({
    locales: locales,
    defaultLocale: defaultLocale,
  });
  const response = handleI18nRouting(request);

  // Step 3: Alter the response (example)
  response.headers.set('x-your-custom-locale', defaultLocale);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*'],
};
