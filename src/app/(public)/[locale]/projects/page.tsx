import Footer from '@/UI/base/Footer';
import Header from '@/UI/base/Header';
import { Contact } from '@/UI/views/Home';
import { ProjectsHero } from '@/UI/views/ProjectsPage/ProjectsHero';
import ProjectsList from '@/UI/views/ProjectsPage/ProjectsList';
import { getLocale } from 'next-intl/server';
import type { Locales } from '@/i18n/config';
import { fetchProjectsList } from '@/UI/fetch';

export default async function ProjectsPage() {
  const locale = (await getLocale()) as Locales;
  const projects = await fetchProjectsList(locale);

  return (
    <>
      <Header />
      <ProjectsHero />
      <ProjectsList data={projects} />
      <Contact />
      <Footer />
    </>
  );
}
