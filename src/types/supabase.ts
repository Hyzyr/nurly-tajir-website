export interface Brand {
  name: string;
  link: string;
}
/** Row type for public.product_categories */
export interface ProductCategory {
  id: string; // UUID
  image: string;
  name_en: string;
  name_ru: string;
  name_tm: string;
  brands: Array<Brand>;
  inserted_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
} /** Type for inserting a new product category (id & timestamps optional) */
export type ProductCategoryInsert = {
  id?: string;
  image: string;
  name_en: string;
  name_ru: string;
  name_tm: string;
  brands: Array<{
    name: string;
    link: string;
  }>;
  inserted_at?: string;
  updated_at?: string;
};
/** Type for updating a product category (only id is required) */
export type ProductCategoryUpdate = {
  id: string;
  image?: string;
  name_en?: string;
  name_ru?: string;
  name_tm?: string;
  brands?: Array<{
    name: string;
    link: string;
  }>;
  // typically you wouldn’t set timestamps manually on update
};

/** Row type for public.services */
export interface Service {
  id: string; // UUID
  title_en: string; // English title
  title_ru: string; // Russian title
  title_tm: string; // Turkmen title
  description_en: string;
  description_ru: string;
  description_tm: string;
  image_icon: string | null;
  image: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/** Type for inserting a new service (id & timestamps optional) */
export type ServiceInsert = {
  id?: string;
  title_en: string;
  title_ru: string;
  title_tm: string;
  description_en: string;
  description_ru: string;
  description_tm: string;
  image_icon?: string | null;
  image: string;
  created_at?: string;
  updated_at?: string;
};

/** Type for updating a service (only id is required) */
export type ServiceUpdate = {
  id: string;
  title_en?: string;
  title_ru?: string;
  title_tm?: string;
  description_en?: string;
  description_ru?: string;
  description_tm?: string;
  image_icon?: string | null;
  image?: string;
  // you normally wouldn’t set timestamps manually on update
};
/** Row type for public.projects */
export interface Project {
  id: string; // UUID
  image: string;
  title_en: string;
  title_ru: string;
  title_tm: string;
  description_en: string;
  description_ru: string;
  description_tm: string;
  inserted_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}
/** Type for inserting a new project (id & timestamps optional) */
export type ProjectInsert = {
  id?: string;
  image: string;
  title_en: string;
  title_ru: string;
  title_tm: string;
  description_en: string;
  description_ru: string;
  description_tm: string;
  inserted_at?: string;
  updated_at?: string;
};
/** Type for updating a project (only id is required) */
export type ProjectUpdate = {
  id: string;
  image?: string;
  title_en?: string;
  title_ru?: string;
  title_tm?: string;
  description_en?: string;
  description_ru?: string;
  description_tm?: string;
  // usually you let the trigger handle updated_at
};
