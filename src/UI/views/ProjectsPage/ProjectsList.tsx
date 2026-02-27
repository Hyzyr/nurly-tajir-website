'use client';

import React, { useEffect, useState } from 'react';
import { ProjectSectionCard, ProjectSectionCardData, ProjectsListSkeleton } from './ProjectSectionCard';
import styles from './styles.module.scss';
import Container from '@/UI/containers';
import { fetchAll } from '@/utils/supabase/client';
import { dbHelper } from '@/utils/supabase/helper';
import { Locales } from '@/i18n/config';

type Props = {
  locale: Locales;
};

const ProjectsList = ({ locale }: Props) => {
  const [projects, setProjects] = useState<ProjectSectionCardData[] | null>(null);

  useEffect(() => {
    fetchAll('projects', { sortBy: 'inserted_at', ascending: false }).then((res) => {
      const mapped: ProjectSectionCardData[] = res.map((project) => ({
        title: project[dbHelper.getTitle(locale)],
        description: project[dbHelper.getDescription(locale)],
        image: project.image,
        badges: project.tags ?? [],
        date: project.completed_at ?? undefined,
        location: project.location ?? undefined,
        client: project.client ?? undefined,
      }));
      setProjects(mapped);
    });
  }, [locale]);

  return (
    <div className={styles.projects}>
      <Container>
        <div className={styles.projects__inner}>
          {projects === null ? (
            <ProjectsListSkeleton />
          ) : (
            projects.map((project, index) => (
              <ProjectSectionCard
                key={index}
                project={project}
                layout={index % 2 === 0 ? 'big-left' : 'big-right'}
              />
            ))
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProjectsList;
