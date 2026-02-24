import { locales, Locales } from '@/i18n/config';

export class dbHelper {
  static names = ['name_en', 'name_ru', 'name_tm'] as const;
  static titles = ['title_en', 'title_ru', 'title_tm'] as const;
  static descriptions = [
    'description_en',
    'description_ru',
    'description_tm',
  ] as const;
  static infos = ['info_en', 'info_ru', 'info_tm'] as const;
  static tags = ['tag_en', 'tag_ru', 'tag_tm'] as const;
  static highlightStats = [
    'highlight_stat_en',
    'highlight_stat_ru',
    'highlight_stat_tm',
  ] as const;

  static getName = (locale: Locales) =>
    dbHelper.names[locales.indexOf(locale)];
  static getTitle = (locale: Locales) =>
    dbHelper.titles[locales.indexOf(locale)];
  static getDescription = (locale: Locales) =>
    dbHelper.descriptions[locales.indexOf(locale)];
  static getInfo = (locale: Locales) =>
    dbHelper.infos[locales.indexOf(locale)];
  static getTag = (locale: Locales) =>
    dbHelper.tags[locales.indexOf(locale)];
  static getHighlightStat = (locale: Locales) =>
    dbHelper.highlightStats[locales.indexOf(locale)];
}

export type TitleKey = (typeof dbHelper.titles)[number];
export type DescriptionKey = (typeof dbHelper.descriptions)[number];
export type InfoKey = (typeof dbHelper.infos)[number];
export type TagKey = (typeof dbHelper.tags)[number];
export type HighlightStatKey = (typeof dbHelper.highlightStats)[number];
