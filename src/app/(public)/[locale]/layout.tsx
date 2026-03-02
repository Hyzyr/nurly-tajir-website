import '@/UI/assets/css/main.scss';

import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
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
export const dynamic = 'force-dynamic';

const SITE_URL = 'https://nurytajir.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Nurly Tajir — IT Infrastructure & Technology Solutions in Turkmenistan',
    template: '%s | Nurly Tajir',
  },
  description:
    'Nurly Tajir is a leading IT and infrastructure company in Ashgabat, Turkmenistan. Official distributor of Samsung, Bosch, Cisco, Hikvision, Honeywell & Philips. Network infrastructure, CCTV, access control, fire detection, IP telephony, video walls, and smart building solutions.',
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
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Nurly Tajir',
    title: 'Nurly Tajir — IT Infrastructure & Technology Solutions in Turkmenistan',
    description:
      'Leading IT company in Ashgabat offering network infrastructure, CCTV, access control, fire detection, IP telephony, video walls, and smart building solutions. Official distributor of Samsung, Bosch, Cisco, Hikvision, Honeywell & Philips.',
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
    title: 'Nurly Tajir — IT Infrastructure & Technology Solutions in Turkmenistan',
    description:
      'Leading IT company in Ashgabat offering network infrastructure, CCTV, access control, fire detection, IP telephony, and smart building solutions.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: `${SITE_URL}/en`,
      ru: `${SITE_URL}/ru`,
      tk: `${SITE_URL}/tm`,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
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
