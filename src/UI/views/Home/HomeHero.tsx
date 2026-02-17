import React from 'react';
import Hero from '../_shared/Hero';
import { useTranslations } from 'next-intl';

export const HomeHero = () => {
  const t = useTranslations('home.hero');

  return <Hero tagline={t('tagline')} title={t('title')} />;
};
