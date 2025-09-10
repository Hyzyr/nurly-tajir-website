import { ProductInfo } from './ProductsGrid';
import styles from './styles.module.scss';

import React from 'react';

const ProductCard = ({ image, title, brands }: Partial<ProductInfo>) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <img src={`/images/website/products/${image}`} alt={title} />
      </div>
      <div className={styles.card__title}>
        <strong className="subtitle _lg">{title}</strong>
      </div>
      {brands && (
        <div className={styles.card__brands}>
          {brands.map((brand, index) => (
            <a href={brand.link} key={index}>
              {brand.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
