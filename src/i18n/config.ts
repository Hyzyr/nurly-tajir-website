export type Locale = (typeof locales)[number];

export const i18n = {
  locales: ['en', 'ru', 'tm'], // ← your supported locales
  localesThreeLetter: ['eng', 'rus', 'tkm'], // ← your supported locales
  defaultLocale: 'en', // ← your fallback locale+
  localeDetection: true,
};
export const locales = [...i18n.locales] as const;
export const defaultLocale: Locale = i18n.defaultLocale;
