import { ProductCategoryInsert } from '@/types/supabase';
import { FieldConfigMap } from '@/UI/components/form/DynamicForm';

export const productsCategoryConfig: FieldConfigMap<ProductCategoryInsert> = {
  name_en: { label: 'Title English', type: 'text' },
  name_ru: { label: 'Title Russian', type: 'text' },
  name_tm: { label: 'Title Turkmen', type: 'text' },
};
