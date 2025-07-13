import styles from './styles.module.scss';

import React from 'react';

type Props = {
  image: string;
  title: string;
  brands: string[];
};

const ProductCard = ({ image, title, brands }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <img src={`/images/website/products/${image}`} alt={title} />
      </div>
      <div className={styles.card__title}>
        <strong className="subtitle _lg">{title}</strong>
      </div>
      <div className={styles.card__brands}>
        {brands.map((brand, index) => (
          <span key={index}>{brand}</span>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
