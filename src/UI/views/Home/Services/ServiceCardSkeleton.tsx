import styles from './styles.module.scss';
import React from 'react';

type SkeletonProps = {
  hasImage?: boolean;
};

const ServiceCardSkeleton = ({ hasImage = true }: SkeletonProps) => {
  return (
    <div className={`${styles.card} ${styles.skeleton} ${!hasImage ? styles.card__noimage : ''}`}>
      {hasImage && (
        <div className={styles.skeleton__cardImage} />
      )}
      <div className={styles.card__title}>
        <div className={styles.skeleton__cardTitle} />
      </div>
      <div className={styles.card__btn}>
        <div className={styles.skeleton__cardBtn} />
      </div>
    </div>
  );
};

export const ServiceInfoCardSkeleton = () => {
  return (
    <div className={`${styles.info} ${styles.skeleton}`}>
      <div className="bg">
        <img src="/images/brand-shape-outlined.svg" alt="brand-shape" />
      </div>
      <div className={styles.info__image}>
        <div className={styles.skeleton__infoImage} />
      </div>
      <div className={styles.info__title}>
        <div className={styles.skeleton__infoTitle} />
      </div>
      <div className={styles.info__desc}>
        <div className={styles.skeleton__infoText} />
        <div className={styles.skeleton__infoText} />
        <div className={styles.skeleton__infoText} />
        <div className={styles.skeleton__infoButton} />
      </div>
    </div>
  );
};

export const ServicesGridSkeleton = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.grid__tabs}>
        <ServiceCardSkeleton hasImage={true} />
        <ServiceCardSkeleton hasImage={true} />
        <ServiceCardSkeleton hasImage={true} />
        <ServiceCardSkeleton hasImage={true} />
        <ServiceCardSkeleton hasImage={true} />
        <ServiceCardSkeleton hasImage={true} />
        <ServiceCardSkeleton hasImage={false} />
        <ServiceCardSkeleton hasImage={false} />
      </div>
      <div className={styles.grid__info}>
        <ServiceInfoCardSkeleton />
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;