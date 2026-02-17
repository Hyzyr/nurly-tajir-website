import Footer from '@/UI/base/Footer';
import Header from '@/UI/base/Header';

import { useLocale } from 'next-intl';

import { HomeHero, Projects, About, Contact, Partners, Products, Services } from '@/UI/views/Home';

export default function Home() {
  const locale = useLocale();

  return (
    <>
      <Header />
      <div id="pin" className="change-auto mark-3d">
        <HomeHero />
        <Projects locale={locale} />
      </div>
      <Services />
      <Partners />
      <Products />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
