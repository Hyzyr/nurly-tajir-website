import '@/UI/assets/css/main.scss';

import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import {
  NextIntlClientProvider,
  IntlProvider as NextIntlProvider,
} from 'next-intl';
import { notFound } from 'next/navigation';
import i18n from '../../../../next-intl.config';
import { getLocale } from 'next-intl/server';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-manrope',
});

type RootPropsType = {
  children: React.ReactNode;
};
export const dynamic = 'force-dynamic'; // SSR on each request, + SSG
export const metadata: Metadata = {
  title: 'Nurly Tajir | Dowrebap Tehnologiya',
  description: 'Nurly Tajir | Dowrebap Tehnologiya',
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children }: RootPropsType) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${manrope.variable} `}>
        <NextIntlClientProvider locale={locale}>
          <main className={'main'} id="main">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
