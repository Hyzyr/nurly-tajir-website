'use client';
import styles from './styles.module.scss';

import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from '@/UI/components/Button';

import gsap from 'gsap';
import { useTranslations } from 'next-intl';

type Props = {
  active: boolean;
  toggle: () => void;
};

const HeaderMenu = ({ active, toggle }: Props) => {
  const t = useTranslations('common');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useRef(true);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (toggle && e.target === wrapperRef.current) toggle();
  };

  const initStyles = () => {
    const wrapper = wrapperRef.current;
    const body = bodyRef.current;

    if (!wrapper || !body) return;
    gsap.set(wrapper, {
      left: `200%`,
      opacity: 0,
      pointerEvents: 'none',
    });
    gsap.set(body, {
      opacity: 0,
      y: 30,
    });
  };
  const setVisible = () => {
    const wrapper = wrapperRef.current;
    const body = bodyRef.current;

    if (!wrapper || !body) return;
    gsap.set(wrapper, {
      left: `0`,
      y: 30,
      pointerEvents: 'all',
    });
    gsap.to(wrapper, {
      opacity: 1,
      duration: 0.3,
    });
    gsap.to(body, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: 0.25,
    });
  };
  const setHidden = () => {
    const wrapper = wrapperRef.current;
    const body = bodyRef.current;

    if (!wrapper || !body) return;

    gsap.to(body, {
      opacity: 0,
      y: 30,
      duration: 0.23,
    });
    gsap.to(wrapper, {
      opacity: 0,
      duration: 0.3,
      delay: 0.2,

      onComplete: () => {
        gsap.set(wrapper, {
          left: `200%`,
          opacity: 0,
          pointerEvents: 'none',
        });
      },
    });
  };

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      initStyles();
    }
    if (active) setVisible();
    else setHidden();
  }, [active]);

  return createPortal(
    <div className={styles.menu} ref={wrapperRef} onClick={onClick}>
      <nav ref={bodyRef}>
        <small>Menu</small>
        <div className={styles.menu__links}>
          <Link href={'#projects'}>{t('nav.projects')}</Link>
          <Link href={'#services'}>{t('nav.services')}</Link>
          <Link href={'#products'}>{t('nav.products')}</Link>
          <Link href={'#about-us'}>{t('nav.about_us')}</Link>
          <Link href={'#contacts'}>{t('nav.contacts')}</Link>
        </div>
        <Button text="Get Quote" />
      </nav>
    </div>,
    document.getElementById('main') as HTMLElement
  );
};

export default HeaderMenu;
