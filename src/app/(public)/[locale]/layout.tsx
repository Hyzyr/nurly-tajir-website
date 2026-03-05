import '@/UI/assets/css/main.scss';

import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/config';
import { ContactModalProvider } from '@/UI/components/ContactModal';
import { LenisProvider } from '@/providers/LenisProvider';
import JsonLd, { organizationJsonLd } from '@/UI/components/JsonLd';

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
// Revalidate all public pages every hour (ISR).
// Data rarely changes; on-demand revalidation is also possible via cache tags.
export const revalidate = 3600;

const SITE_URL = 'https://nurytajir.com';

const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  ru: 'ru_RU',
  tm: 'tk_TM',
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'seo.home' });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: '%s | Nurly Tajir',
    },
    description: t('description'),
    keywords: [
      'Nurly Tajir',
      'IT infrastructure Turkmenistan',
      'IT company Ashgabat',
      'network infrastructure Turkmenistan',
      'CCTV Ashgabat',
      'access control systems Turkmenistan',
      'fire detection systems',
      'IP telephony Turkmenistan',
      'video wall solutions',
      'smart building Turkmenistan',
      'Samsung distributor Turkmenistan',
      'Bosch distributor Turkmenistan',
      'Cisco Turkmenistan',
      'Hikvision Turkmenistan',
      'Honeywell Turkmenistan',
      'Philips Turkmenistan',
      'IT solutions Ashgabat',
      'technology company Turkmenistan',
      'Nury Tajir',
      'Döwrebap Tehnologiýa',
    ],
    authors: [{ name: 'Nurly Tajir' }],
    creator: 'Nurly Tajir',
    publisher: 'Nurly Tajir',
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    openGraph: {
      type: 'website',
      locale: OG_LOCALE_MAP[locale] ?? 'en_US',
      url: `${SITE_URL}/${locale}`,
      siteName: 'Nurly Tajir',
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Nurly Tajir — IT Infrastructure & Technology Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/og-image.jpg'],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        ru: `${SITE_URL}/ru`,
        tk: `${SITE_URL}/tm`,
      },
    },
  };
}

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
        <JsonLd data={organizationJsonLd} />
        <LenisProvider>
          <NextIntlClientProvider>
            <main className={'main'} id="main">
              <ContactModalProvider>{children}</ContactModalProvider>
            </main>
          </NextIntlClientProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
