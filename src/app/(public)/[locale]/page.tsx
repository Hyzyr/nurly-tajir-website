import Footer from '@/UI/base/Footer';
import Header from '@/UI/base/Header';

import { getLocale } from 'next-intl/server';
import type { Locales } from '@/i18n/config';

import { HomeHero, About, Contact, Partners } from '@/UI/views/Home';
import Services from '@/UI/views/Home/Services';
import Products from '@/UI/views/Home/Products';
import Projects from '@/UI/views/Home/Projects';
import { fetchServices, fetchProducts, fetchProjects } from '@/UI/fetch';

export default async function Home() {
  const locale = (await getLocale()) as Locales;

  const [services, products, projects] = await Promise.all([
    fetchServices(locale),
    fetchProducts(locale),
    fetchProjects(locale),
  ]);

  return (
    <>
      <Header />
      <div id="pin" className="change-auto mark-3d">
        <HomeHero />
        <Projects data={projects} />
      </div>
      <Services data={services} />
      <Partners />
      <Products data={products} />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
