'use client';
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import ContactModal from './ContactModal';
import { ModalRef } from '../Modal/Modal';

// Define context shape
type ContactModalContextType = {
  isOpen: () => boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const ContactModalContext = createContext<
  ContactModalContextType | undefined
>(undefined);

const ContactModalProvider = ({ children }: PropsWithChildren) => {
  const ref = useRef<ModalRef | null>(null);
  const [isInit, setIsInit] = useState(false);

  const context = {
    openModal: () => {
      if (ref.current) ref.current.show();
    },
    closeModal: () => {
      if (ref.current) ref.current.hide();
    },
    isOpen: () => {
      if (ref.current) return ref.current.isVisible();
      return false;
    },
  };

  useEffect(() => {
    if (!isInit && !!document && document.getElementById('main'))
      setIsInit(true);
  }, []);

  return (
    <ContactModalContext.Provider value={context}>
      {isInit && <ContactModal onClose={context.closeModal} ref={ref} />}
      {children}
    </ContactModalContext.Provider>
  );
};

export default ContactModalProvider;
