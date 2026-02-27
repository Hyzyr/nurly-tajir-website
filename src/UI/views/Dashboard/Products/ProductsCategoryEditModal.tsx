'use client';
import React, { RefObject, useRef, useState } from 'react';
import { ProductCategoryUpdate } from '@/types/supabase';
import Button from '@/UI/components/Button';
import Modal from '@/UI/components/Modal';
import { ModalCTA, ModalRef } from '@/UI/components/Modal/Modal';
import { updateById, deleteById } from '@/utils/supabase/client';
import { uploadImage } from '@/utils/supabase/storage';
import ProductCategoryForm, { ProductCategoryFormHandle } from './ProductCategoryForm';
import formStyles from '@/UI/components/form/styles.module.scss';

type SaveStatus = 'idle' | 'validating' | 'uploading-image' | 'saving' | 'done' | 'error';

type Props = {
  data: ProductCategoryUpdate | null;
  onClose?: () => void;
  disabled?: boolean;
  onRefresh?: () => void;
};

const LABELS: Record<SaveStatus, string> = {
  idle: 'Save',
  validating: 'Validating…',
  'uploading-image': 'Uploading image…',
  saving: 'Saving…',
  done: 'Saved!',
  error: 'Error – retry',
};

const ProductsCategoryEditModal = React.forwardRef<ModalRef, Props>(
  ({ data, onClose, onRefresh }, ref) => {
    const formHandle = useRef<ProductCategoryFormHandle | null>(null);
    const [status, setStatus] = useState<SaveStatus>('idle');
    const busy = !['idle', 'done', 'error'].includes(status);

    const onSave = async () => {
      if (!formHandle.current || !data?.id || busy) return;

      /* 1 ── validate */
      setStatus('validating');
      const { valid } = formHandle.current.validate();
      if (!valid) { setStatus('idle'); return; }

      const { formData, imageFile } = formHandle.current.getData();

      try {
        /* 2 ── upload image */
        let imagePath = formData.image;
        if (imageFile) {
          setStatus('uploading-image');
          const ts = Date.now();
          const url = await uploadImage('products', `image-${ts}-${imageFile.name}`, imageFile);
          if (!url) { setStatus('error'); return; }
          imagePath = url;
        }

        /* 3 ── save to DB */
        setStatus('saving');
        await updateById('product_categories', data.id, { ...formData, image: imagePath });

        setStatus('done');
        setTimeout(() => {
          const controller = (ref as RefObject<ModalRef> | null)?.current;
          controller?.hide();
          onClose?.();
          onRefresh?.();
        }, 600);
      } catch (error) {
        console.error('Error updating product category:', error);
        setStatus('error');
      }
    };

    const onDelete = async () => {
      if (!data?.id || busy) return;
      if (!window.confirm('Are you sure you want to delete this product category?')) return;
      try {
        await deleteById('product_categories', data.id);
        const controller = (ref as RefObject<ModalRef> | null)?.current;
        controller?.hide();
        onClose?.();
        onRefresh?.();
      } catch (error) {
        console.error('Error deleting product category:', error);
      }
    };

    return (
      <Modal title="Edit Product Category" onClose={onClose} ref={ref}>
        <ProductCategoryForm ref={formHandle} data={data} />

        {status !== 'idle' && status !== 'done' && status !== 'error' && (
          <div className={formStyles.saveProgress}>
            <div className={formStyles.saveProgressBar} style={{ width: status === 'validating' ? '20%' : status === 'uploading-image' ? '55%' : '85%' }} />
            <span>{LABELS[status]}</span>
          </div>
        )}

        <ModalCTA>
          <Button size="sm" icon="trashSVG" style="secondary" state="danger" text="Delete"
            inlineCSS={{ marginRight: 'auto' }} disabled={busy} onClick={onDelete} />
          <Button size="sm" icon="crossSVG" style="secondary" text="Close" disabled={busy}
            onClick={() => { const c = (ref as RefObject<ModalRef> | null)?.current; c?.hide(); }} />
          <Button size="sm" icon="tickSVG" text={LABELS[status]} disabled={busy}
            inlineCSS={{ minWidth: '110px', justifyContent: 'flex-start' }} onClick={onSave} />
        </ModalCTA>
      </Modal>
    );
  }
);

ProductsCategoryEditModal.displayName = 'ProductsCategoryEditModal';
export default ProductsCategoryEditModal;
