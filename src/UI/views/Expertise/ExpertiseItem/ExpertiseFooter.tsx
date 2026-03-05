'use client';

import React from 'react';
import styles from './styles.module.scss';
import Button from '@/UI/components/Button';
import { useContactModal } from '@/UI/components/ContactModal';

type Props = {
  text: string;
};

const ExpertiseFooter = ({ text }: Props) => {
  const contactModal = useContactModal();

  return (
    <div className={styles.expertise__footer}>
      <p className={styles.expertise__footer__text}>{text}</p>
      <Button
        text="Contact Us"
        style="outlined"
        size="md"
        icon="arrowCorner"
        iconRight
        onClick={() => contactModal.openModal()}
      />
    </div>
  );
};

export default ExpertiseFooter;
