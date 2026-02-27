import { ExpertiseInsert as ServiceSectionInsert } from '@/types/supabase';
import { FieldConfigMap } from '@/UI/components/form/DynamicForm';

export const expertiseConfig: FieldConfigMap<ServiceSectionInsert> = {
  service_slug: { label: 'Service Slug', type: 'text' },
  display_order: { label: 'Display Order', type: 'number' },

  title_en: { label: 'Title English', type: 'text' },
  description_en: { label: 'Description English', type: 'textarea' },
  info_en: { label: 'Info English', type: 'textarea' },
  tag_en: { label: 'Tag English', type: 'text' },
  highlight_stat_en: { label: 'Highlight Stat English', type: 'text' },

  title_ru: { label: 'Title Russian', type: 'text' },
  description_ru: { label: 'Description Russian', type: 'textarea' },
  info_ru: { label: 'Info Russian', type: 'textarea' },
  tag_ru: { label: 'Tag Russian', type: 'text' },
  highlight_stat_ru: { label: 'Highlight Stat Russian', type: 'text' },

  title_tm: { label: 'Title Turkmen', type: 'text' },
  description_tm: { label: 'Description Turkmen', type: 'textarea' },
  info_tm: { label: 'Info Turkmen', type: 'textarea' },
  tag_tm: { label: 'Tag Turkmen', type: 'text' },
  highlight_stat_tm: { label: 'Highlight Stat Turkmen', type: 'text' },

  brands: { label: 'Brands', type: 'array', itemConfig: { type: 'text' } },
};
