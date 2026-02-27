'use client';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ProjectInsert, ProjectUpdate } from '@/types/supabase';
import ImageInput, { ImageInputRef } from '@/UI/components/form/ImageInput';
import { LabeledInput } from '@/UI/components/form/Input';
import { LabeledTextarea } from '@/UI/components/form/TextArea';
import LanguageTabs, { LangKey, LangTabsRef } from '@/UI/components/form/LanguageTabs';
import TagInput from '@/UI/components/form/TagInput';
import formStyles from '@/UI/components/form/styles.module.scss';

type Props = {
  data: ProjectUpdate | null;
};

export interface ProjectFormHandle {
  getData: () => {
    formData: ProjectInsert;
    imageFile: File | null;
  };
  validate: () => { valid: boolean; errors: Partial<Record<LangKey, string>> };
  switchTab: (lang: LangKey) => void;
}

const ProjectForm = forwardRef<ProjectFormHandle, Props>(({ data }, ref) => {
  const [formData, setFormData] = useState<ProjectInsert>({
    title_en: data?.title_en ?? '',
    title_ru: data?.title_ru ?? '',
    title_tm: data?.title_tm ?? '',
    description_en: data?.description_en ?? '',
    description_ru: data?.description_ru ?? '',
    description_tm: data?.description_tm ?? '',
    image: data?.image ?? '',
    client: (data as ProjectUpdate)?.client ?? '',
    location: (data as ProjectUpdate)?.location ?? '',
    completed_at: (data as ProjectUpdate)?.completed_at ?? '',
    show_in_main: (data as ProjectUpdate)?.show_in_main ?? false,
    tags: (data as ProjectUpdate)?.tags ?? [],
    stats: (data as ProjectUpdate)?.stats ?? [],
  });

  const imageRef = useRef<ImageInputRef>(null);
  const tabsRef = useRef<LangTabsRef>(null);

  useEffect(() => {
    if (data) {
      setFormData({
        title_en: data.title_en ?? '',
        title_ru: data.title_ru ?? '',
        title_tm: data.title_tm ?? '',
        description_en: data.description_en ?? '',
        description_ru: data.description_ru ?? '',
        description_tm: data.description_tm ?? '',
        image: data.image ?? '',
        client: (data as ProjectUpdate).client ?? '',
        location: (data as ProjectUpdate).location ?? '',
        completed_at: (data as ProjectUpdate).completed_at ?? '',
        show_in_main: (data as ProjectUpdate).show_in_main ?? false,
        tags: (data as ProjectUpdate).tags ?? [],
        stats: (data as ProjectUpdate).stats ?? [],
      });
    }
  }, [data]);

  const set = (key: keyof ProjectInsert) => (value: unknown) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const generateImageURL = (src: string) =>
    src.startsWith('http') ? src : `/images/website/projects/${src}`;

  useImperativeHandle(
    ref,
    () => ({
      getData: () => ({
        formData,
        imageFile: imageRef.current?.selectedFile() ?? null,
      }),

      validate: () => {
        const errors: Partial<Record<LangKey, string>> = {};
        if (!formData.title_en?.trim()) errors.en = 'Title (EN) is required';
        if (!formData.description_en?.trim()) errors.en = (errors.en ? errors.en + ', ' : '') + 'Description (EN) is required';
        if (!formData.title_ru?.trim()) errors.ru = 'Title (RU) is required';
        if (!formData.description_ru?.trim()) errors.ru = (errors.ru ? errors.ru + ', ' : '') + 'Description (RU) is required';
        if (!formData.title_tm?.trim()) errors.tk = 'Title (TK) is required';
        if (!formData.description_tm?.trim()) errors.tk = (errors.tk ? errors.tk + ', ' : '') + 'Description (TK) is required';

        tabsRef.current?.setErrors(errors);
        const firstErr = (['en', 'ru', 'tk'] as LangKey[]).find((l) => errors[l]);
        if (firstErr) tabsRef.current?.switchTo(firstErr);
        return { valid: Object.keys(errors).length === 0, errors };
      },

      switchTab: (lang) => tabsRef.current?.switchTo(lang),
    }),
    [formData]
  );

  return (
    <div className={formStyles.form}>
      {/* Shared fields */}
      <LabeledInput sizeStyle="sm" label="Client" value={String(formData.client ?? '')} onChange={(e) => set('client')(e.target.value)} />
      <LabeledInput sizeStyle="sm" label="Location" value={String(formData.location ?? '')} onChange={(e) => set('location')(e.target.value)} />
      <LabeledInput sizeStyle="sm" label="Completed At (YYYY-MM-DD)" value={String(formData.completed_at ?? '')} onChange={(e) => set('completed_at')(e.target.value)} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="checkbox"
          checked={Boolean(formData.show_in_main)}
          onChange={(e) => set('show_in_main')(e.target.checked)}
        />
        <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--n400)' }}>Show in Main Page</label>
      </div>

      {/* Tags */}
      <TagInput
        label="Tags"
        value={(formData.tags as string[]) ?? []}
        onChange={(tags) => set('tags')(tags)}
        placeholder="e.g. CCTV, Network Infrastructure…"
      />

      {/* Stats */}
      <TagInput
        label="Stats"
        value={(formData.stats as string[]) ?? []}
        onChange={(stats) => set('stats')(stats)}
        placeholder="e.g. 180+ cameras, 99.9% uptime…"
      />

      {/* Language Tabs */}
      <LanguageTabs ref={tabsRef}>
        {(lang) => (
          <>
            {lang === 'en' && (
              <>
                <LabeledInput sizeStyle="sm" label="Title (EN)" value={formData.title_en ?? ''} onChange={(e) => set('title_en')(e.target.value)} />
                <LabeledTextarea sizeStyle="sm" label="Description (EN)" value={formData.description_en ?? ''} onChange={(e) => set('description_en')(e.target.value)} />
              </>
            )}
            {lang === 'ru' && (
              <>
                <LabeledInput sizeStyle="sm" label="Title (RU)" value={formData.title_ru ?? ''} onChange={(e) => set('title_ru')(e.target.value)} />
                <LabeledTextarea sizeStyle="sm" label="Description (RU)" value={formData.description_ru ?? ''} onChange={(e) => set('description_ru')(e.target.value)} />
              </>
            )}
            {lang === 'tk' && (
              <>
                <LabeledInput sizeStyle="sm" label="Title (TK)" value={formData.title_tm ?? ''} onChange={(e) => set('title_tm')(e.target.value)} />
                <LabeledTextarea sizeStyle="sm" label="Description (TK)" value={formData.description_tm ?? ''} onChange={(e) => set('description_tm')(e.target.value)} />
              </>
            )}
          </>
        )}
      </LanguageTabs>

      {/* Image */}
      <div>
        <label>Image</label>
        <ImageInput ref={imageRef} ratioPercent={1} url={data?.image ? generateImageURL(data.image) : null} />
      </div>
    </div>
  );
});

ProjectForm.displayName = 'ProjectForm';
export default ProjectForm;
