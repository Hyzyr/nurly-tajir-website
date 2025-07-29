import { useLocale } from 'next-intl';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import i18n from '../../next-intl.config';
import React from 'react';

type Locale = (typeof i18n.locales)[number];
type LocaleThreeLetter = (typeof i18n.localesThreeLetter)[number];

export function useLangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const current = useLocale();

  const onChange = (newLocale: Locale) => {
    const suffix = search ? `?${search}` : '';
    // replace the locale prefix
    const rest = pathname.replace(/^\/[a-z]{2}/, '');
    router.push(`/${newLocale}${rest}${suffix}`);
  };
  const toThreeLetter = (newLocale: Locale): LocaleThreeLetter => {
    let index = i18n.locales.indexOf(newLocale);
    return i18n.localesThreeLetter[index];
  };
  const toTwoLetter = (newLocale: LocaleThreeLetter): Locale => {
    let index = i18n.localesThreeLetter.indexOf(newLocale);
    return i18n.locales[index];
  };

  React.useEffect(() => {
    console.log({ current });
  }, [current]);

  return {
    current,
    locales: i18n.locales,
    localesThreeLetter: i18n.localesThreeLetter,
    onChange,
    toThreeLetter,
    toTwoLetter,
  };
}
