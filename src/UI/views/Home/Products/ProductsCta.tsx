'use client';
import React from 'react';
import Icon from '@/UI/components/Icon';
import styles from './styles.module.scss';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

const ProductsCta = () => {
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();

  const goToExpertise = () => router.push(`/${locale}/expertise`);

  return (
    <div className={styles.products__grid__button} onClick={goToExpertise}>
      <strong className="h5">{tCommon('explore_expertise')}</strong>
      <Icon name="arrowCorner" />
    </div>
  );
};

export default ProductsCta;
