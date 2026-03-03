import React from 'react';
import ProductCard from './ProductCard';
import styles from './styles.module.scss';
import ProductsCta from './ProductsCta';
import type { ProductInfo } from '@/UI/fetch';

export type { ProductInfo };

type Props = {
  data: ProductInfo[];
};

const ProductsGrid = ({ data }: Props) => {
  return (
    <div className={styles.products__grid}>
      {data.map((category) => (
        <ProductCard
          key={category.id}
          brands={category.brands}
          title={category.title}
          image={category.image}
        />
      ))}
      <ProductsCta />
    </div>
  );
};

export default ProductsGrid;
