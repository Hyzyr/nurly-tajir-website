'use client';
import React, { RefObject, useRef } from 'react';
import { ExpertiseUpdate as ServiceSectionUpdate } from '@/types/supabase';
import Button from '@/UI/components/Button';
import Modal from '@/UI/components/Modal';
import { ModalCTA, ModalRef } from '@/UI/components/Modal/Modal';
import { updateById, deleteById } from '@/utils/supabase/client';
import { uploadImage } from '@/utils/supabase/storage';
import ExpertiseForm, { ExpertiseFormHandle } from './ExpertiseForm';

type Props = {
  data: ServiceSectionUpdate | null;
  onClose?: () => void;
  disabled?: boolean;
  onRefresh?: () => void;
};

const ExpertiseEditModal = React.forwardRef<ModalRef, Props>(
  ({ data, onClose, onRefresh }, ref) => {
    const formHandle = useRef<ExpertiseFormHandle | null>(null);

    const onSave = async () => {
      if (!formHandle.current || !data?.id) return;
      const { formData, imageFile, iconFile } = formHandle.current.getData();

      try {
        let imagePath = formData.image;
        let iconPath = formData.image_icon;

        if (imageFile) {
          const timestamp = Date.now();
          const imageUrl = await uploadImage(
            'expertise',
            `image-${timestamp}-${imageFile.name}`,
            imageFile
          );
          if (!imageUrl) {
            alert('Failed to upload image. Please try again.');
            return;
          }
          imagePath = imageUrl;
        }

        if (iconFile) {
          const timestamp = Date.now();
          const iconUrl = await uploadImage(
            'expertise',
            `icon-${timestamp}-${iconFile.name}`,
            iconFile
          );
          if (!iconUrl) {
            alert('Failed to upload icon. Please try again.');
            return;
          }
          iconPath = iconUrl;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { index: _index, ...cleanFormData } = formData as Record<string, unknown>;

        await updateById('expertise', data.id, {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(cleanFormData as any),
          image: imagePath,
          image_icon: iconPath,
        });

        const controller = (ref as RefObject<ModalRef> | null)?.current;
        if (controller) controller.hide();
        if (onClose) onClose();
        if (onRefresh) onRefresh();
      } catch (error) {
        console.error('Error updating expertise item:', error);
        alert('Failed to update. Please check console for details.');
      }
    };

    const onDelete = async () => {
      if (!data?.id) return;
      const confirmed = window.confirm('Are you sure you want to delete this expertise item?');
      if (!confirmed) return;

      try {
        await deleteById('expertise', data.id);
        const controller = (ref as RefObject<ModalRef> | null)?.current;
        if (controller) controller.hide();
        if (onClose) onClose();
        if (onRefresh) onRefresh();
      } catch (error) {
        console.error('Error deleting expertise item:', error);
        alert('Failed to delete. Please check console for details.');
      }
    };

    return (
      <Modal title="Edit Expertise Item" onClose={onClose} ref={ref}>
        <ExpertiseForm ref={formHandle} data={data} />
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

ExpertiseEditModal.displayName = 'ExpertiseEditModal';
export default ExpertiseEditModal;
