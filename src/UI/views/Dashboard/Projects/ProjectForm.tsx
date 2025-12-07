'use client';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { projectsConfig } from './constants';
import { ProjectInsert, ProjectUpdate } from '@/types/supabase';
import { DynamicForm, DynamicFormHandle } from '@/UI/components/form/DynamicForm';
import ImageInput, { ImageInputRef } from '@/UI/components/form/ImageInput';

type Props = {
  data: ProjectUpdate | null;
};

export interface ProjectFormHandle {
  getData: () => {
    formData: ProjectInsert;
    imageFile: File | null;
  };
}

const ProjectForm = forwardRef<ProjectFormHandle, Props>(({ data }, ref) => {
  const formRef = useRef<DynamicFormHandle<ProjectInsert>>(null);
  const imageRef = useRef<ImageInputRef>(null);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      formData: formRef.current?.getData() ?? ({} as ProjectInsert),
      imageFile: imageRef.current?.selectedFile() ?? null,
    }),
  }));

  const generateImageURL = (src: string) => {
    return src.startsWith('http') ? src : `/images/website/projects/${src}`;
  };

  return (
    <>
      <DynamicForm
        config={projectsConfig}
        value={data ?? ({} as ProjectInsert)}
        ref={formRef}
      />
      <div>
        <label>Image</label>
        <ImageInput
          ref={imageRef}
          ratioPercent={1}
          url={data?.image ? generateImageURL(data.image) : null}
        />
      </div>
    </>
  );
});

ProjectForm.displayName = 'ProjectForm';
export default ProjectForm;
