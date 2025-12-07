'use client';
import React, { RefObject, useRef } from 'react';
import Button from '@/UI/components/Button';
import Modal from '@/UI/components/Modal';
import { ModalCTA, ModalRef } from '@/UI/components/Modal/Modal';
import { createRow } from '@/utils/supabase/client';
import { uploadImage } from '@/utils/supabase/storage';
import ProductCategoryForm, { ProductCategoryFormHandle } from './ProductCategoryForm';

type Props = {
  onClose?: () => void;
  disabled?: boolean;
  onRefresh?: () => void;
};

const ProductCategoryCreateModal = React.forwardRef<ModalRef, Props>(
  ({ onClose, onRefresh }, ref) => {
    const formHandle = useRef<ProductCategoryFormHandle | null>(null);

    const onSave = async () => {
      if (!formHandle.current) return;
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

        const { index, ...cleanFormData } = formData as any;

        await createRow('product_categories', {
          ...cleanFormData,
          image: imagePath,
        });

        const controller = (ref as RefObject<ModalRef> | null)?.current;
        if (controller) controller.hide();
        if (onClose) onClose();
        
        if (onRefresh) onRefresh();
      } catch (error) {
        console.error('Error creating product category:', error);
        alert('Failed to create product category. Please check console for details.');
      }
    };

    return (
      <Modal title="Create Product Category" onClose={onClose} ref={ref}>
        <ProductCategoryForm ref={formHandle} data={null} />
        <ModalCTA>
          <Button
            size="sm"
            icon="crossSVG"
            style="secondary"
            text="Close"
            onClick={() => {
              const controller = (ref as RefObject<ModalRef> | null)?.current;
              if (controller) controller.hide();
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

ProductCategoryCreateModal.displayName = 'ProductCategoryCreateModal';
export default ProductCategoryCreateModal;
