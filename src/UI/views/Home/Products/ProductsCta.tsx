'use client';
import React from 'react';
import Icon from '@/UI/components/Icon';
import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';
import { useContactModal } from '@/UI/components/ContactModal';

const ProductsCta = () => {
  const tCommon = useTranslations('common');
  const contactModal = useContactModal();
  const contactUs = () => contactModal.openModal();

  return (
    <div className={styles.products__grid__button} onClick={contactUs}>
      <strong className="h5">{tCommon('explore_store')}</strong>
      <Icon name="arrowCorner" />
    </div>
  );
};

export default ProductsCta;
