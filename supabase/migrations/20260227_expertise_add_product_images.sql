-- Add product images array to expertise table
-- This allows storing multiple uploaded product/service image URLs per expertise entry

ALTER TABLE public.expertise
  ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';

COMMENT ON COLUMN public.expertise.images IS 'Array of uploaded product/service image URLs for this expertise entry';
