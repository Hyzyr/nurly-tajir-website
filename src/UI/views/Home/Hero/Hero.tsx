import styles from './styles.module.scss';

import Container from '@/UI/containers';
import HeroBg from './HeroBg';
import { useTranslations } from 'next-intl';
import { FormatText } from '@/UI/components/FormatText';
import HeroCta from './HeroCta';

const Hero = () => {
  const t = useTranslations('home.hero');

  return (
    <section className={styles.hero} id="hero">
      <Container>
        <div className={styles.hero__body}>
          <div className={styles.hero__content}>
            <h6 className="subtitle">{t('tagline')}</h6>
            <h1 className="h1">
              <FormatText text={t('title')} />
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
