'use client';
import React, { RefObject, useRef } from 'react';
import Button from '@/UI/components/Button';
import Modal from '@/UI/components/Modal';
import { ModalCTA, ModalRef } from '@/UI/components/Modal/Modal';
import { createRow } from '@/utils/supabase/client';
import { uploadImage } from '@/utils/supabase/storage';
import ProjectForm, { ProjectFormHandle } from './ProjectForm';

type Props = {
  onClose?: () => void;
  disabled?: boolean;
  onRefresh?: () => void;
};

const ProjectCreateModal = React.forwardRef<ModalRef, Props>(
  ({ onClose, onRefresh }, ref) => {
    const formHandle = useRef<ProjectFormHandle | null>(null);

    const onSave = async () => {
      if (!formHandle.current) return;
      const { formData, imageFile } = formHandle.current.getData();

      try {
        let imagePath = formData.image;

        if (imageFile) {
          const timestamp = Date.now();
          const imageUrl = await uploadImage(
            'projects',
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

        await createRow('projects', {
          ...cleanFormData,
          image: imagePath,
        });

        const controller = (ref as RefObject<ModalRef> | null)?.current;
        if (controller) controller.hide();
        if (onClose) onClose();
        
        if (onRefresh) onRefresh();
      } catch (error) {
        console.error('Error creating project:', error);
        alert('Failed to create project. Please check console for details.');
      }
    };

    return (
      <Modal title="Create Project" onClose={onClose} ref={ref}>
        <ProjectForm ref={formHandle} data={null} />
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

ProjectCreateModal.displayName = 'ProjectCreateModal';
export default ProjectCreateModal;
