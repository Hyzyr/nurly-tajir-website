import { locales, Locales } from '@/i18n/config';

export class dbHelper {
  static names = ['name_en', 'name_ru', 'name_tm'] as const;
  static titles = ['title_en', 'title_ru', 'title_tm'] as const;
  static descriptions = [
    'description_en',
    'description_ru',
    'description_tm',
  ] as const;

  static getName = (locale: Locales) =>
    dbHelper.names[locales.indexOf(locale)];
  static getTitle = (locale: Locales) =>
    dbHelper.titles[locales.indexOf(locale)];
  static getDescription = (locale: Locales) =>
    dbHelper.descriptions[locales.indexOf(locale)];
}

export type TitleKey = (typeof dbHelper.titles)[number];
export type DescriptionKey = (typeof dbHelper.descriptions)[number];
