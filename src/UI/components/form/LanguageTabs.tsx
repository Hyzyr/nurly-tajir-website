'use client';
import React, { useImperativeHandle, useState } from 'react';
import styles from './styles.module.scss';

export type LangKey = 'en' | 'ru' | 'tk';

export type LangTabsRef = {
  /** Programmatically switch to a tab */
  switchTo: (lang: LangKey) => void;
  /** Set error messages per tab. Pass empty object or null to clear. */
  setErrors: (errors: Partial<Record<LangKey, string>>) => void;
  getActive: () => LangKey;
};

type Props = {
  /** Render function receives the currently-active language key */
  children: (lang: LangKey) => React.ReactNode;
};

const LANGS: Array<{ key: LangKey; label: string }> = [
  { key: 'en', label: 'EN' },
  { key: 'ru', label: 'RU' },
  { key: 'tk', label: 'TK' },
];

const LanguageTabs = React.forwardRef<LangTabsRef, Props>(({ children }, ref) => {
  const [active, setActive] = useState<LangKey>('en');
  const [errors, setErrorsState] = useState<Partial<Record<LangKey, string>>>({});

  useImperativeHandle(ref, () => ({
    switchTo: (lang) => setActive(lang),
    setErrors: (errs) => setErrorsState(errs ?? {}),
    getActive: () => active,
  }));

  return (
    <div className={styles.langTabs}>
      <div className={styles.langTabs__header}>
        {LANGS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={[
              styles.langTabs__tab,
              active === key ? styles.active : '',
              errors[key] ? styles.hasError : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => setActive(key)}
          >
            {label}
            {errors[key] && (
              <span className={styles.langTabs__badge} title={errors[key]}>
                !
              </span>
            )}
          </button>
        ))}
      </div>

      {errors[active] && (
        <p className={styles.langTabs__errorMsg}>{errors[active]}</p>
      )}

      <div className={styles.langTabs__body}>{children(active)}</div>
    </div>
  );
});

LanguageTabs.displayName = 'LanguageTabs';
export default LanguageTabs;
