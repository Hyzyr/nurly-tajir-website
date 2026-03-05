import Footer from '@/UI/base/Footer';
import Header from '@/UI/base/Header';
import { Contact } from '@/UI/views/Home';
import { ProjectsHero } from '@/UI/views/ProjectsPage/ProjectsHero';
import ProjectsList from '@/UI/views/ProjectsPage/ProjectsList';
import { getLocale, getTranslations } from 'next-intl/server';
import type { Locales } from '@/i18n/config';
import { fetchProjectsList } from '@/UI/fetch';
import type { Metadata } from 'next';
import JsonLd, {
  generateWebPageJsonLd,
  generateBreadcrumbJsonLd,
} from '@/UI/components/JsonLd';

const SITE_URL = 'https://nurytajir.com';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'seo.projects' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}/projects`,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/projects`,
      languages: {
        en: `${SITE_URL}/en/projects`,
        ru: `${SITE_URL}/ru/projects`,
        tk: `${SITE_URL}/tm/projects`,
      },
    },
  };
}

export default async function ProjectsPage() {
  const locale = (await getLocale()) as Locales;
  const projects = await fetchProjectsList(locale);

  return (
    <>
      <JsonLd
        data={[
          generateWebPageJsonLd(
            'Our Projects',
            'Completed IT infrastructure and technology projects by Nurly Tajir across Turkmenistan.',
            `/${locale}/projects`,
            'CollectionPage'
          ),
          generateBreadcrumbJsonLd([
            { name: 'Home', path: `/${locale}` },
            { name: 'Projects', path: `/${locale}/projects` },
          ]),
        ]}
      />
      <Header />
      <ProjectsHero />
      <ProjectsList data={projects} />
      <Contact />
      <Footer />
    </>
  );
}
