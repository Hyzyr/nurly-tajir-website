'use client';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ServiceInsert, ServiceUpdate } from '@/types/supabase';
import ImageInput, { ImageInputRef } from '@/UI/components/form/ImageInput';
import { LabeledInput } from '@/UI/components/form/Input';
import { LabeledTextarea } from '@/UI/components/form/TextArea';
import LanguageTabs, { LangKey, LangTabsRef } from '@/UI/components/form/LanguageTabs';
import formStyles from '@/UI/components/form/styles.module.scss';

type Props = {
  data: ServiceUpdate | null;
};

export interface ServiceFormHandle {
  getData: () => {
    formData: ServiceInsert;
    imageFile: File | null;
    iconFile: File | null;
  };
  /** Run validation; sets tab error badges and switches to the first failing tab */
  validate: () => { valid: boolean; errors: Partial<Record<LangKey, string>> };
  /** Switch language tab programmatically */
  switchTab: (lang: LangKey) => void;
}

const ServiceForm = forwardRef<ServiceFormHandle, Props>(({ data }, ref) => {
  // ── local state ────────────────────────────────────────────────────
  const [formData, setFormData] = useState<ServiceInsert>({
    title_en: data?.title_en ?? '',
    title_ru: data?.title_ru ?? '',
    title_tm: data?.title_tm ?? '',
    description_en: data?.description_en ?? '',
    description_ru: data?.description_ru ?? '',
    description_tm: data?.description_tm ?? '',
    image: data?.image ?? '',
    image_icon: data?.image_icon ?? '',
  });

  // ── refs ───────────────────────────────────────────────────────────
  const imageRef = useRef<ImageInputRef>(null);
  const iconRef = useRef<ImageInputRef>(null);
  const tabsRef = useRef<LangTabsRef>(null);

  // Re-sync when data prop changes (e.g. edit modal opens with new row)
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
        image_icon: data.image_icon ?? '',
      });
    }
  }, [data]);

  // ── helpers ────────────────────────────────────────────────────────
  const set = (key: keyof ServiceInsert) => (value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const generateImageURL = (src: string) =>
    src.startsWith('http') ? src : `/images/website/services/${src}`;

  // ── imperative handle ──────────────────────────────────────────────
  useImperativeHandle(
    ref,
    () => ({
      getData: () => ({
        formData,
        imageFile: imageRef.current?.selectedFile() ?? null,
        iconFile: iconRef.current?.selectedFile() ?? null,
      }),

      validate: () => {
        const errors: Partial<Record<LangKey, string>> = {};
        if (!formData.title_en?.trim()) errors.en = 'Title (EN) is required';
        if (!formData.title_ru?.trim()) errors.ru = 'Title (RU) is required';
        if (!formData.title_tm?.trim()) errors.tk = 'Title (TK) is required';

        tabsRef.current?.setErrors(errors);

        // Auto-switch to the first tab that has an error
        const firstErr = (['en', 'ru', 'tk'] as LangKey[]).find((l) => errors[l]);
        if (firstErr) tabsRef.current?.switchTo(firstErr);

        return { valid: Object.keys(errors).length === 0, errors };
      },

      switchTab: (lang) => tabsRef.current?.switchTo(lang),
    }),
    [formData]
  );

  // ── render ─────────────────────────────────────────────────────────
  return (
    <div className={formStyles.form}>
      {/* Language Tabs */}
      <LanguageTabs ref={tabsRef}>
        {(lang) => (
          <>
            {lang === 'en' && (
              <>
                <LabeledInput
                  sizeStyle="sm"
                  label="Title (EN)"
                  value={formData.title_en ?? ''}
                  onChange={(e) => set('title_en')(e.target.value)}
                />
                <LabeledTextarea
                  sizeStyle="sm"
                  label="Description (EN)"
                  value={formData.description_en ?? ''}
                  onChange={(e) => set('description_en')(e.target.value)}
                />
              </>
            )}
            {lang === 'ru' && (
              <>
                <LabeledInput
                  sizeStyle="sm"
                  label="Title (RU)"
                  value={formData.title_ru ?? ''}
                  onChange={(e) => set('title_ru')(e.target.value)}
                />
                <LabeledTextarea
                  sizeStyle="sm"
                  label="Description (RU)"
                  value={formData.description_ru ?? ''}
                  onChange={(e) => set('description_ru')(e.target.value)}
                />
              </>
            )}
            {lang === 'tk' && (
              <>
                <LabeledInput
                  sizeStyle="sm"
                  label="Title (TK)"
                  value={formData.title_tm ?? ''}
                  onChange={(e) => set('title_tm')(e.target.value)}
                />
                <LabeledTextarea
                  sizeStyle="sm"
                  label="Description (TK)"
                  value={formData.description_tm ?? ''}
                  onChange={(e) => set('description_tm')(e.target.value)}
                />
              </>
            )}
          </>
        )}
      </LanguageTabs>

      {/* Main image + icon */}
      <div className="fbox fbox-gap-1">
        <div>
          <label>Service Image</label>
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

    </div>
  );
});

ServiceForm.displayName = 'ServiceForm';
export default ServiceForm;
