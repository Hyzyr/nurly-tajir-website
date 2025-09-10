'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import styles from './styles.module.scss';
import ProductsCta from './ProductsCta';
import { fetchAll } from '@/utils/supabase/client';
import { dbHelper } from '@/utils/supabase/helper';
import { useLocale } from 'next-intl';

export type Brand = { link: string; name: string };
export type ProductInfo = {
  id: string;
  brands?: Brand[];
  title: string;
  image: string;
};

const ProductsGrid = () => {
  const [data, setData] = useState<ProductInfo[] | null>(null);
  const locale = useLocale();

  useEffect(() => {
    fetchAll('product_categories').then((data) => {
      if (!data) return;
      const newData: ProductInfo[] = data.map((product) => ({
        title: product[dbHelper.getName(locale)],
        brands:
          typeof product.brands === 'string'
            ? (JSON.parse(product.brands) as Brand[])
            : (product.brands as Brand[]),
        id: product.id,
        image: product.image,
      }));
      setData(newData);
    });
  }, [locale]);

  if (!data) return 'loading';
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
