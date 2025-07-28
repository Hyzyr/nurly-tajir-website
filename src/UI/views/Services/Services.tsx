import styles from './styles.module.scss';

import Container, { ContainerInner } from '@/UI/containers';

import { useTranslations } from 'next-intl';
import ServicesGrid from './ServicesGrid';

const Services = () => {
  const t = useTranslations('home.services');

  const title = t('title').split('\n');

  return (
    <section className={styles.services}>
      <Container>
        <div className={styles.services__inner}>
          <ContainerInner className={styles.services__title}>
            <h3 className="h3">
              {title[0] && title[0]}
              {title[1] && (
                <>
                  <br />
                  <span className="color-gray">{title[1]}</span>
                </>
              )}
            </h3>
          </ContainerInner>
          <ServicesGrid />
        </div>
      </Container>
    </section>
  );
};
export default Services;
