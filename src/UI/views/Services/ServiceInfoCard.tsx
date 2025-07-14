'use client';
import Button from '@/UI/components/Button';
import styles from './styles.module.scss';

import React from 'react';
import Icon from '@/UI/components/Icon';

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
        <Button text="contact us" style="outlined" />
      </div>
    </div>
  );
};

export default ServiceInfoCard;
