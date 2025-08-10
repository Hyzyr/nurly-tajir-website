import { ServiceInsert } from '@/types/supabase';
import { FieldConfigMap } from '@/UI/components/form/DynamicForm';

export const servicesConfig: FieldConfigMap<ServiceInsert>  = {
  title_en: { label: 'Title English', type: 'text' },
  description_en: { label: 'Description English', type: 'textarea' },
  title_ru: { label: 'Title Russian', type: 'text' },
  description_ru: { label: 'Description Russian', type: 'textarea' },
  title_tm: { label: 'Title Turkmen', type: 'text' },
  description_tm: { label: 'Description Turkmen', type: 'textarea' },
};

export const emptyService: ServiceInsert = {
  title_en: '',
  title_ru: '',
  title_tm: '',
  description_en: '',
  description_ru: '',
  description_tm: '',
  image: '',
};
