import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
import type { Database } from '@/utils/supabase/database.types';
import { dbHelper } from '@/utils/supabase/helper';
import type { Locales } from '@/i18n/config';

// ─── Lightweight read-only Supabase client (no cookies, no auth) ───
// Safe to use at build-time and in any server component / page.

type Tables = Database['public']['Tables'];
type TableName = keyof Tables;
type Row<T extends TableName> = Tables[T]['Row'];

let _client: ReturnType<typeof createClient<Database>> | null = null;

function getReadClient() {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error(
        'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars.'
      );
    }
    _client = createClient<Database>(url, key);
  }
  return _client;
}

// ─── Generic fetch helpers ─────────────────────────────────────────

export async function fetchRows<T extends TableName>(
  table: T,
  options?: { sortBy?: keyof Row<T> & string; ascending?: boolean },
  retries = 2
): Promise<Row<T>[]> {
  const { sortBy, ascending = false } = options ?? {};
  const base = getReadClient().from(table).select<'*', Row<T>>('*');
  const query = sortBy ? base.order(sortBy, { ascending }) : base;

  try {
    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 300));
      return fetchRows(table, options, retries - 1);
    }
    throw err;
  }
}

// ─── Typed data shapes returned to client components ───────────────

export type ServiceInfo = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageIcon?: string;
};

export type Brand = { link: string; name: string };
export type ProductInfo = {
  id: string;
  brands?: Brand[];
  title: string;
  image: string;
};

export type ProjectInfo = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type ProjectSectionData = {
  title: string;
  description: string;
  image: string;
  badges: string[];
  date?: string;
  location?: string;
  client?: string;
};

export type ExpertiseItemData = {
  id: string;
  title: string;
  description: string;
  heroImage?: string;
  benefits: { value: string; label: string }[];
  images?: string[] | null;
  footerText: string;
  ctaText: string;
};

// ─── Pre-mapped server fetchers (locale-aware, cached) ─────────────
// Each fetcher is wrapped with unstable_cache so the result is stored in
// Next.js' Data Cache. The cache key includes the locale, and each table
// gets its own tag so you can do on-demand revalidation from the dashboard
// later (e.g. revalidateTag('services') after an admin edit).
//
// The revalidate time (3600 s = 1 hour) acts as a safety net; most of
// the time the static page itself is already cached via ISR.

const CACHE_TTL = 3600; // seconds

export const fetchServices = unstable_cache(
  async (locale: Locales): Promise<ServiceInfo[]> => {
    const rows = await fetchRows('services');
    return rows
      .sort((a, b) => {
        if (a.image_icon && !b.image_icon) return -1;
        if (!a.image_icon && b.image_icon) return 1;
        return 0;
      })
      .map((s) => ({
        id: s.id,
        title: s[dbHelper.getTitle(locale)],
        description: s[dbHelper.getDescription(locale)],
        image: s.image ?? '',
        imageIcon: s.image_icon ?? undefined,
      }));
  },
  ['services'],
  { revalidate: CACHE_TTL, tags: ['services'] }
);

export const fetchProducts = unstable_cache(
  async (locale: Locales): Promise<ProductInfo[]> => {
    const rows = await fetchRows('product_categories');
    return rows.map((p) => ({
      id: p.id,
      title: p[dbHelper.getName(locale)],
      brands:
        typeof p.brands === 'string'
          ? (JSON.parse(p.brands) as Brand[])
          : (p.brands as Brand[] | undefined),
      image: p.image,
    }));
  },
  ['products'],
  { revalidate: CACHE_TTL, tags: ['products'] }
);

export const fetchProjects = unstable_cache(
  async (locale: Locales): Promise<ProjectInfo[]> => {
    const rows = await fetchRows('projects');
    return rows.map((p) => ({
      id: p.id,
      title: p[dbHelper.getTitle(locale)],
      description: p[dbHelper.getDescription(locale)],
      image: p.image,
    }));
  },
  ['projects'],
  { revalidate: CACHE_TTL, tags: ['projects'] }
);

export const fetchProjectsList = unstable_cache(
  async (locale: Locales): Promise<ProjectSectionData[]> => {
    const rows = await fetchRows('projects', { sortBy: 'inserted_at', ascending: false });
    return rows.map((p) => ({
      title: p[dbHelper.getTitle(locale)],
      description: p[dbHelper.getDescription(locale)],
      image: p.image,
      badges: p.tags ?? [],
      date: p.completed_at ?? undefined,
      location: p.location ?? undefined,
      client: p.client ?? undefined,
    }));
  },
  ['projects-list'],
  { revalidate: CACHE_TTL, tags: ['projects'] }
);

export const fetchExpertise = unstable_cache(
  async (locale: Locales): Promise<ExpertiseItemData[]> => {
    const rows = await fetchRows('expertise', { sortBy: 'display_order', ascending: true });
    return rows.map((row) => {
      const highlightStat = row[dbHelper.getHighlightStat(locale)];
      const tag = row[dbHelper.getTag(locale)];
      return {
        id: row.id,
        title: row[dbHelper.getTitle(locale)],
        description: row[dbHelper.getDescription(locale)],
        heroImage: row.image ?? undefined,
        benefits: highlightStat ? [{ value: highlightStat, label: tag }] : [],
        images: row.images ?? [],
        footerText: row[dbHelper.getInfo(locale)],
        ctaText: 'Contact Us',
      };
    });
  },
  ['expertise'],
  { revalidate: CACHE_TTL, tags: ['expertise'] }
);
