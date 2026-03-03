import Footer from '@/UI/base/Footer';
import Header from '@/UI/base/Header';
import { ExpertiseHero } from '@/UI/views/Expertise';
import ExpertiseList from '@/UI/views/Expertise/ExpertiseList';
import { Contact } from '@/UI/views/Home';
import { getLocale } from 'next-intl/server';
import type { Locales } from '@/i18n/config';
import { fetchExpertise } from '@/UI/fetch';

export default async function ExpertisePage() {
  const locale = (await getLocale()) as Locales;
  const expertise = await fetchExpertise(locale);

  return (
    <>
      <Header />
      <ExpertiseHero />
      <ExpertiseList data={expertise} />
      <Contact />
      <Footer />
    </>
  );
}
