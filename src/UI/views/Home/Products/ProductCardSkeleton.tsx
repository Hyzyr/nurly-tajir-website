import React from 'react';
import styles from './styles.module.scss';

const ProductCardSkeleton = () => {
  return (
    <div className={`${styles.card} ${styles.card__skeleton}`}>
      <div className={styles.skeleton__title} />
      <div className={styles.skeleton__brands}>
        <div className={styles.skeleton__brand} />
        <div className={styles.skeleton__brand} />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;