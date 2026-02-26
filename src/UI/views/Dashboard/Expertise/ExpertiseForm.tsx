'use client';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { expertiseConfig } from './constants';
import { ServiceSectionInsert, ServiceSectionUpdate } from '@/types/supabase';
import { DynamicForm, DynamicFormHandle } from '@/UI/components/form/DynamicForm';
import ImageInput, { ImageInputRef } from '@/UI/components/form/ImageInput';

type Props = {
  data: ServiceSectionUpdate | null;
};

export interface ExpertiseFormHandle {
  getData: () => {
    formData: ServiceSectionInsert;
    imageFile: File | null;
    iconFile: File | null;
  };
}

const ExpertiseForm = forwardRef<ExpertiseFormHandle, Props>(({ data }, ref) => {
  const formRef = useRef<DynamicFormHandle<ServiceSectionInsert>>(null);
  const imageRef = useRef<ImageInputRef>(null);
  const iconRef = useRef<ImageInputRef>(null);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      formData: formRef.current?.getData() ?? ({} as ServiceSectionInsert),
      imageFile: imageRef.current?.selectedFile() ?? null,
      iconFile: iconRef.current?.selectedFile() ?? null,
    }),
  }));

  const generateImageURL = (src: string) => {
    return src.startsWith('http') ? src : `/images/website/expertise/${src}`;
  };

  return (
    <>
      <DynamicForm
        config={expertiseConfig}
        value={data ?? ({} as ServiceSectionInsert)}
        ref={formRef}
      />
      <div className="fbox fbox-gap-1">
        <div>
          <label>Hero Image</label>
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

ExpertiseForm.displayName = 'ExpertiseForm';
export default ExpertiseForm;
