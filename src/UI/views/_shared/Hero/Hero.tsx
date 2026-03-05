import styles from './styles.module.scss';

import Container from '@/UI/containers';
import HeroBg from './HeroBg';
import { FormatText } from '@/UI/components/FormatText';
import { PropsWithChildren } from 'react';

type HeroProps = PropsWithChildren & {
  title: string;
  tagline: string;
  children?: React.ReactNode;
  minHeight?: string | number;
  bgFixed?: boolean;
};

const Hero = ({ title, tagline, children, bgFixed, minHeight }: HeroProps) => {
  return (
    <section className={styles.hero} id="hero">
      <Container>
        <div className={styles.hero__body} style={{ minHeight }}>
          <div className={styles.hero__content}>
            <p className="subtitle">{tagline}</p>
            <h1 className="h1">
              <FormatText text={title} />
            </h1>
            <div className={styles.hero__content__cta}>{children}</div>
          </div>
          <HeroBg fixed={bgFixed} />
        </div>
      </Container>
    </section>
  );
};

export default Hero;
