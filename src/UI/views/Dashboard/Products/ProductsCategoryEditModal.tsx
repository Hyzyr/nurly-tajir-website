'use client';
import React, { RefObject, useRef } from 'react';
import { ProductCategoryUpdate } from '@/types/supabase';
import Button from '@/UI/components/Button';
import Modal from '@/UI/components/Modal';
import { ModalCTA, ModalRef } from '@/UI/components/Modal/Modal';
import { updateById, deleteById } from '@/utils/supabase/client';
import { uploadImage } from '@/utils/supabase/storage';
import ProductCategoryForm, { ProductCategoryFormHandle } from './ProductCategoryForm';

type Props = {
  data: ProductCategoryUpdate | null;
  onClose?: () => void;
  disabled?: boolean;
  onRefresh?: () => void;
};

const ProductsCategoryEditModal = React.forwardRef<ModalRef, Props>(
  ({ data, onClose, onRefresh }, ref) => {
    const formHandle = useRef<ProductCategoryFormHandle | null>(null);

    const onSave = async () => {
      if (!formHandle.current || !data?.id) return;
      const { formData, imageFile } = formHandle.current.getData();

      try {
        let imagePath = formData.image;

        if (imageFile) {
          const timestamp = Date.now();
          const imageUrl = await uploadImage(
            'products',
            `image-${timestamp}-${imageFile.name}`,
            imageFile
          );
          if (!imageUrl) {
            alert('Failed to upload image. Please try again.');
            return;
          }
          imagePath = imageUrl;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { index: _index, ...cleanFormData } = formData as Record<string, unknown>;

        await updateById('product_categories', data.id, {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(cleanFormData as any),
          image: imagePath,
        });

        const controller = (ref as RefObject<ModalRef> | null)?.current;
        if (controller) controller.hide();
        if (onClose) onClose();
        
        if (onRefresh) onRefresh();
      } catch (error) {
        console.error('Error updating product category:', error);
        alert('Failed to update product category. Please check console for details.');
      }
    };

    const onDelete = async () => {
      if (!data?.id) return;
      
      const confirmed = window.confirm('Are you sure you want to delete this product category?');
      if (!confirmed) return;

      try {
        await deleteById('product_categories', data.id);
        const controller = (ref as RefObject<ModalRef> | null)?.current;
        if (controller) controller.hide();
        if (onClose) onClose();
        
        if (onRefresh) onRefresh();
      } catch (error) {
        console.error('Error deleting product category:', error);
      }
    };

    return (
      <Modal title="Edit Product Category" onClose={onClose} ref={ref}>
        <ProductCategoryForm ref={formHandle} data={data} />
        <ModalCTA>
          <Button
            size="sm"
            icon="trashSVG"
            style="secondary"
            state="danger"
            text="Delete"
            inlineCSS={{ marginRight: 'auto' }}
            onClick={() => onDelete()}
          />
          <Button
            size="sm"
            icon="crossSVG"
            style="secondary"
            text="Close"
            onClick={() => {
              const controler = (ref as RefObject<ModalRef> | null)?.current;
              if (controler) controler.hide();
            }}
          />
          <Button
            size="sm"
            icon="tickSVG"
            text="Save"
            inlineCSS={{ minWidth: '110px', justifyContent: 'flex-start' }}
            onClick={() => onSave()}
          />
        </ModalCTA>
      </Modal>
    );
  }
);

ProductsCategoryEditModal.displayName = 'ProductsCategoryEditModal';
export default ProductsCategoryEditModal;
