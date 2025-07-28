import styles from './styles.module.scss';

import Container from '@/UI/containers';
import Button from '@/UI/components/Button';
import HeroBg from './HeroBg';
import { useTranslations } from 'next-intl';
import { FormatText } from '@/UI/components/FormatText';

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
            <div className={styles.hero__content__cta}>
              <Button text={t('cta')} size="lg" />
            </div>
          </div>
          <HeroBg />
        </div>
      </Container>
    </section>
  );
};

export default Hero;
