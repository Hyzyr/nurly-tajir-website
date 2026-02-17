'use client';
import React from 'react';
import Button from '@/UI/components/Button';

import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';
import { useContactModal } from '@/UI/components/ContactModal';

const HeroCta = () => {
  const t = useTranslations('home.hero');
  const contactModal = useContactModal();
  const contactUs = () => contactModal.openModal();

  return (
    <div className={styles.hero__content__cta}>
      <Button text={t('cta')} size="lg" onClick={contactUs} />
    </div>
  );
};

export default HeroCta;
