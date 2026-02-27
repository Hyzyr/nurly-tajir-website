import Footer from '@/UI/base/Footer';
import Header from '@/UI/base/Header';
import { Contact } from '@/UI/views/Home';
import { ProjectsHero } from '@/UI/views/ProjectsPage/ProjectsHero';
import ProjectsList from '@/UI/views/ProjectsPage/ProjectsList';
import { useLocale } from 'next-intl';

export default function ProjectsPage() {
  const locale = useLocale();

  return (
    <>
      <Header />
      <ProjectsHero />
      <ProjectsList locale={locale} />
      <Contact />
      <Footer />
    </>
  );
}
