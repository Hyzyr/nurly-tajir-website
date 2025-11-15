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
  const tContact = useTranslations('contact');
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
    <Modal title={tContact('title')} onClose={onClose} ref={ref}>
      <p>{tContact('description')}</p>
      <ContactForm ref={formRef} customSubmit />
      <ModalCTA>
        <div className="fbox fbox-gap-2 fbox-center" style={{ flexGrow: 1 }}>
          <Link
            href={t('address.phone.link')}
            iconName="phoneIcon"
            label={t('address.phone.title')}
          />
          <Link
            href={t('address.email.link')}
            iconName="emailIcon"
            label={t('address.email.title')}
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
