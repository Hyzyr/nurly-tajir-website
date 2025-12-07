'use client';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { servicesConfig } from './constants';
import { ServiceInsert, ServiceUpdate } from '@/types/supabase';
import { DynamicForm, DynamicFormHandle } from '@/UI/components/form/DynamicForm';
import ImageInput, { ImageInputRef } from '@/UI/components/form/ImageInput';

type Props = {
  data: ServiceUpdate | null;
};

export interface ServiceFormHandle {
  getData: () => {
    formData: ServiceInsert;
    imageFile: File | null;
    iconFile: File | null;
  };
}

const ServiceForm = forwardRef<ServiceFormHandle, Props>(({ data }, ref) => {
  const formRef = useRef<DynamicFormHandle<ServiceInsert>>(null);
  const imageRef = useRef<ImageInputRef>(null);
  const iconRef = useRef<ImageInputRef>(null);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      formData: formRef.current?.getData() ?? ({} as ServiceInsert),
      imageFile: imageRef.current?.selectedFile() ?? null,
      iconFile: iconRef.current?.selectedFile() ?? null,
    }),
  }));

  const generateImageURL = (src: string) => {
    return src.startsWith('http') ? src : `/images/website/services/${src}`;
  };

  return (
    <>
      <DynamicForm
        config={servicesConfig}
        value={data ?? ({} as ServiceInsert)}
        ref={formRef}
      />
      <div className="fbox fbox-gap-1">
        <div>
          <label>Image</label>
          <ImageInput
            ref={imageRef}
            ratioPercent={1}
            url={data?.image ? generateImageURL(data.image) : null}
          />
        </div>
        <div>
          <label>Icon</label>
          <ImageInput
            ref={iconRef}
            ratioPercent={1}
            url={data?.image_icon ? generateImageURL(data.image_icon) : null}
          />
        </div>
      </div>
    </>
  );
});

ServiceForm.displayName = 'ServiceForm';
export default ServiceForm;