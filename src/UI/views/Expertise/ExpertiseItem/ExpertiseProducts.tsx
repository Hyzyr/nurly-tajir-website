import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

type Props = {
  products: {
    id: string;
    image: string;
  }[];
};

const ExpertiseProducts = ({ products }: Props) => {
  return (
    <div className={styles.expertise__products}>
      {products.map((product) => (
        <div key={product.id} className={styles.expertise__products__item}>
          <Image
            src={product.image}
            alt="Product"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
    </div>
  );
};

export default ExpertiseProducts;
