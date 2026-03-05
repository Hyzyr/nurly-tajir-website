import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

const SITE_URL = 'https://nurlytajir.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/expertise', '/projects'];
  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: now,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}${page}`])
          ),
        },
      });
    }
  }

  return entries;
}
