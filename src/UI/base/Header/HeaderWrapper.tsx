'use client';
import styles from './styles.module.scss';

import React, { useEffect, useRef } from 'react';
import { Observer } from 'gsap/Observer';
import gsap from 'gsap';

gsap.registerPlugin(Observer);

type Props = {
  children: React.ReactNode;
};

const SCROLL_OFFSET = 200;
const UPMOVE_OFFSET = 40;

const HeaderWrapper = ({ children }: Props) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isStickyRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > SCROLL_OFFSET && !isStickyRef.current) {
        isStickyRef.current = true;
        gsap.set(header, { y: '-100%', position: 'fixed' });
        header.classList.add('sticky');
      } else if (
        scrollY <= SCROLL_OFFSET &&
        isStickyRef.current &&
        !isVisibleRef.current
      ) {
        isStickyRef.current = false;
        header.classList.remove('sticky');

        gsap.set(header, { y: '0', position: 'absolute' });
      } else if (scrollY <= 10) {
        isStickyRef.current = false;
        isVisibleRef.current = false;
        header.classList.remove('sticky');

        gsap.set(header, { y: '0', position: 'absolute' });
      }
    };

    let isUp = false;
    let upStart = 0;

    const observer = Observer.create({
      type: 'wheel,touch,scroll',
      onUp: () => {
        if (!isUp) {
          upStart = window.scrollY;
          isUp = true;
        } else if (isUp && upStart - window.scrollY > UPMOVE_OFFSET) {
          if (isStickyRef.current && !isVisibleRef.current) {
            gsap.to(header, { y: '0%', duration: 0.7, ease: 'power2.out' });
            isVisibleRef.current = true;
          }
        }
      },
      onDown: () => {
        if (isStickyRef.current && isVisibleRef.current) {
          gsap.to(header, { y: '-100%', duration: 0.3, ease: 'power2.in' });
          isVisibleRef.current = false;
        }
        isUp = false;
      },
      tolerance: 10,
      preventDefault: false,
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.kill();
    };
  }, []);

  return (
    <>
      <div className={styles['header-space']}></div>
      <header className={styles.header} ref={headerRef}>
        {children}
      </header>
    </>
  );
};

export default HeaderWrapper;
