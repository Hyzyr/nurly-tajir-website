import React from 'react';
import styles from './skeleton.module.scss';

const ExpertiseItemSkeleton = () => {
  return (
    <div className={styles['expertise-item-skeleton']}>
      {/* Header */}
      <div className={styles['expertise-item-skeleton__header']}>
        <div className={styles['expertise-item-skeleton__header__title']} />
        <div className={styles['expertise-item-skeleton__header__desc']}>
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* Hero image */}
      <div className={styles['expertise-item-skeleton__hero']} />

      {/* Products row */}
      <div className={styles['expertise-item-skeleton__products']}>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Footer */}
      <div className={styles['expertise-item-skeleton__footer']}>
        <div className={styles['expertise-item-skeleton__footer__text']}>
          <span />
          <span />
        </div>
        <div className={styles['expertise-item-skeleton__footer__btn']} />
      </div>
    </div>
  );
};

export const ExpertiseListSkeleton = () => {
  return (
    <>
      <ExpertiseItemSkeleton />
      <ExpertiseItemSkeleton />
      <ExpertiseItemSkeleton />
    </>
  );
};

export default ExpertiseItemSkeleton;
