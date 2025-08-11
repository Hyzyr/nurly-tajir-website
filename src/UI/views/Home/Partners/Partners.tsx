import Container, { ContainerInner } from '@/UI/containers';
import styles from './styles.module.scss';

import data from './data.json';
import PartnersSlider, { PartnersSliderItem } from './PartnersSlider';
import { useTranslations } from 'next-intl';

const Partners = () => {
  const t = useTranslations('home.partners');

  return (
    <section className={styles.partners} id='partners'>
      <Container>
        <div className={styles.partners__inner}>
          <ContainerInner className={styles.partners__header}>
            <h5 className="h5">{t('title')}</h5>
            <p className="_lg">{t('description')}</p>
          </ContainerInner>
          <div className={styles.partners__body}>
            <PartnersSlider>
              {[...data, ...data].map((img, index) => (
                <PartnersSliderItem key={index}>
                  <img
                    src={`/images/website/partners/${img}`}
                    key={index}
                    alt={`partner-${index}`}
                  />
                </PartnersSliderItem>
              ))}
            </PartnersSlider>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Partners;
