'use client';
import React from 'react';
import Modal, { ModalCTA, ModalRef } from '../Modal/Modal';
import Button from '../Button';

type Props = {
  onClose?: () => void;
};

const ContactModal = React.forwardRef<ModalRef, Props>(({ onClose }, ref) => {
  return (
    <Modal title="Contact Us" onClose={onClose} ref={ref}>
      ContactModal
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
        placeat repellendus nostrum quo pariatur velit dolorem numquam expedita,
        fugiat ullam delectus ab animi. Pariatur dolores libero ipsum quasi
        sapiente illo.
      </p>
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

ContactModal.displayName = 'ContactModal';
export default ContactModal;
