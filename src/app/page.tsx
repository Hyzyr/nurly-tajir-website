import Footer from '@/UI/base/Footer';
import Header from '@/UI/base/Header';
import About from '@/UI/views/About';
import Contact from '@/UI/views/Contact';
import Hero from '@/UI/views/Hero';
import Partners from '@/UI/views/Partners';
import Products from '@/UI/views/Products';
import Projects from '@/UI/views/Projects';
import Services from '@/UI/views/Services';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Projects />
      <Services />
      <Partners />
      <Products />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
