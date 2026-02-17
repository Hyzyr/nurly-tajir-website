import styles from './styles.module.scss';

import Container from '@/UI/containers';
import HeroBg from './HeroBg';
import { FormatText } from '@/UI/components/FormatText';
import HeroCta from './HeroCta';

type HeroProps = {
  title: string;
  tagline: string;
};
const Hero = ({ title, tagline }: HeroProps) => {
  return (
    <section className={styles.hero} id="hero">
      <Container>
        <div className={styles.hero__body}>
          <div className={styles.hero__content}>
            <h6 className="subtitle">{tagline}</h6>
            <h1 className="h1">
              <FormatText text={title} />
            </h1>
            <HeroCta />
          </div>
          <HeroBg />
        </div>
      </Container>
    </section>
  );
};

export default Hero;
