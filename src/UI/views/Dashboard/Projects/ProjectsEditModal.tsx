import { Project } from '@/types/supabase';
import { DynamicForm } from '@/UI/components/form/DynamicForm';
import Modal from '@/UI/components/Modal';
import React from 'react';
import { projectsConfig } from './constants';
import { LabeledImageInput } from '@/UI/components/form/ImageInput';
import { ModalCTA, ModalRef } from '@/UI/components/Modal/Modal';
import Button from '@/UI/components/Button';

type Props = {
  data: Project | null;
  onClose?: () => void;
};

const ProjectsEditModal = React.forwardRef<ModalRef, Props>(
  ({ onClose, data }, ref) => {
    const generateImageURL = (src: string) => {
      return src.startsWith('http') ? src : `${src}`;
    };

    return (
      <Modal title="Edit Project" onClose={onClose} ref={ref}>
        <LabeledImageInput
          label="Image"
          ratioPercent={1}
          url={data?.image ? generateImageURL(data.image) : null}
        />
        <DynamicForm config={projectsConfig} value={data ?? {}} />
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
);

export default ProjectsEditModal;
