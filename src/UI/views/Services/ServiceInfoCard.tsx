import Button from '@/UI/components/Button';
import styles from './styles.module.scss';

import React from 'react';

type Props = {
  image: string;
  title: string;
  description: string;
  className?: string;
};

const ServiceInfoCard = ({ image, title, description, className }: Props) => {
  return (
    <div className={`${styles.info} ${className ?? ''}`}>
      <div className="bg">
        <img src="/images/brand-shape-outlined.svg" alt="brand-shape" />
      </div>
      <div className={styles.info__image}>
        <img src={`/images/website/services/${image}`} alt="icon-image" />
      </div>
      <strong className="h4 _sm">{title}</strong>
      <div className={styles.info__desc}>
        <p>{description}</p>
        <Button text="contact us" />
      </div>
    </div>
  );
};

export default ServiceInfoCard;
