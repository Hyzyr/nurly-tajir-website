'use client';
import React, { useRef } from 'react';
import Modal, { ModalCTA, ModalRef } from '../Modal/Modal';
import Button from '../Button';
import Icon, { IconNames } from '../Icon';
import { useTranslations } from 'next-intl';
import ContactForm from '@/UI/views/Home/Contact/ContactForm';

type Props = {
  onClose?: () => void;
};

const ContactModal = React.forwardRef<ModalRef, Props>(({ onClose }, ref) => {
  const t = useTranslations('common');
  const formRef = useRef<HTMLFormElement>(null);
  const submit = () => {
    if (formRef.current) {
      const isValid = formRef.current?.checkValidity();
      if (!isValid) {
        formRef.current?.reportValidity(); // shows the browser's native error tooltips
        return;
      }
      const event = new Event('submit', { bubbles: true, cancelable: true });
      formRef.current.dispatchEvent(event);
    }
  };

  return (
    <Modal title="Contact Us" onClose={onClose} ref={ref}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
        placeat repellendus nostrum quo pariatur velit dolorem numquam expedita,
        fugiat ullam delectus ab animi. Pariatur dolores libero ipsum quasi
        sapiente illo.
      </p>
      <ContactForm ref={formRef} customSubmit />
      <ModalCTA>
        <div className="fbox fbox-gap-2 fbox-center" style={{ flexGrow: 1 }}>
          <Link
            href={`tel:${t('address.phone')}`}
            iconName="phoneIcon"
            label={t('address.phone')}
          />
          <Link
            href={`mailto:${t('address.email')}`}
            iconName="emailIcon"
            label={t('address.email')}
          />
        </div>
        <Button
          size="sm"
          icon="crossSVG"
          style="secondary"
          text="Close"
          onClick={() => {
            const controler = (ref as React.RefObject<ModalRef> | null)
              ?.current;
            if (controler) controler.hide();
          }}
        />
        <Button
          size="sm"
          icon="sendSVG"
          text="Send"
          onClick={submit}
          inlineCSS={{ minWidth: '110px', justifyContent: 'flex-start' }}
        />
      </ModalCTA>
    </Modal>
  );
});

type LinkProps = {
  href: string;
  iconName: IconNames;
  label: string;
};

const Link = ({ href, label, iconName }: LinkProps) => {
  return (
    <a href={href} className={'fbox fbox-center fbox-gap-2'}>
      <Icon name={iconName} />
      <span>{label}</span>
    </a>
  );
};

ContactModal.displayName = 'ContactModal';
export default ContactModal;
