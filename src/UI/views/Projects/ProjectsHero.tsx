'use client';

import React from 'react';
import Hero from '../_shared/Hero';
import { useTranslations } from 'next-intl';
import Button from '@/UI/components/Button';
import { useContactModal } from '@/UI/components/ContactModal';

export const ProjectsHero = () => {
  const t = useTranslations('projects.hero');
  const contactModal = useContactModal();
  const contactUs = () => contactModal.openModal();

  return (
    <Hero tagline={t('tagline')} title={t('title')} minHeight={350} bgFixed>
      <Button
        style="outlined"
        icon="arrowCorner"
        iconRight
        text={t('cta')}
        size="lg"
        onClick={contactUs}
      />
    </Hero>
  );
};
