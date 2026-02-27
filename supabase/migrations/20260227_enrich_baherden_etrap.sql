-- Enrich the Baherden Etrap project with missing meta fields
-- Project ID: cedf37ce-2722-4cb2-be79-de3602138ade

UPDATE public.projects
SET
  client       = 'Baherden Häkimligi',
  location     = 'Baherden',
  completed_at = '2025-06-01',
  show_in_main = true,
  tags  = ARRAY[
    'Network Infrastructure',
    'CCTV',
    'Digital Management'
  ],
  stats = ARRAY[
    'Multi-facility coverage',
    'Centralised digital management',
    'Full-district deployment'
  ]
WHERE id = 'cedf37ce-2722-4cb2-be79-de3602138ade';
