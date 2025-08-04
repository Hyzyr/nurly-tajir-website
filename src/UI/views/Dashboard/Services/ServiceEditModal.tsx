import React from 'react';
import { servicesConfig } from './constants';
import { Service } from '@/types/supabase';
import { DynamicForm } from '@/UI/components/form/DynamicForm';
import Button from '@/UI/components/Button';
import Modal from '@/UI/components/Modal';
import { ModalCTA, ModalRef } from '@/UI/components/Modal/Modal';
import ImageInput, { LabeledImageInput } from '@/UI/components/form/ImageInput';

type Props = {
  data: Service | null;
  onClose: () => void;
};

const ServiceEditModal = React.forwardRef<ModalRef, Props>(
  ({ data, onClose }, ref) => {
    const generateURL = (src: string) => {
      return src.startsWith('http') ? src : `/images/website/services/${src}`;
    };

    console.log({
      url: data?.image ? generateURL(data.image) : null,
      image_iconurl: data?.image_icon ? generateURL(data.image_icon) : null,
    });

    return (
      <Modal title="Edit Service" onClose={onClose} ref={ref}>
        <DynamicForm config={servicesConfig} value={data ?? {}} />
        <div className="fbox fbox-gap-1">
          <LabeledImageInput
            label="Image"
            ratioPercent={1}
            url={data?.image ? generateURL(data.image) : null}
          />
          <LabeledImageInput
            label="Icon"
            ratioPercent={1}
            url={data?.image_icon ? generateURL(data.image_icon) : null}
          />
        </div>
        <ModalCTA>
          <Button size="sm" icon="mapPinIcon" style="secondary" text="Cancel" />
          <Button size="sm" text="Button" />
        </ModalCTA>
      </Modal>
    );
  }
);

export default ServiceEditModal;
