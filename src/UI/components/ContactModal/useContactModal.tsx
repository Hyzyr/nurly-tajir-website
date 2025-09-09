'use client';
import { useContext } from 'react';
import { ContactModalContext } from './ContactModalProvider';

const useContactModal = () => {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error('useContactModal must be used within ContactModalProvider');
  }
  return context;
};

export default useContactModal;
