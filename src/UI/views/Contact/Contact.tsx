import styles from './styles.module.scss';

import Container, { ContainerInner } from '@/UI/containers';
import { LabeledInput } from '@/UI/components/form/Input';
import { LabeledTextarea } from '@/UI/components/form/TextArea';
import Button from '@/UI/components/Button';
import { useTranslations } from 'next-intl';

const Contact = () => {
  const t = useTranslations('contact');

  return (
    <section className={styles.contact}>
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
            <LabeledInput
              label={t('fields.full_name')}
              placeholder={t('fields.full_name_placeholder')}
            />
            <LabeledInput
              label={t('fields.email')}
              placeholder={t('fields.email_placeholder')}
            />
            <LabeledTextarea
              label={t('fields.message')}
              placeholder={t('fields.message_placeholder')}
              rows={6}
            />
            <div className="fbox">
              <Button text={t('submit')} />
            </div>
          </div>
        </ContainerInner>
      </Container>
    </section>
  );
};

export default Contact;
