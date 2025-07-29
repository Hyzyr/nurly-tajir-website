'use client';
import React, { useState } from 'react';
import styles from '../styles.module.scss';
import Icon from '@/UI/components/Icon';
import { useLangSwitcher } from '@/hooks/useLangSwitch';
import { setUserLocale } from '@/utils/locale';

const LangSwitch = () => {
  const {
    current: locale,
    onChange,
    toThreeLetter,
    locales,
    localesThreeLetter,
  } = useLangSwitcher();
  const [active, setActive] = useState(false);

  const toggle = (state?: boolean) => {
    const newState = state !== undefined ? state : !active;
    setActive(newState);
  };

  const onOptionClick = (lang: string) => {
    onChange(lang);
    setUserLocale(lang);
    toggle(false);
  };

  return (
    <div
      className={`${styles.header__pre__drop} ${active ? 'active' : ''}`}
      onClick={() => toggle()}>
      <Icon name={'translateIcon'} className="_label" />
      <span>{toThreeLetter(locale)}</span>
      <Icon name={'arrowDownSVG'} className="_arrow" />
      <ul>
        {localesThreeLetter.map((option, index) => (
          <li key={option} onClick={() => onOptionClick(locales[index])}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LangSwitch;
