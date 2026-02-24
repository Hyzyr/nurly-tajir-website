import Footer from '@/UI/base/Footer';
import Header from '@/UI/base/Header';
import { ExpertiseHero, ExpertiseList } from '@/UI/views/Expertise';


export default function Home() {

  return (
    <>
      <Header />
      <ExpertiseHero />
      <ExpertiseList />
      <Footer />
    </>
  );
}
