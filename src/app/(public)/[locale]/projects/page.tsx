import Footer from '@/UI/base/Footer';
import Header from '@/UI/base/Header';
import { ProjectsHero } from '@/UI/views/Projects/ProjectsHero';
import ProjectsList from '@/UI/views/Projects/ProjectsList';

import { useLocale } from 'next-intl';

export default function Home() {
  const locale = useLocale();

  return (
    <>
      <Header />
      <ProjectsHero />
      <ProjectsList />
      <Footer />
    </>
  );
}
