import Footer from '@/UI/base/Footer';
import Header from '@/UI/base/Header';
import About from '@/UI/views/Home/About';
import Contact from '@/UI/views/Home/Contact';
import Hero from '@/UI/views/Home/Hero';
import Partners from '@/UI/views/Home/Partners';
import Products from '@/UI/views/Home/Products';
import Projects from '@/UI/views/Home/Projects';
import Services from '@/UI/views/Home/Services';

import { useLocale } from 'next-intl';
import { ContactModalProvider } from '@/UI/components/ContactModal';

export default function Home() {
  const locale = useLocale();
  return (
    <ContactModalProvider>
      <Header />
      <div id="pin">
        <Hero />
        <Projects locale={locale} />
      </div>
      <Services />
      <Partners />  
      <Products />
      <About />
      <Contact />
      <Footer />
    </ContactModalProvider>
  );
}
