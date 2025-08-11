'use client';
import React from 'react';
import styles from './styles.module.scss';
import { useGsapScrollTo } from '@/hooks/useGsapScrollTo';

type Props = {
  selector: string;
  title: string;
};

const FooterLink = ({ selector, title }: Props) => {
  const scrollTo = useGsapScrollTo();

  const scrollToSection =
    (section: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      scrollTo(section, { offsetY: window!.innerHeight * 0.12 });
    };
  return (
    <a
      href={selector}
      onClick={scrollToSection(selector)}
      className={styles.footer__link}>
      {title}
    </a>
  );
};

export default FooterLink;
