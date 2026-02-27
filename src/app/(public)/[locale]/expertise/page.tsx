import Footer from '@/UI/base/Footer';
import Header from '@/UI/base/Header';
import { ExpertiseHero, ExpertiseList } from '@/UI/views/Expertise';
import { Contact } from '@/UI/views/Home';
import { useLocale } from 'next-intl';

export default function ExpertisePage() {
  const locale = useLocale();

  return (
    <>
      <Header />
      <ExpertiseHero />
      <ExpertiseList locale={locale} />
      <Contact />
      <Footer />
    </>
  );
}
