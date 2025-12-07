'use client';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { productsCategoryConfig } from './constants';
import { ProductCategoryInsert, ProductCategoryUpdate } from '@/types/supabase';
import { DynamicForm, DynamicFormHandle } from '@/UI/components/form/DynamicForm';
import ImageInput, { ImageInputRef } from '@/UI/components/form/ImageInput';

type Props = {
  data: ProductCategoryUpdate | null;
};

export interface ProductCategoryFormHandle {
  getData: () => {
    formData: ProductCategoryInsert;
    imageFile: File | null;
  };
}

const ProductCategoryForm = forwardRef<ProductCategoryFormHandle, Props>(({ data }, ref) => {
  const formRef = useRef<DynamicFormHandle<ProductCategoryInsert>>(null);
  const imageRef = useRef<ImageInputRef>(null);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      formData: formRef.current?.getData() ?? ({} as ProductCategoryInsert),
      imageFile: imageRef.current?.selectedFile() ?? null,
    }),
  }));

  const generateImageURL = (src: string) => {
    return src.startsWith('http') ? src : `/images/website/products/${src}`;
  };

  return (
    <>
      <DynamicForm
        config={productsCategoryConfig}
        value={data ?? ({} as ProductCategoryInsert)}
        ref={formRef}
      />
      <div>
        <label>Image</label>
        <ImageInput
          ref={imageRef}
          ratioPercent={1}
          url={data?.image ? generateImageURL(data.image) : null}
        />
      </div>
    </>
  );
});

ProductCategoryForm.displayName = 'ProductCategoryForm';
export default ProductCategoryForm;
