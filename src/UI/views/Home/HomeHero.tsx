'use client';

import React from 'react';
import Hero from '../_shared/Hero';
import { useTranslations } from 'next-intl';
import { useContactModal } from '@/UI/components/ContactModal';
import Button from '@/UI/components/Button';

export const HomeHero = () => {
  const t = useTranslations('home.hero');
  const contactModal = useContactModal();
  const contactUs = () => contactModal.openModal();

  return (
    <Hero tagline={t('tagline')} title={t('title')}>
      <Button text={t('cta')} size="lg" onClick={contactUs} />
    </Hero>
  );
};
