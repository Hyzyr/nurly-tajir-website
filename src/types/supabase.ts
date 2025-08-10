import { Database } from '@/utils/supabase/database.types';

type Tables = Database['public']['Tables'];

export interface Brand {
  name: string;
  link: string;
}
export type ProductCategory = Tables['product_categories']['Row'];
export type ProductCategoryInsert = Tables['product_categories']['Insert'];
export type ProductCategoryUpdate = Tables['product_categories']['Update'];

/** Row type for public.services */
export type Service = Tables['services']['Row'];
export type ServiceInsert = Tables['services']['Insert'];
export type ServiceUpdate = Tables['services']['Update'];

export type Project = Tables['projects']['Row'];
export type ProjectInsert = Tables['projects']['Insert'];
export type ProjectUpdate = Tables['projects']['Update'];
