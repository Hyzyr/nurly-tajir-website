'use client';
import React, { useRef } from 'react';
import { ProductCategory } from '@/types/supabase';
import { useEffect, useState } from 'react';
import ProductCategoryTable from './ProductCategoryTable';
import { ModalRef } from '@/UI/components/Modal/Modal';
import ProductsCategoryEditModal from './ProductsCategoryEditModal';
import ProductCategoryCreateModal from './ProductCategoryCreateModal';
import { supabase } from '@/utils/supabase/client';

type ProductCategoryWithID = ProductCategory & { index: number };

const ProducstCategoryProvider = () => {
  const [data, setData] = useState<ProductCategoryWithID[] | null>(null);
  const [editModalData, setEditModalData] = useState<ProductCategory | null>(null);
  const editModalRef = useRef<ModalRef | null>(null);
  const addModalRef = useRef<ModalRef | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const onAdd = () => {
    if (addModalRef.current) addModalRef.current.show();
    setEditModalData(null);
  };

  const onEdit = (data: ProductCategory) => {
    if (editModalRef.current) editModalRef.current.show();
    setEditModalData(data);
  };

  const fetchProductCategories = React.useCallback(() => {
    setIsFetching(true);

    supabase
      .from('product_categories')
      .select('*')
      .then(({ data, error }) => {
        if (error) throw error;
        const rows = (data ?? []) as ProductCategory[];
        
        const dataWithIndex: ProductCategoryWithID[] = rows.map((item, i) => ({
          ...item,
          index: i + 1,
        }));
        setIsFetching(false);
        setData(dataWithIndex);
      });
  }, []);

  useEffect(() => {
    fetchProductCategories();
  }, []);

  return (
    <>
      <ProductCategoryTable data={data} onAdd={onAdd} onEdit={onEdit} />
      {data && (
        <ProductsCategoryEditModal
          disabled={isFetching}
          ref={editModalRef}
          data={editModalData ?? null}
          onRefresh={fetchProductCategories}
        />
      )}
      {data && (
        <ProductCategoryCreateModal
          disabled={isFetching}
          ref={addModalRef}
          onRefresh={fetchProductCategories}
        />
      )}
    </>
  );
};

export default ProducstCategoryProvider;
