import '@/UI/assets/css/main.scss';

import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { locales } from '@/i18n/config';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-manrope',
});

type RootPropsType = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};
export const dynamic = 'force-dynamic'; // SSR on each request, + SSG
export const metadata: Metadata = {
  title: 'Nurly Tajir | Dowrebap Tehnologiya',
  description: 'Nurly Tajir | Dowrebap Tehnologiya',
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children }: RootPropsType) {
  const currentLocale = await getLocale();

  // const locale = await getLocale();
  // const messages = await loadMessages()
  // Enable static

  if (!hasLocale(locales, currentLocale)) {
    notFound();
  }

  return (
    <html lang={currentLocale}>
      <body className={`${manrope.variable} `}>
        <NextIntlClientProvider>
          <main className={'main'} id="main">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
