'use client';
import React from 'react';
import Icon from '@/UI/components/Icon';

import styles from './styles.module.scss';
import Link from 'next/link';
import { useLocale } from 'next-intl';

type ProjectButtonType = {
  text: string;
};

const ProjectButton = ({ text }: ProjectButtonType) => {
  const locale = useLocale();

  return (
    <Link href={`/${locale}/projects`} className={styles.projects__row__button}>
      <strong className="subtitle _lg">{text}</strong>
      <Icon name="arrowCorner" />
    </Link>
  );
};

export default ProjectButton;
