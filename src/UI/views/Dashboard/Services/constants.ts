import { Service } from '@/types/supabase';
import { FieldConfigMap } from '@/UI/components/form/DynamicForm';

// Create a config map for Person
export const servicesConfig: FieldConfigMap<Service> = {
  title_en: { label: 'Title English', type: 'text' },
  description_en: { label: 'Description English', type: 'textarea' },
  title_ru: { label: 'Title Russian', type: 'text' },
  description_ru: { label: 'Description Russian', type: 'textarea' },
  title_tm: { label: 'Title Turkmen', type: 'text' },
  description_tm: { label: 'Description Turkmen', type: 'textarea' },
};
