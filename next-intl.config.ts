// next-intl.config.js
/** @type {import('next-intl').NextIntlConfig} */

const i18n = {
  locales: ['en', 'ru', 'tm'], // ← your supported locales
  localesThreeLetter: ['eng', 'rus', 'tkm'], // ← your supported locales
  defaultLocale: 'en', // ← your fallback locale+
  localeDetection: true,
};

export default i18n;
