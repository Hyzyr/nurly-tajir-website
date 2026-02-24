-- Public read + authenticated write policies for all tables

-- ─── services ────────────────────────────────────────────────
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on services" ON public.services;
CREATE POLICY "Allow public read on services"
  ON public.services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow auth write on services" ON public.services;
CREATE POLICY "Allow auth write on services"
  ON public.services FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ─── services_section ────────────────────────────────────────
ALTER TABLE public.services_section ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on services_section" ON public.services_section;
CREATE POLICY "Allow public read on services_section"
  ON public.services_section FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow auth write on services_section" ON public.services_section;
CREATE POLICY "Allow auth write on services_section"
  ON public.services_section FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ─── projects ────────────────────────────────────────────────
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on projects" ON public.projects;
CREATE POLICY "Allow public read on projects"
  ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow auth write on projects" ON public.projects;
CREATE POLICY "Allow auth write on projects"
  ON public.projects FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ─── product_categories ──────────────────────────────────────
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on product_categories" ON public.product_categories;
CREATE POLICY "Allow public read on product_categories"
  ON public.product_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow auth write on product_categories" ON public.product_categories;
CREATE POLICY "Allow auth write on product_categories"
  ON public.product_categories FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ─── products ────────────────────────────────────────────────
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on products" ON public.products;
CREATE POLICY "Allow public read on products"
  ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow auth write on products" ON public.products;
CREATE POLICY "Allow auth write on products"
  ON public.products FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');