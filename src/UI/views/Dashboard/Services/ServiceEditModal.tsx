import React, { RefObject, useEffect, useRef } from 'react';
import { servicesConfig } from './constants';
import { ServiceInsert, ServiceUpdate } from '@/types/supabase';
import {
  DynamicForm,
  DynamicFormHandle,
} from '@/UI/components/form/DynamicForm';
import Button from '@/UI/components/Button';
import Modal from '@/UI/components/Modal';
import { ModalCTA, ModalRef } from '@/UI/components/Modal/Modal';
import { LabeledImageInput } from '@/UI/components/form/ImageInput';
import { fetchById, updateById } from '@/utils/supabase/client';

type Props = {
  data: ServiceUpdate | null;
  onClose?: () => void;
  disabled?: boolean;
};

function pickFromFormData<
  T extends Record<PropertyKey, unknown>,
  K extends keyof T
>(formData: T, keys: readonly K[]): Pick<T, K> {
  const acc: Partial<Pick<T, K>> = {};
  for (const key of keys) acc[key] = formData[key];
  return acc as Pick<T, K>;
}

const ServiceEditModal = React.forwardRef<ModalRef, Props>(
  ({ data, onClose }, ref) => {
    const formHandle = useRef<DynamicFormHandle<ServiceInsert> | null>(null);

    useEffect(() => {
      if (data?.id)
        fetchById('services', data?.id).then((data) => {
          console.log({ data });
        });
    }, [data]);

    const generateImageURL = (src: string) => {
      return src.startsWith('http') ? src : `/images/website/services/${src}`;
    };
    const onSave = () => {
      if (!formHandle.current || !data?.id) return;
      const formData = formHandle.current.getData()!;
      const newData = pickFromFormData(
        formData,
        Object.keys(servicesConfig) as (keyof ServiceInsert)[]
      );

      updateById('services' as const, data?.id, {
        // id: data?.id,
        ...newData,
      });
    };
    return (
      <Modal title="Edit Service" onClose={onClose} ref={ref}>
        <DynamicForm
          config={servicesConfig}
          value={data ?? {}}
          ref={formHandle}
        />
        <div className="fbox fbox-gap-1">
          <LabeledImageInput
            label="Image"
            ratioPercent={1}
            url={data?.image ? generateImageURL(data.image) : null}
          />
          <LabeledImageInput
            label="Icon"
            ratioPercent={1}
            url={data?.image_icon ? generateImageURL(data.image_icon) : null}
          />
        </div>
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
