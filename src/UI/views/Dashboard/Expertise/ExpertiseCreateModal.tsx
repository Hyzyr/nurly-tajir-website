'use client';
import React, { RefObject, useRef, useState } from 'react';
import Button from '@/UI/components/Button';
import Modal from '@/UI/components/Modal';
import { ModalCTA, ModalRef } from '@/UI/components/Modal/Modal';
import { createRow } from '@/utils/supabase/client';
import { uploadImage, uploadImages } from '@/utils/supabase/storage';
import { UploadProgressItem } from '@/UI/components/form/MultiImageUploader';
import formStyles from '@/UI/components/form/styles.module.scss';
import ExpertiseForm, { ExpertiseFormHandle } from './ExpertiseForm';

type Props = {
  onClose?: () => void;
  disabled?: boolean;
  onRefresh?: () => void;
};

type SaveStatus = 'idle' | 'validating' | 'uploading-main' | 'uploading-products' | 'saving' | 'done' | 'error';

const STATUS_LABELS: Record<SaveStatus, string> = {
  idle: '',
  validating: 'Validating…',
  'uploading-main': 'Uploading images…',
  'uploading-products': 'Uploading product images…',
  saving: 'Saving to database…',
  done: 'Saved!',
  error: 'Error – see console for details',
};

const ExpertiseCreateModal = React.forwardRef<ModalRef, Props>(({ onClose, onRefresh }, ref) => {
  const formHandle = useRef<ExpertiseFormHandle | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [productProgress, setProductProgress] = useState<UploadProgressItem[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [doneProducts, setDoneProducts] = useState(0);

  const isBusy = saveStatus !== 'idle' && saveStatus !== 'done' && saveStatus !== 'error';

  const overallPercent = (() => {
    if (saveStatus === 'uploading-products' && totalProducts > 0) {
      const done = productProgress.filter((p) => p.progress === 100 || p.progress === -1).length;
      return Math.round((done / totalProducts) * 70 + 10);
    }
    if (saveStatus === 'uploading-main') return 10;
    if (saveStatus === 'saving') return 85;
    if (saveStatus === 'done') return 100;
    return 0;
  })();

  const onSave = async () => {
    if (!formHandle.current || isBusy) return;

    setSaveStatus('validating');
    const { valid } = formHandle.current.validate();
    if (!valid) { setSaveStatus('idle'); return; }

    try {
      const { formData, imageFile, productImageFiles } = formHandle.current.getData();

      setSaveStatus('uploading-main');
      let imagePath = formData.image;

      if (imageFile) {
        const ts = Date.now();
        const url = await uploadImage('expertise', `image-${ts}-${imageFile.name}`, imageFile);
        if (!url) throw new Error('Failed to upload image');
        imagePath = url;
      }

      let productImageUrls: string[] = [];
      if (productImageFiles.length > 0) {
        setSaveStatus('uploading-products');
        setTotalProducts(productImageFiles.length);
        setDoneProducts(0);
        setProductProgress(productImageFiles.map((f) => ({ name: f.name, progress: 0 })));
        productImageUrls = await uploadImages('expertise', productImageFiles, (items) => {
          setProductProgress(items);
          setDoneProducts(items.filter((p) => p.progress === 100 || p.progress === -1).length);
        });
      }

      setSaveStatus('saving');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { index: _index, ...cleanFormData } = formData as Record<string, unknown>;

      await createRow('expertise', {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(cleanFormData as any),
        image: imagePath,
        ...(productImageUrls.length > 0 ? { images: productImageUrls } : {}),
      });

      setSaveStatus('done');
      formHandle.current.clearProductImages();

      const controller = (ref as RefObject<ModalRef> | null)?.current;
      if (controller) controller.hide();
      if (onClose) onClose();
      if (onRefresh) onRefresh();
      setTimeout(() => { setSaveStatus('idle'); setProductProgress([]); }, 600);
    } catch (error) {
      console.error('Error creating expertise item:', error);
      setSaveStatus('error');
    }
  };

  return (
    <Modal title="Create Expertise Item" onClose={onClose} ref={ref}>
      <ExpertiseForm ref={formHandle} data={null} uploadProgress={productProgress} />

      {saveStatus !== 'idle' && (
        <div className={formStyles.saveProgress}>
          <div className={formStyles.saveProgress__track}>
            <div
              className={[
                formStyles.saveProgress__fill,
                saveStatus === 'done' ? formStyles.done : '',
              ].filter(Boolean).join(' ')}
              style={{ width: `${overallPercent}%` }}
            />
          </div>
          <p className={formStyles.saveProgress__label}>
            {STATUS_LABELS[saveStatus]}
            {saveStatus === 'uploading-products' && totalProducts > 0 && (
              <> — {doneProducts}/{totalProducts} images</>
            )}
          </p>
        </div>
      )}

      <ModalCTA>
        <Button
          size="sm"
          icon="crossSVG"
          style="secondary"
          text="Close"
          disabled={isBusy}
          onClick={() => {
            const controller = (ref as RefObject<ModalRef> | null)?.current;
            if (controller) controller.hide();
          }}
        />
        <Button
          size="sm"
          icon="tickSVG"
          text={isBusy ? 'Saving…' : 'Save'}
          disabled={isBusy}
          inlineCSS={{ minWidth: '110px', justifyContent: 'flex-start' }}
          onClick={onSave}
        />
      </ModalCTA>
    </Modal>
  );
});

ExpertiseCreateModal.displayName = 'ExpertiseCreateModal';
export default ExpertiseCreateModal;
