'use client';
import React, { RefObject, useRef } from 'react';
import { ServiceUpdate } from '@/types/supabase';
import Button from '@/UI/components/Button';
import Modal from '@/UI/components/Modal';
import { ModalCTA, ModalRef } from '@/UI/components/Modal/Modal';
import { updateById, deleteById } from '@/utils/supabase/client';
import { uploadImage } from '@/utils/supabase/storage';
import ServiceForm, { ServiceFormHandle } from './ServiceForm';

type Props = {
  data: ServiceUpdate | null;
  onClose?: () => void;
  disabled?: boolean;
  onRefresh?: () => void;
};

const ServiceEditModal = React.forwardRef<ModalRef, Props>(
  ({ data, onClose, onRefresh }, ref) => {
    const formHandle = useRef<ServiceFormHandle | null>(null);

    const onSave = async () => {
      if (!formHandle.current || !data?.id) return;
      const { formData, imageFile, iconFile } = formHandle.current.getData();
      
      console.log('Form data:', formData);
      console.log('Image file:', imageFile);
      console.log('Icon file:', iconFile);

      try {
        // Upload images if new files are provided
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

        // Update service with new data and image URLs
        await updateById('services', data.id, {
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
        console.error('Error updating service:', error);
        alert('Failed to update service. Please check console for details.');
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
        
        // Refresh table data
        if (onRefresh) onRefresh();
      } catch (error) {
        console.error('Error deleting service:', error);
        // Handle error, perhaps show a message
      }
    };

    return (
      <Modal title="Edit Service" onClose={onClose} ref={ref}>
        <ServiceForm ref={formHandle} data={data} />
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

ServiceEditModal.displayName = 'ServiceEditModal';
export default ServiceEditModal;
