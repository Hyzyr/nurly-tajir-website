'use client'
import { useMedia } from '@/hooks/useMedia';
import React from 'react';
import ProjectsRow from './ProjectsRow';
import ProjectsSlider from './ProjectsSlider';

type Props = {
  children: React.ReactNode;
};

const ProjectsCardsWrapper = ({ children }: Props) => {
  const isMobile = useMedia('(max-width: 480px)');

  return (
    <>
      {!isMobile && <ProjectsRow>{children}</ProjectsRow>}
      {isMobile && <ProjectsSlider>{children}</ProjectsSlider>}
    </>
  );
};

export default ProjectsCardsWrapper;
