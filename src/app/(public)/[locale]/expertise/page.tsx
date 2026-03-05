import Footer from '@/UI/base/Footer';
import Header from '@/UI/base/Header';
import { ExpertiseHero } from '@/UI/views/Expertise';
import ExpertiseList from '@/UI/views/Expertise/ExpertiseList';
import { Contact } from '@/UI/views/Home';
import { getLocale, getTranslations } from 'next-intl/server';
import type { Locales } from '@/i18n/config';
import { fetchExpertise } from '@/UI/fetch';
import type { Metadata } from 'next';
import JsonLd, {
  generateWebPageJsonLd,
  generateBreadcrumbJsonLd,
} from '@/UI/components/JsonLd';

const SITE_URL = 'https://nurlytajir.com';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'seo.expertise' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}/expertise`,
      type: 'website',
      images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/expertise`,
      languages: {
        en: `${SITE_URL}/en/expertise`,
        ru: `${SITE_URL}/ru/expertise`,
        tk: `${SITE_URL}/tm/expertise`,
      },
    },
  };
}

export default async function ExpertisePage() {
  const locale = (await getLocale()) as Locales;
  const expertise = await fetchExpertise(locale);

  return (
    <>
      <JsonLd
        data={[
          generateWebPageJsonLd(
            'Our Expertise',
            'Full range of IT infrastructure and technology solutions by Nurly Tajir in Turkmenistan.',
            `/${locale}/expertise`,
            'CollectionPage'
          ),
          generateBreadcrumbJsonLd([
            { name: 'Home', path: `/${locale}` },
            { name: 'Expertise', path: `/${locale}/expertise` },
          ]),
        ]}
      />
      <Header />
      <ExpertiseHero />
      <ExpertiseList data={expertise} />
      <Contact />
      <Footer />
    </>
  );
}
