import { ProjectInsert } from '@/types/supabase';
import { FieldConfigMap } from '@/UI/components/form/DynamicForm';

export const projectsConfig: FieldConfigMap<ProjectInsert> = {
  title_en: { label: 'Title English', type: 'text' },
  description_en: { label: 'Description English', type: 'textarea' },
  title_ru: { label: 'Title Russian', type: 'text' },
  description_ru: { label: 'Description Russian', type: 'textarea' },
  title_tm: { label: 'Title Turkmen', type: 'text' },
  description_tm: { label: 'Description Turkmen', type: 'textarea' },
  client: { label: 'Client', type: 'text' },
  location: { label: 'Location', type: 'text' },
  completed_at: { label: 'Completed At (YYYY-MM-DD)', type: 'text' },
  show_in_main: { label: 'Show in Main Page', type: 'checkbox' },
  tags: { label: 'Tags', type: 'array', itemConfig: { type: 'text' } },
  stats: { label: 'Stats', type: 'array', itemConfig: { type: 'text' } },
};
