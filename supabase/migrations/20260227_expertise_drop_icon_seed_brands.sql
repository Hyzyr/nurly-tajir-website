-- Add product images array to expertise table
-- This allows storing multiple uploaded product/service image URLs per expertise entry

ALTER TABLE public.expertise
  ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';

COMMENT ON COLUMN public.expertise.images IS 'Array of uploaded product/service image URLs for this expertise entry';


-- 1. Drop the image_icon column (not used)
ALTER TABLE public.expertise
  DROP COLUMN IF EXISTS image_icon;

-- 2. Seed brands extracted from each expertise item's description_en
UPDATE public.expertise SET brands = ARRAY['Cisco', 'TP-Link', 'Huawei']
  WHERE service_slug = 'network-infrastructure';

UPDATE public.expertise SET brands = ARRAY['Panasonic', 'Grandstream', 'Yealink']
  WHERE service_slug = 'telephone-systems';

UPDATE public.expertise SET brands = ARRAY['HP', 'Dell', 'Lenovo', 'Samsung', 'APC']
  WHERE service_slug = 'computer-it-equipment';

UPDATE public.expertise SET brands = ARRAY['Bosch', 'Honeywell', 'Notifier']
  WHERE service_slug = 'fire-detection-systems';

UPDATE public.expertise SET brands = ARRAY['Hikvision', 'Dahua', 'Bosch']
  WHERE service_slug = 'cctv-security-cameras';

UPDATE public.expertise SET brands = ARRAY['Commax', 'Panasonic', 'Hikvision']
  WHERE service_slug = 'doorbell-intercom-systems';

UPDATE public.expertise SET brands = ARRAY['Samsung', 'Philips', 'Hikvision']
  WHERE service_slug = 'video-wall-control-rooms';

UPDATE public.expertise SET brands = ARRAY['Hikvision', 'ZKTeco', 'HID']
  WHERE service_slug = 'access-control';

UPDATE public.expertise SET brands = ARRAY['Bose', 'JBL', 'Harman', 'Barco', 'Epson', 'AMX', 'Crestron']
  WHERE service_slug = 'professional-av-systems';

UPDATE public.expertise SET brands = ARRAY['BenQ', 'ViewSonic', 'SMART Board', 'Epson', 'NEC']
  WHERE service_slug = 'smart-education-solutions';

UPDATE public.expertise SET brands = ARRAY['Tuya', 'Loxone', 'Xiaomi', 'Philips Hue', 'Legrand']
  WHERE service_slug = 'smart-home-automation';

UPDATE public.expertise SET brands = ARRAY['Bosch', 'TOA', 'Honeywell']
  WHERE service_slug = 'announcement-pa-systems';

-- Verify
SELECT service_slug, brands FROM public.expertise ORDER BY display_order;
