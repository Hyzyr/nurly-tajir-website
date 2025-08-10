import { DynamicForm } from '@/UI/components/form/DynamicForm';
import { LabeledImageInput } from '@/UI/components/form/ImageInput';
import Modal from '@/UI/components/Modal';
import React from 'react';
import { productsCategoryConfig } from './constants';
import { ProductCategory } from '@/types/supabase';
import { ModalCTA, ModalRef } from '@/UI/components/Modal/Modal';
import Button from '@/UI/components/Button';

type Props = {
  data: ProductCategory | null;
  onClose?: () => void;
};

const ProductsCategoryEditModal = React.forwardRef<ModalRef, Props>(
  ({ data, onClose }, ref) => {
    const generateImageURL = (src: string) => {
      return src.startsWith('http') ? src : `/images/website/products/${src}`;
    };

    return (
      <Modal title="Edit Products Group" onClose={onClose} ref={ref}>
        <LabeledImageInput
          label="Image"
          ratioPercent={1}
          url={data?.image ? generateImageURL(data.image) : null}
        />
        <DynamicForm config={productsCategoryConfig} value={data ?? {}} />
        <ModalCTA>
          <Button
            size="sm"
            icon="trashSVG"
            style="secondary"
            state="danger"
            text="Delete"
            inlineCSS={{ marginRight: 'auto' }}
          />
          <Button
            size="sm"
            icon="crossSVG"
            style="secondary"
            text="Close"
            onClick={() => {
              // @ts-ignore
              if (ref?.current?.hide) ref.current.hide();
            }}
          />
          <Button
            size="sm"
            icon="tickSVG"
            text="Save"
            inlineCSS={{ minWidth: '110px', justifyContent: 'flex-start' }}
          />
        </ModalCTA>
      </Modal>
    );
  }
) as React.FC<Props>;

ProductsCategoryEditModal.displayName = 'ProductsCategoryEditModal';
export default ProductsCategoryEditModal;
