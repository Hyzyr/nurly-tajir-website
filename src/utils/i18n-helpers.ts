/**
 * Helper utilities for working with multilingual (i18n) fields
 * Used for services_section and other tables with flat translation columns
 */

export type LocaleKey = 'en' | 'ru' | 'tm';

/**
 * Get translated value from an object with flat translation fields
 * @param obj - The object containing translation fields
 * @param fieldName - The base field name (e.g., 'title', 'tag', 'info')
 * @param locale - The locale key ('en', 'ru', or 'tm')
 * @returns The translated string, fallback to English if not found
 */
export function getTranslation<T extends Record<string, unknown>>(
  obj: T | null | undefined,
  fieldName: string,
  locale: LocaleKey
): string {
  if (!obj) return '';
  
  const key = `${fieldName}_${locale}` as keyof T;
  const fallbackKey = `${fieldName}_en` as keyof T;
  
  return (obj[key] as string) || (obj[fallbackKey] as string) || '';
}

/**
 *Get all available locales
 * @returns Array of locale keys
 */
export function getAvailableLocales(): LocaleKey[] {
  return ['en', 'ru', 'tm'];
}

/**
 * Get locale display name
 * @param locale - The locale key
 * @returns Human-readable locale name
 */
export function getLocaleName(locale: LocaleKey): string {
  const names: Record<LocaleKey, string> = {
    en: 'English',
    ru: 'Русский',
    tm: 'Türkmen',
  };
  return names[locale];
}

/**
 * Validate if a value is a valid locale key
 * @param value - The value to check
 * @returns true if valid locale key
 */
export function isValidLocale(value: string): value is LocaleKey {
  return ['en', 'ru', 'tm'].includes(value);
}

/**
 * Safely parse locale from string, with fallback
 * @param value - The value to parse
 * @param fallback - Fallback locale (default: 'en')
 * @returns Valid locale key
 */
export function parseLocale(value: string | null | undefined, fallback: LocaleKey = 'en'): LocaleKey {
  if (value && isValidLocale(value)) {
    return value;
  }
  return fallback;
}

/**
 * Check if an object has all required translations for a field
 * @param obj - The object to check
 * @param fieldName - The base field name
 * @returns true if all locales have non-empty values
 */
export function hasAllTranslations<T extends Record<string, unknown>>(
  obj: T | null | undefined,
  fieldName: string
): boolean {
  if (!obj) return false;
  
  const locales: LocaleKey[] = ['en', 'ru', 'tm'];
  return locales.every((locale) => {
    const key = `${fieldName}_${locale}` as keyof T;
    return Boolean(obj[key]);
  });
}
