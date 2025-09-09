'use client';
import React from 'react';
import Modal, { ModalCTA, ModalRef } from '../Modal/Modal';
import Button from '../Button';
import Icon, { IconNames } from '../Icon';
import { useTranslations } from 'next-intl';

type Props = {
  onClose?: () => void;
};

const ContactModal = React.forwardRef<ModalRef, Props>(({ onClose }, ref) => {
  const t = useTranslations('common');

  return (
    <Modal title="Contact Us" onClose={onClose} ref={ref}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
        placeat repellendus nostrum quo pariatur velit dolorem numquam expedita,
        fugiat ullam delectus ab animi. Pariatur dolores libero ipsum quasi
        sapiente illo.
      </p>
      <div className="fbox fbox-gap-2 fbox-center">
        <Link
          href={`tel:${t('address.email')}`}
          iconName="phoneIcon"
          label={t('address.email')}
        />
        <Link
          href={`mailto:${t('address.phone')}`}
          iconName="emailIcon"
          label={t('address.phone')}
        />
      </div>
      <ModalCTA>
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
          icon="tickSVG"
          text="Save"
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
