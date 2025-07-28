'use client';
import { useMedia } from '@/hooks/useMedia';
import React from 'react';
import ProjectsRow from './ProjectsRow';
import ProjectsSlider from './ProjectsSlider';

type Props = {
  messages?: Record<string, string>;
  children: React.ReactNode;
};

const ProjectsCardsWrapper = ({ messages, children }: Props) => {
  const isMobile = useMedia('(max-width: 480px)');

  return (
    <>
      {messages?.test && <h1>{messages?.test}</h1>}
      {!isMobile && <ProjectsRow>{children}</ProjectsRow>}
      {isMobile && <ProjectsSlider>{children}</ProjectsSlider>}
    </>
  );
};

export default ProjectsCardsWrapper;
