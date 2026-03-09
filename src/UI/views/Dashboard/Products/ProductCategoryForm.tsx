'use client';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ProductCategoryInsert, ProductCategoryUpdate } from '@/types/supabase';
import ImageInput, { ImageInputRef } from '@/UI/components/form/ImageInput';
import { LabeledInput } from '@/UI/components/form/Input';
import LanguageTabs, { LangKey, LangTabsRef } from '@/UI/components/form/LanguageTabs';
import formStyles from '@/UI/components/form/styles.module.scss';

type Props = {
  data: ProductCategoryUpdate | null;
};

export interface ProductCategoryFormHandle {
  getData: () => {
    formData: ProductCategoryInsert;
    imageFile: File | null;
  };
  validate: () => { valid: boolean; errors: Partial<Record<LangKey, string>> };
  switchTab: (lang: LangKey) => void;
}

export type Brand = { name: string; link: string };

const normalizeBrands = (raw: unknown): Brand[] => {
  if (!Array.isArray(raw)) return [];
  return (raw as (Brand | string | null)[]).map((b) => {
    if (!b) return null;
    if (typeof b === 'string') return { name: b, link: '' };
    return { name: b.name ?? '', link: b.link ?? '' };
  }).filter((b): b is Brand => b !== null && b.name.trim() !== '');
};

/* ── Inline brand list editor ─────────────────────────────── */
type BrandListEditorProps = {
  value: Brand[];
  onChange: (brands: Brand[]) => void;
};

const BrandListEditor = ({ value, onChange }: BrandListEditorProps) => {
  const update = (i: number, field: keyof Brand, val: string) => {
    const next = value.map((b, idx) => idx === i ? { ...b, [field]: val } : b);
    onChange(next);
  };
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const add = () => onChange([...value, { name: '', link: '' }]);

  return (
    <div className={formStyles.brandList}>
      <span className={formStyles.brandList__label}>Brands</span>
      {value.map((brand, i) => (
        <div key={i} className={formStyles.brandList__row}>
          <input
            className={formStyles.brandList__input}
            placeholder="Name (e.g. Hikvision)"
            value={brand.name}
            onChange={(e) => update(i, 'name', e.target.value)}
          />
          <input
            className={formStyles.brandList__input}
            placeholder="Link (https://…)"
            value={brand.link}
            onChange={(e) => update(i, 'link', e.target.value)}
          />
          <button
            type="button"
            className={formStyles.brandList__remove}
            onClick={() => remove(i)}
            title="Remove"
          >×</button>
        </div>
      ))}
      <button type="button" className={formStyles.brandList__add} onClick={add}>
        + Add Brand
      </button>
    </div>
  );
};

const ProductCategoryForm = forwardRef<ProductCategoryFormHandle, Props>(({ data }, ref) => {
  const [formData, setFormData] = useState<ProductCategoryInsert>({
    name_en: data?.name_en ?? '',
    name_ru: data?.name_ru ?? '',
    name_tm: data?.name_tm ?? '',
    image: data?.image ?? '',
    brands: normalizeBrands(data?.brands),
  });

  const imageRef = useRef<ImageInputRef>(null);
  const tabsRef = useRef<LangTabsRef>(null);

  useEffect(() => {
    if (data) {
      setFormData({
        name_en: data.name_en ?? '',
        name_ru: data.name_ru ?? '',
        name_tm: data.name_tm ?? '',
        image: data.image ?? '',
        brands: normalizeBrands(data.brands),
      });
    }
  }, [data]);

  const set = (key: keyof ProductCategoryInsert) => (value: unknown) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const generateImageURL = (src: string) =>
    src.startsWith('http') ? src : `/images/website/products/${src}`;

  useImperativeHandle(
    ref,
    () => ({
      getData: () => ({
        formData,
        imageFile: imageRef.current?.selectedFile() ?? null,
      }),

      validate: () => {
        const errors: Partial<Record<LangKey, string>> = {};
        if (!formData.name_en?.trim()) errors.en = 'Name (EN) is required';
        if (!formData.name_ru?.trim()) errors.ru = 'Name (RU) is required';
        if (!formData.name_tm?.trim()) errors.tk = 'Name (TK) is required';

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
      {/* Language Tabs */}
      <LanguageTabs ref={tabsRef}>
        {(lang) => (
          <>
            {lang === 'en' && (
              <LabeledInput sizeStyle="sm" label="Name (EN)" value={formData.name_en ?? ''} onChange={(e) => set('name_en')(e.target.value)} />
            )}
            {lang === 'ru' && (
              <LabeledInput sizeStyle="sm" label="Name (RU)" value={formData.name_ru ?? ''} onChange={(e) => set('name_ru')(e.target.value)} />
            )}
            {lang === 'tk' && (
              <LabeledInput sizeStyle="sm" label="Name (TK)" value={formData.name_tm ?? ''} onChange={(e) => set('name_tm')(e.target.value)} />
            )}
          </>
        )}
      </LanguageTabs>

      {/* Brands */}
      <BrandListEditor
        value={(formData.brands as Brand[]) ?? []}
        onChange={(brands) => set('brands')(brands)}
      />

      {/* Image */}
      <div>
        <label>Image</label>
        <ImageInput ref={imageRef} ratioPercent={1} url={data?.image ? generateImageURL(data.image) : null} />
      </div>
    </div>
  );
});

ProductCategoryForm.displayName = 'ProductCategoryForm';
export default ProductCategoryForm;
