'use client';
import Button from '@/UI/components/Button';
import styles from './styles.module.scss';

import React from 'react';
import Icon from '@/UI/components/Icon';
import { useContactModal } from '@/UI/components/ContactModal';

type Props = {
  image: string;
  title: string;
  description: string;
  className?: string;
  onBackClick?: () => void;
};

const ServiceInfoCard = ({
  image,
  title,
  description,
  className,
  onBackClick,
}: Props) => {
  const contactModal = useContactModal();
  const contactUs = () => contactModal.openModal();

  return (
    <div className={`${styles.info} ${className ?? ''}`}>
      <div className="bg">
        <img src="/images/brand-shape-outlined.svg" alt="brand-shape" />
      </div>
      <div className={styles.info__image}>
        <img src={`/images/website/services/${image}`} alt="icon-image" />
      </div>
      <div className={styles.info__title}>
        <button onClick={onBackClick}>
          <Icon name="arrowDownSVG" />
          Back
        </button>
        <strong className="h4 _sm">{title}</strong>
      </div>
      <div className={styles.info__desc}>
        <p>{description}</p>
        <Button text="contact us" style="outlined" onClick={contactUs} />
      </div>
    </div>
  );
};

export default ServiceInfoCard;
