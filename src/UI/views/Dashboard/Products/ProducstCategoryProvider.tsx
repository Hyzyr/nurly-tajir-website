'use client';
import React, { useEffect, useState } from 'react';
import ProductCategoryTable from './ProductCategoryTable';
import { fetchAll } from '@/utils/supabase/client';
import { ProductCategory } from '@/types/supabase';

type ProductCategoryWithID = ProductCategory & { index: number };

const ProducstCategoryProvider = () => {
  const [data, setData] = useState<ProductCategoryWithID[] | null>(null);

  useEffect(() => {
    fetchAll('product_categories').then((data) => {
      const dataWithIndex = data.map((item, index) => ({
        ...item,
        index: index + 1,
      }));

      setData(dataWithIndex as ProductCategoryWithID[]);
    });
  }, []);

  return <ProductCategoryTable data={data} />;
};

export default ProducstCategoryProvider;
