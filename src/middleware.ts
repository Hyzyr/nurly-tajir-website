import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get('x-your-custom-locale') || 'en';
  const locales = ['en', 'ru', 'tm'];

  const handleI18nRouting = createMiddleware({
    locales: locales,
    defaultLocale: defaultLocale,
  });
  const response = handleI18nRouting(request);

  response.headers.set('x-your-custom-locale', defaultLocale);

  return response;
}

export const config = {
  matcher: ['/', '/(en|ru|tm)/:path*'],
};
