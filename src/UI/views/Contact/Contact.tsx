import styles from './styles.module.scss';

import Container, { ContainerInner } from '@/UI/containers';
import { LabeledInput } from '@/UI/components/form/Input';
import { LabeledTextarea } from '@/UI/components/form/TextArea';
import Button from '@/UI/components/Button';

type Props = {};

const Contact = (props: Props) => {
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
            <h5 className="h5">Contact Us</h5>
            <LabeledInput label="Full Name" placeholder="e.g. John Doe" />
            <LabeledInput
              label="Email Adress"
              placeholder="e.g. john@example.com"
            />
            <LabeledTextarea
              label="Message"
              placeholder="Write something..."
              rows={6}
            />
            <div className="fbox">
              <Button text="Contact Us" />
            </div>
          </div>
        </ContainerInner>
      </Container>
    </section>
  );
};

export default Contact;
