'use client';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ExpertiseInsert, ExpertiseUpdate } from '@/types/supabase';
import ImageInput, { ImageInputRef } from '@/UI/components/form/ImageInput';
import { LabeledInput } from '@/UI/components/form/Input';
import { LabeledTextarea } from '@/UI/components/form/TextArea';
import LanguageTabs, { LangKey, LangTabsRef } from '@/UI/components/form/LanguageTabs';
import MultiImageUploader, {
  MultiImageUploaderRef,
  UploadProgressItem,
} from '@/UI/components/form/MultiImageUploader';
import TagInput from '@/UI/components/form/TagInput';
import formStyles from '@/UI/components/form/styles.module.scss';

type Props = {
  data: ExpertiseUpdate | null;
  uploadProgress?: UploadProgressItem[];
};

export interface ExpertiseFormHandle {
  getData: () => {
    formData: ExpertiseInsert;
    imageFile: File | null;
    productImageFiles: File[];
  };
  validate: () => { valid: boolean; errors: Partial<Record<LangKey, string>> };
  switchTab: (lang: LangKey) => void;
  clearProductImages: () => void;
}

const ExpertiseForm = forwardRef<ExpertiseFormHandle, Props>(({ data, uploadProgress = [] }, ref) => {
  const [formData, setFormData] = useState<ExpertiseInsert>({
    service_slug: data?.service_slug ?? '',
    display_order: data?.display_order ?? 0,
    brands: (data as ExpertiseUpdate)?.brands ?? [],
    title_en: data?.title_en ?? '',
    title_ru: data?.title_ru ?? '',
    title_tm: data?.title_tm ?? '',
    description_en: data?.description_en ?? '',
    description_ru: data?.description_ru ?? '',
    description_tm: data?.description_tm ?? '',
    info_en: data?.info_en ?? '',
    info_ru: data?.info_ru ?? '',
    info_tm: data?.info_tm ?? '',
    tag_en: data?.tag_en ?? '',
    tag_ru: data?.tag_ru ?? '',
    tag_tm: data?.tag_tm ?? '',
    highlight_stat_en: data?.highlight_stat_en ?? '',
    highlight_stat_ru: data?.highlight_stat_ru ?? '',
    highlight_stat_tm: data?.highlight_stat_tm ?? '',
    image: data?.image ?? '',
  });

  const imageRef = useRef<ImageInputRef>(null);
  const multiImageRef = useRef<MultiImageUploaderRef>(null);
  const tabsRef = useRef<LangTabsRef>(null);

  // Re-sync when data prop changes (edit modal opens with new row)
  useEffect(() => {
    if (data) {
      setFormData({
        service_slug: data.service_slug ?? '',
        display_order: data.display_order ?? 0,
        brands: (data as ExpertiseUpdate).brands ?? [],
        title_en: data.title_en ?? '',
        title_ru: data.title_ru ?? '',
        title_tm: data.title_tm ?? '',
        description_en: data.description_en ?? '',
        description_ru: data.description_ru ?? '',
        description_tm: data.description_tm ?? '',
        info_en: data.info_en ?? '',
        info_ru: data.info_ru ?? '',
        info_tm: data.info_tm ?? '',
        tag_en: data.tag_en ?? '',
        tag_ru: data.tag_ru ?? '',
        tag_tm: data.tag_tm ?? '',
        highlight_stat_en: data.highlight_stat_en ?? '',
        highlight_stat_ru: data.highlight_stat_ru ?? '',
        highlight_stat_tm: data.highlight_stat_tm ?? '',
        image: data.image ?? '',
      });
    }
  }, [data]);

  const set = (key: keyof ExpertiseInsert) => (value: string | number | string[]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const generateImageURL = (src: string) =>
    src.startsWith('http') ? src : `/images/website/expertise/${src}`;

  useImperativeHandle(
    ref,
    () => ({
      getData: () => ({
        formData,
        imageFile: imageRef.current?.selectedFile() ?? null,
        productImageFiles: multiImageRef.current?.getFiles() ?? [],
      }),

      validate: () => {
        const errors: Partial<Record<LangKey, string>> = {};
        if (!formData.service_slug?.trim()) errors.en = 'Service slug is required';
        if (!formData.title_en?.trim()) errors.en = (errors.en ? errors.en + ', ' : '') + 'Title (EN) is required';
        if (!formData.tag_en?.trim()) errors.en = (errors.en ? errors.en + ', ' : '') + 'Tag (EN) is required';
        if (!formData.info_en?.trim()) errors.en = (errors.en ? errors.en + ', ' : '') + 'Info (EN) is required';
        if (!formData.description_en?.trim()) errors.en = (errors.en ? errors.en + ', ' : '') + 'Description (EN) is required';

        if (!formData.title_ru?.trim()) errors.ru = 'Title (RU) is required';
        if (!formData.tag_ru?.trim()) errors.ru = (errors.ru ? errors.ru + ', ' : '') + 'Tag (RU) is required';
        if (!formData.info_ru?.trim()) errors.ru = (errors.ru ? errors.ru + ', ' : '') + 'Info (RU) is required';
        if (!formData.description_ru?.trim()) errors.ru = (errors.ru ? errors.ru + ', ' : '') + 'Description (RU) is required';

        if (!formData.title_tm?.trim()) errors.tk = 'Title (TK) is required';
        if (!formData.tag_tm?.trim()) errors.tk = (errors.tk ? errors.tk + ', ' : '') + 'Tag (TK) is required';
        if (!formData.info_tm?.trim()) errors.tk = (errors.tk ? errors.tk + ', ' : '') + 'Info (TK) is required';
        if (!formData.description_tm?.trim()) errors.tk = (errors.tk ? errors.tk + ', ' : '') + 'Description (TK) is required';

        tabsRef.current?.setErrors(errors);
        const firstErr = (['en', 'ru', 'tk'] as LangKey[]).find((l) => errors[l]);
        if (firstErr) tabsRef.current?.switchTo(firstErr);
        return { valid: Object.keys(errors).length === 0, errors };
      },

      switchTab: (lang) => tabsRef.current?.switchTo(lang),
      clearProductImages: () => multiImageRef.current?.clear(),
    }),
    [formData]
  );

  return (
    <div className={formStyles.form}>
      {/* Shared fields */}
      <LabeledInput
        sizeStyle="sm"
        label="Service Slug"
        value={String(formData.service_slug ?? '')}
        onChange={(e) => set('service_slug')(e.target.value)}
      />
      <LabeledInput
        sizeStyle="sm"
        label="Display Order"
        type="number"
        value={formData.display_order ?? 0}
        onChange={(e) => set('display_order')(e.target.value === '' ? 0 : Number(e.target.value))}
      />

      {/* Brands */}
      <TagInput
        label="Brands"
        value={(formData.brands as string[]) ?? []}
        onChange={(brands) => set('brands')(brands)}
        placeholder="e.g. Cisco, Huawei, TP-Link…"
      />

      {/* Language Tabs */}
      <LanguageTabs ref={tabsRef}>
        {(lang) => (
          <>
            {lang === 'en' && (
              <>
                <LabeledInput sizeStyle="sm" label="Title (EN)" value={formData.title_en ?? ''} onChange={(e) => set('title_en')(e.target.value)} />
                <LabeledInput sizeStyle="sm" label="Tag (EN)" value={formData.tag_en ?? ''} onChange={(e) => set('tag_en')(e.target.value)} />
                <LabeledTextarea sizeStyle="sm" label="Info (EN)" value={formData.info_en ?? ''} onChange={(e) => set('info_en')(e.target.value)} />
                <LabeledTextarea sizeStyle="sm" label="Description (EN)" value={formData.description_en ?? ''} onChange={(e) => set('description_en')(e.target.value)} />
                <LabeledInput sizeStyle="sm" label="Highlight Stat (EN)" value={formData.highlight_stat_en ?? ''} onChange={(e) => set('highlight_stat_en')(e.target.value)} />
              </>
            )}
            {lang === 'ru' && (
              <>
                <LabeledInput sizeStyle="sm" label="Title (RU)" value={formData.title_ru ?? ''} onChange={(e) => set('title_ru')(e.target.value)} />
                <LabeledInput sizeStyle="sm" label="Tag (RU)" value={formData.tag_ru ?? ''} onChange={(e) => set('tag_ru')(e.target.value)} />
                <LabeledTextarea sizeStyle="sm" label="Info (RU)" value={formData.info_ru ?? ''} onChange={(e) => set('info_ru')(e.target.value)} />
                <LabeledTextarea sizeStyle="sm" label="Description (RU)" value={formData.description_ru ?? ''} onChange={(e) => set('description_ru')(e.target.value)} />
                <LabeledInput sizeStyle="sm" label="Highlight Stat (RU)" value={formData.highlight_stat_ru ?? ''} onChange={(e) => set('highlight_stat_ru')(e.target.value)} />
              </>
            )}
            {lang === 'tk' && (
              <>
                <LabeledInput sizeStyle="sm" label="Title (TK)" value={formData.title_tm ?? ''} onChange={(e) => set('title_tm')(e.target.value)} />
                <LabeledInput sizeStyle="sm" label="Tag (TK)" value={formData.tag_tm ?? ''} onChange={(e) => set('tag_tm')(e.target.value)} />
                <LabeledTextarea sizeStyle="sm" label="Info (TK)" value={formData.info_tm ?? ''} onChange={(e) => set('info_tm')(e.target.value)} />
                <LabeledTextarea sizeStyle="sm" label="Description (TK)" value={formData.description_tm ?? ''} onChange={(e) => set('description_tm')(e.target.value)} />
                <LabeledInput sizeStyle="sm" label="Highlight Stat (TK)" value={formData.highlight_stat_tm ?? ''} onChange={(e) => set('highlight_stat_tm')(e.target.value)} />
              </>
            )}
          </>
        )}
      </LanguageTabs>

      {/* Hero image */}
      <div>
        <label>Hero Image</label>
        <ImageInput ref={imageRef} ratioPercent={1} url={data?.image ? generateImageURL(data.image) : null} />
      </div>

      {/* Multi-image product photos */}
      <div>
        <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--n400)', display: 'block', marginBottom: '0.5rem' }}>
          Product Images
        </label>
        <MultiImageUploader
          ref={multiImageRef}
          uploadProgress={uploadProgress}
          existingUrls={(data as Record<string, unknown>)?.images as string[] ?? []}
        />
      </div>
    </div>
  );
});

ExpertiseForm.displayName = 'ExpertiseForm';
export default ExpertiseForm;
