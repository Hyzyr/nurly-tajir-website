import styles from './styles.module.scss';

import Container, { ContainerInner } from '@/UI/containers';

import { useTranslations } from 'next-intl';
import ContactForm from './ContactForm';

const Contact = () => {
  const t = useTranslations('contact');

  return (
    <section className={styles.contact} id="contacts">
      <Container>
        <ContainerInner className={styles.contact__inner}>
          <div className={`${styles.contact__bg} bg`}>
            <img
              src="/images/website/banner-contacts.webp"
              alt="banner-contacts.webp"
            />
          </div>
          <div className={styles.form}>
            <h5 className="h5">{t('title')}</h5>
            <ContactForm />
          </div>
        </ContainerInner>
      </Container>
    </section>
  );
};

export default Contact;
