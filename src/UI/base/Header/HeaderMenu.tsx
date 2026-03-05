'use client';
import styles from './styles.module.scss';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from '@/UI/components/Button';

import { useTranslations, useLocale } from 'next-intl';
import LangSwitch from './components/LangSwitch';
import { usePathname, useRouter } from 'next/navigation';
import { useContactModal } from '@/UI/components/ContactModal';
import useHeaderMenu from './useHeaderMenu';
import { useLenisScroll } from '@/hooks/useLenisScroll';

type Props = {
  active: boolean;
  toggle: (state?: boolean) => void;
};

const HeaderMenu = ({ active, toggle }: Props) => {
  const t = useTranslations('common');
  const locale = useLocale();
  const path = usePathname();
  const contactModal = useContactModal();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useRef(true);
  const { scrollTo } = useLenisScroll();
  const router = useRouter();

  const { initStyles, setVisible, setHidden } = useHeaderMenu({
    wrapperRef,
    bodyRef,
  });

  const isHomePage = path === `/${locale}` || path === `/${locale}/`;

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (toggle && e.target === wrapperRef.current) toggle();
  };
  const getQuoteClick = () => {
    toggle(false);
    contactModal.openModal();
  };

  const scrollToSection = (section: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    toggle(false);
    if (isHomePage) {
      setTimeout(() => scrollTo(section, { offset: -100, duration: 1.4 }), 350);
    } else {
      router.push(`/${locale}/${section}`);
    }
  };

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      initStyles();
    }
    if (active) setVisible();
    else setHidden();
  }, [active]);

  useEffect(() => {
    toggle(false);
  }, [path]);

  if (!document.getElementById('main')) return 'No Main Container';

  return createPortal(
    <div className={styles.menu} ref={wrapperRef} onClick={onClick}>
      <nav ref={bodyRef}>
        <div className={styles.menu__header}>
          <small>Menu</small>
          <LangSwitch onClick={() => toggle(false)} />
        </div>
        <div className={styles.menu__links}>
          <a href={`/${locale}`}>{t('nav.home')}</a>
          <a href={`/${locale}/projects`}>{t('nav.projects')}</a>
          <a href={`/${locale}/expertise`}>{t('nav.services')}</a>
          <a href={`/${locale}/#about-us`} onClick={scrollToSection('#about-us')}>
            {t('nav.about_us')}
          </a>
          <a href={`/${locale}/#contacts`} onClick={scrollToSection('#contacts')}>
            {t('nav.contacts')}
          </a>
        </div>
        <Button text="Get Quote" onClick={() => getQuoteClick()} />
      </nav>
    </div>,
    document.getElementById('main') as HTMLElement
  );
};

export default HeaderMenu;
