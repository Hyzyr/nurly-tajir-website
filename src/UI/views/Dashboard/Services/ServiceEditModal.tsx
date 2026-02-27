'use client';
import React, { RefObject, useRef, useState } from 'react';
import { ServiceUpdate } from '@/types/supabase';
import Button from '@/UI/components/Button';
import Modal from '@/UI/components/Modal';
import { ModalCTA, ModalRef } from '@/UI/components/Modal/Modal';
import { updateById, deleteById } from '@/utils/supabase/client';
import { uploadImage } from '@/utils/supabase/storage';
import formStyles from '@/UI/components/form/styles.module.scss';
import ServiceForm, { ServiceFormHandle } from './ServiceForm';

type Props = {
  data: ServiceUpdate | null;
  onClose?: () => void;
  disabled?: boolean;
  onRefresh?: () => void;
};

type SaveStatus = 'idle' | 'validating' | 'uploading-main' | 'saving' | 'done' | 'error';

const STATUS_LABELS: Record<SaveStatus, string> = {
  idle: '',
  validating: 'Validating…',
  'uploading-main': 'Uploading images…',
  saving: 'Saving to database…',
  done: 'Saved!',
  error: 'Error – see console for details',
};

const ServiceEditModal = React.forwardRef<ModalRef, Props>(({ data, onClose, onRefresh }, ref) => {
  const formHandle = useRef<ServiceFormHandle | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const isBusy = saveStatus !== 'idle' && saveStatus !== 'done' && saveStatus !== 'error';

  const overallPercent = (() => {
    if (saveStatus === 'uploading-main') return 30;
    if (saveStatus === 'saving') return 75;
    if (saveStatus === 'done') return 100;
    return 0;
  })();

  const onSave = async () => {
    if (!formHandle.current || !data?.id || isBusy) return;

    setSaveStatus('validating');
    const { valid } = formHandle.current.validate();
    if (!valid) { setSaveStatus('idle'); return; }

    try {
      const { formData, imageFile, iconFile } = formHandle.current.getData();

      setSaveStatus('uploading-main');
      let imagePath = formData.image;
      let iconPath = formData.image_icon;

      if (imageFile) {
        const ts = Date.now();
        const url = await uploadImage('services', `image-${ts}-${imageFile.name}`, imageFile);
        if (!url) throw new Error('Failed to upload service image');
        imagePath = url;
      }

      if (iconFile) {
        const ts = Date.now();
        const url = await uploadImage('services', `icon-${ts}-${iconFile.name}`, iconFile);
        if (!url) throw new Error('Failed to upload icon');
        iconPath = url;
      }

      setSaveStatus('saving');
      await updateById('services', data.id, { ...formData, image: imagePath, image_icon: iconPath });

      setSaveStatus('done');
      const controller = (ref as RefObject<ModalRef> | null)?.current;
      if (controller) controller.hide();
      if (onClose) onClose();
      if (onRefresh) onRefresh();
      setTimeout(() => setSaveStatus('idle'), 600);
    } catch (error) {
      console.error('Error updating service:', error);
      setSaveStatus('error');
    }
  };

  const onDelete = async () => {
    if (!data?.id) return;
    const confirmed = window.confirm('Are you sure you want to delete this service?');
    if (!confirmed) return;
    try {
      await deleteById('services', data.id);
      const controller = (ref as RefObject<ModalRef> | null)?.current;
      if (controller) controller.hide();
      if (onClose) onClose();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <Modal title="Edit Service" onClose={onClose} ref={ref}>
      <ServiceForm ref={formHandle} data={data} />

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
          <p className={formStyles.saveProgress__label}>{STATUS_LABELS[saveStatus]}</p>
        </div>
      )}

      <ModalCTA>
        <Button
          size="sm"
          icon="trashSVG"
          style="secondary"
          state="danger"
          text="Delete"
          disabled={isBusy}
          inlineCSS={{ marginRight: 'auto' }}
          onClick={() => onDelete()}
        />
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

ServiceEditModal.displayName = 'ServiceEditModal';
export default ServiceEditModal;
