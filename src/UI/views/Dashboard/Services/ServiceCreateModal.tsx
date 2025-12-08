'use client';
import React, { RefObject, useRef } from 'react';
import Button from '@/UI/components/Button';
import Modal from '@/UI/components/Modal';
import { ModalCTA, ModalRef } from '@/UI/components/Modal/Modal';
import { createRow } from '@/utils/supabase/client';
import { uploadImage } from '@/utils/supabase/storage';
import ServiceForm, { ServiceFormHandle } from './ServiceForm';

type Props = {
  onClose?: () => void;
  disabled?: boolean;
  onRefresh?: () => void;
};

const ServiceCreateModal = React.forwardRef<ModalRef, Props>(
  ({ onClose, onRefresh }, ref) => {
    const formHandle = useRef<ServiceFormHandle | null>(null);

    const onSave = async () => {
      console.log('saving...');
      if (!formHandle.current) return;
      const { formData, imageFile, iconFile } = formHandle.current.getData();
      
      console.log('Form data:', formData);
      console.log('Image file:', imageFile);
      console.log('Icon file:', iconFile);

      try {
        // Upload images if provided
        let imagePath = formData.image;
        let iconPath = formData.image_icon;

        if (imageFile) {
          const timestamp = Date.now();
          const imageUrl = await uploadImage(
            'services',
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
            'services',
            `icon-${timestamp}-${iconFile.name}`,
            iconFile
          );
          if (!iconUrl) {
            alert('Failed to upload icon. Please try again.');
            return;
          }
          iconPath = iconUrl;
        }

        // Remove fields that don't exist in database schema
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { index: _index, ...cleanFormData } = formData as Record<string, unknown>;

        // Create service with image URLs
        await createRow('services', {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(cleanFormData as any),
          image: imagePath,
          image_icon: iconPath,
        });

        const controller = (ref as RefObject<ModalRef> | null)?.current;
        if (controller) controller.hide();
        if (onClose) onClose();
        
        // Refresh table data
        if (onRefresh) onRefresh();
      } catch (error) {
        console.error('Error creating service:', error);
        alert('Failed to create service. Please check console for details.');
      }
    };

    return (
      <Modal title="Create Service" onClose={onClose} ref={ref}>
        <ServiceForm ref={formHandle} data={null} />
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
            text="Save 2"
            inlineCSS={{ minWidth: '110px', justifyContent: 'flex-start' }}
            onClick={() => {
              console.log('Save button clicked');
              onSave();
            }}
          />
        </ModalCTA>
      </Modal>
    );
  }
);

ServiceCreateModal.displayName = 'ServiceCreateModal';
export default ServiceCreateModal;
