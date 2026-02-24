-- Create services_section table for detailed service information with multilingual support
-- This table stores enhanced service content with separate columns per language

CREATE TABLE IF NOT EXISTS public.services_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Service identifier (e.g., "network-infrastructure", "telephone-systems")
  service_slug TEXT NOT NULL UNIQUE,
  
  -- Service tag/category in each language
  tag_en TEXT NOT NULL,
  tag_ru TEXT NOT NULL,
  tag_tm TEXT NOT NULL,
  
  -- Service title in each language
  title_en TEXT NOT NULL,
  title_ru TEXT NOT NULL,
  title_tm TEXT NOT NULL,
  
  -- Short description (Card Body - Short) in each language
  info_en TEXT NOT NULL,
  info_ru TEXT NOT NULL,
  info_tm TEXT NOT NULL,
  
  -- Long description (Card Body - Long) in each language
  description_en TEXT NOT NULL,
  description_ru TEXT NOT NULL,
  description_tm TEXT NOT NULL,
  
  -- Highlight stat/achievement in each language
  highlight_stat_en TEXT,
  highlight_stat_ru TEXT,
  highlight_stat_tm TEXT,
  
  -- Optional images and brands
  image TEXT,
  image_icon TEXT,
  brands TEXT[], -- Array of brand names
  
  -- Display order for front-end rendering
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  inserted_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_services_section_service_slug ON public.services_section(service_slug);
CREATE INDEX idx_services_section_display_order ON public.services_section(display_order);
CREATE INDEX idx_services_section_title_en ON public.services_section(title_en);
CREATE INDEX idx_services_section_title_ru ON public.services_section(title_ru);
CREATE INDEX idx_services_section_title_tm ON public.services_section(title_tm);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_services_section_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function before updates
CREATE TRIGGER trigger_update_services_section_updated_at
  BEFORE UPDATE ON public.services_section
  FOR EACH ROW
  EXECUTE FUNCTION update_services_section_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE public.services_section ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to services_section"
  ON public.services_section
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert/update/delete
-- Adjust this based on your authentication needs
CREATE POLICY "Allow authenticated users to manage services_section"
  ON public.services_section
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Add comments for documentation
COMMENT ON TABLE public.services_section IS 'Stores detailed service information with multilingual content in separate columns';
COMMENT ON COLUMN public.services_section.service_slug IS 'Unique URL-friendly identifier for the service';
COMMENT ON COLUMN public.services_section.tag_en IS 'Short tag/category label in English';
COMMENT ON COLUMN public.services_section.tag_ru IS 'Short tag/category label in Russian';
COMMENT ON COLUMN public.services_section.tag_tm IS 'Short tag/category label in Turkmen';
COMMENT ON COLUMN public.services_section.title_en IS 'Main service title in English';
COMMENT ON COLUMN public.services_section.title_ru IS 'Main service title in Russian';
COMMENT ON COLUMN public.services_section.title_tm IS 'Main service title in Turkmen';
COMMENT ON COLUMN public.services_section.info_en IS 'Brief description in English (1-2 sentences)';
COMMENT ON COLUMN public.services_section.info_ru IS 'Brief description in Russian (1-2 sentences)';
COMMENT ON COLUMN public.services_section.info_tm IS 'Brief description in Turkmen (1-2 sentences)';
COMMENT ON COLUMN public.services_section.description_en IS 'Detailed service description in English';
COMMENT ON COLUMN public.services_section.description_ru IS 'Detailed service description in Russian';
COMMENT ON COLUMN public.services_section.description_tm IS 'Detailed service description in Turkmen';
COMMENT ON COLUMN public.services_section.brands IS 'Array of brand names associated with this service';
