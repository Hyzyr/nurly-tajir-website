-- Seed / upsert data for public.projects
-- Run this AFTER 20260224_upgrade_projects_table.sql

-- ─────────────────────────────────────────────────────────────
-- PROJECT 1 — Parahat-7 Secondary School
-- ─────────────────────────────────────────────────────────────
UPDATE public.projects SET
  title_ru       = 'Средняя школа Парахат-7',
  title_tm       = 'Parahat-7 Orta mekdebi',
  description_en = 'Executed a full-scale technology rollout including campus-wide networking, intelligent surveillance, IP telephony, and automated bell management — creating a safer and more connected learning environment.',
  description_ru = 'Реализовано комплексное технологическое внедрение: сети по всей территории, интеллектуальное видеонаблюдение, IP-телефония и автоматизированная система звонков.',
  description_tm = 'Ähli kampusy gurşap alýan torlar, akylly gözegçilik, IP telefon we awtomatlaşdyrylan jaň ulgamy bilen doly tehnologik çözgüt ornaşdyryldy.',
  client         = 'Aga gurluşyk',
  tags           = ARRAY['CCTV', 'Network Infrastructure', 'IP Telephony', 'Smart Bell System'],
  stats          = ARRAY['180+ cameras', '2,500+ students supported', '99.9% network uptime'],
  location       = 'Ashgabat',
  completed_at   = '2025-09-01',
  show_in_main   = true,
  updated_at     = NOW()
WHERE title_en = 'Parahat-7 Secondary School';

INSERT INTO public.projects (title_en, title_ru, title_tm, description_en, description_ru, description_tm, image, client, tags, stats, location, completed_at, show_in_main)
SELECT
  'Parahat-7 Secondary School',
  'Средняя школа Парахат-7',
  'Parahat-7 Orta mekdebi',
  'Executed a full-scale technology rollout including campus-wide networking, intelligent surveillance, IP telephony, and automated bell management — creating a safer and more connected learning environment.',
  'Реализовано комплексное технологическое внедрение: сети по всей территории, интеллектуальное видеонаблюдение, IP-телефония и автоматизированная система звонков.',
  'Ähli kampusy gurşap alýan torlar, akylly gözegçilik, IP telefon we awtomatlaşdyrylan jaň ulgamy bilen doly tehnologik çözgüt ornaşdyryldy.',
  '/images/projects/project-1.avif',
  'Aga gurluşyk',
  ARRAY['CCTV', 'Network Infrastructure', 'IP Telephony', 'Smart Bell System'],
  ARRAY['180+ cameras', '2,500+ students supported', '99.9% network uptime'],
  'Ashgabat',
  '2025-09-01',
  true
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title_en = 'Parahat-7 Secondary School');

-- ─────────────────────────────────────────────────────────────
-- PROJECT 2 — Turkmen State Energy Institute
-- ─────────────────────────────────────────────────────────────
UPDATE public.projects SET
  title_ru       = 'Туркменский государственный энергетический институт',
  title_tm       = 'Türkmen Döwlet Energetika Instituty',
  description_en = 'Built a resilient digital backbone supporting thousands of users with high-speed connectivity, centralized monitoring, and advanced security architecture.',
  description_ru = 'Создана устойчивая цифровая инфраструктура с высокоскоростным подключением, централизованным мониторингом и усиленной безопасностью.',
  description_tm = 'Ýokary tizlikli baglanyşyk, merkezleşdirilen gözegçilik we güýçlendirilen howpsuzlyk bilen durnukly sanly infrastruktura guruldy.',
  client         = 'Röwşen aýakgap',
  tags           = ARRAY['CCTV', 'Network Systems', 'Unified Communications'],
  stats          = ARRAY['320+ cameras', '5,000+ users', 'Enterprise core network'],
  location       = 'Mary',
  completed_at   = '2025-09-01',
  show_in_main   = true,
  updated_at     = NOW()
WHERE title_en = 'Turkmen State Energy Institute';

INSERT INTO public.projects (title_en, title_ru, title_tm, description_en, description_ru, description_tm, image, client, tags, stats, location, completed_at, show_in_main)
SELECT
  'Turkmen State Energy Institute',
  'Туркменский государственный энергетический институт',
  'Türkmen Döwlet Energetika Instituty',
  'Built a resilient digital backbone supporting thousands of users with high-speed connectivity, centralized monitoring, and advanced security architecture.',
  'Создана устойчивая цифровая инфраструктура с высокоскоростным подключением, централизованным мониторингом и усиленной безопасностью.',
  'Ýokary tizlikli baglanyşyk, merkezleşdirilen gözegçilik we güýçlendirilen howpsuzlyk bilen durnukly sanly infrastruktura guruldy.',
  '/images/projects/project-2.avif',
  'Röwşen aýakgap',
  ARRAY['CCTV', 'Network Systems', 'Unified Communications'],
  ARRAY['320+ cameras', '5,000+ users', 'Enterprise core network'],
  'Mary',
  '2025-09-01',
  true
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title_en = 'Turkmen State Energy Institute');

-- ─────────────────────────────────────────────────────────────
-- PROJECT 3 — Altyn Halka
-- ─────────────────────────────────────────────────────────────
UPDATE public.projects SET
  title_ru       = 'Altyn Halka',
  title_tm       = 'Altyn Halka',
  description_en = 'Delivered a fully integrated enterprise ecosystem combining networking, telephony, surveillance, computing infrastructure, access control, and a high-impact video wall — enabling faster decisions and smarter operations.',
  description_ru = 'Реализована полностью интегрированная корпоративная экосистема: сети, телефония, видеонаблюдение, компьютерная инфраструктура, контроль доступа и видеостена.',
  description_tm = 'Tor, telefon, gözegçilik, kompýuter infrastruktura, giriş gözegçiligi we wideo diwar bilen doly integrirlenen korporatiw ekoulgam döredildi.',
  client         = 'Aga gurluşyk',
  tags           = ARRAY['Enterprise Network', 'CCTV', 'Computers', 'Access Control', 'Video Wall', 'IP Telephony'],
  stats          = ARRAY['500+ devices', 'Multi-floor coverage', '24/7 monitoring'],
  location       = 'Ashgabat',
  completed_at   = '2025-12-01',
  show_in_main   = true,
  updated_at     = NOW()
WHERE title_en = 'Altyn Halka';

INSERT INTO public.projects (title_en, title_ru, title_tm, description_en, description_ru, description_tm, image, client, tags, stats, location, completed_at, show_in_main)
SELECT
  'Altyn Halka',
  'Altyn Halka',
  'Altyn Halka',
  'Delivered a fully integrated enterprise ecosystem combining networking, telephony, surveillance, computing infrastructure, access control, and a high-impact video wall — enabling faster decisions and smarter operations.',
  'Реализована полностью интегрированная корпоративная экосистема: сети, телефония, видеонаблюдение, компьютерная инфраструктура, контроль доступа и видеостена.',
  'Tor, telefon, gözegçilik, kompýuter infrastruktura, giriş gözegçiligi we wideo diwar bilen doly integrirlenen korporatiw ekoulgam döredildi.',
  '/images/projects/project-3.avif',
  'Aga gurluşyk',
  ARRAY['Enterprise Network', 'CCTV', 'Computers', 'Access Control', 'Video Wall', 'IP Telephony'],
  ARRAY['500+ devices', 'Multi-floor coverage', '24/7 monitoring'],
  'Ashgabat',
  '2025-12-01',
  true
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title_en = 'Altyn Halka');

-- ─────────────────────────────────────────────────────────────
-- PROJECT 4 — Parahat-7 Kindergarten
-- ─────────────────────────────────────────────────────────────
UPDATE public.projects SET
  title_ru       = 'Детский сад Парахат-7',
  title_tm       = 'Parahat-7 Çagalar bakja-bagy',
  description_en = 'Implemented a safe and secure digital infrastructure for early childhood education, including campus-wide networking, intelligent surveillance, and automated bell systems.',
  description_ru = 'Внедрение безопасной цифровой инфраструктуры: сети, интеллектуальное наблюдение и автоматические системы звонков.',
  description_tm = 'Çagalar bakja-bagy üçin ygtybarly sanly düzümi: torlar, akylly gözegçilik we awtomatlaşdyrylan jaň ulgamy ornaşdyryldy.',
  client         = 'Aga gurluşyk',
  tags           = ARRAY['CCTV', 'Network Infrastructure', 'IP Telephony', 'Smart Bell System'],
  stats          = ARRAY['50+ cameras', '600+ children supported', '100% security coverage'],
  location       = 'Ashgabat',
  completed_at   = '2025-09-01',
  show_in_main   = true,
  updated_at     = NOW()
WHERE title_en = 'Parahat-7 Kindergarten';

INSERT INTO public.projects (title_en, title_ru, title_tm, description_en, description_ru, description_tm, image, client, tags, stats, location, completed_at, show_in_main)
SELECT
  'Parahat-7 Kindergarten',
  'Детский сад Парахат-7',
  'Parahat-7 Çagalar bakja-bagy',
  'Implemented a safe and secure digital infrastructure for early childhood education, including campus-wide networking, intelligent surveillance, and automated bell systems.',
  'Внедрение безопасной цифровой инфраструктуры: сети, интеллектуальное наблюдение и автоматические системы звонков.',
  'Çagalar bakja-bagy üçin ygtybarly sanly düzümi: torlar, akylly gözegçilik we awtomatlaşdyrylan jaň ulgamy ornaşdyryldy.',
  '/images/projects/project-4.avif',
  'Aga gurluşyk',
  ARRAY['CCTV', 'Network Infrastructure', 'IP Telephony', 'Smart Bell System'],
  ARRAY['50+ cameras', '600+ children supported', '100% security coverage'],
  'Ashgabat',
  '2025-09-01',
  true
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title_en = 'Parahat-7 Kindergarten');

-- ─────────────────────────────────────────────────────────────
-- PROJECT 5 — Baherden Fayans
-- ─────────────────────────────────────────────────────────────
UPDATE public.projects SET
  title_ru       = 'Бахерден Фаянс',
  title_tm       = 'Baherden Faýans',
  description_en = 'Integrated high-tech safety and communication systems including fire alarms, secure access control, and an enterprise-grade network to streamline industrial operations.',
  description_ru = 'Интегрированные высокотехнологичные системы безопасности и связи: пожарная сигнализация, контроль доступа и корпоративная сеть.',
  description_tm = 'Ýokary tehnologiýaly howpsuzlyk we aragatnaşyk ulgamlary: ýangyn duýduryşy, geçiş gözegçiligi we tor ulgamy ornaşdyryldy.',
  client         = 'Baherden Factory',
  tags           = ARRAY['Fire Service', 'Access Control', 'Camera Security', 'Network System', 'Announcement System'],
  stats          = ARRAY['Industrial-grade security', '5-system integration', '24/7 reliability'],
  location       = 'Baherden',
  completed_at   = '2025-03-01',
  show_in_main   = true,
  updated_at     = NOW()
WHERE title_en = 'Baherden Fayans';

INSERT INTO public.projects (title_en, title_ru, title_tm, description_en, description_ru, description_tm, image, client, tags, stats, location, completed_at, show_in_main)
SELECT
  'Baherden Fayans',
  'Бахерден Фаянс',
  'Baherden Faýans',
  'Integrated high-tech safety and communication systems including fire alarms, secure access control, and an enterprise-grade network to streamline industrial operations.',
  'Интегрированные высокотехнологичные системы безопасности и связи: пожарная сигнализация, контроль доступа и корпоративная сеть.',
  'Ýokary tehnologiýaly howpsuzlyk we aragatnaşyk ulgamlary: ýangyn duýduryşy, geçiş gözegçiligi we tor ulgamy ornaşdyryldy.',
  '/images/projects/project-5.avif',
  'Baherden Factory',
  ARRAY['Fire Service', 'Access Control', 'Camera Security', 'Network System', 'Announcement System'],
  ARRAY['Industrial-grade security', '5-system integration', '24/7 reliability'],
  'Baherden',
  '2025-03-01',
  true
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title_en = 'Baherden Fayans');

-- ─────────────────────────────────────────────────────────────
-- Verify
-- ─────────────────────────────────────────────────────────────
SELECT title_en, client, location, completed_at, show_in_main, array_length(tags, 1) AS tag_count
FROM public.projects
ORDER BY completed_at;
