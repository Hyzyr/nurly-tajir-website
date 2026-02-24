'use client';

import React, { useEffect, useState } from 'react';
import ProjectRow, { ProjectRowData } from './components/ProjectRow';
import { ProjectsListSkeleton } from './components/ProjectRow/ProjectRowSkeleton';
import styles from './styles.module.scss';
import Container from '@/UI/containers';
import { fetchAll } from '@/utils/supabase/client';
import { dbHelper } from '@/utils/supabase/helper';
import { Locales } from '@/i18n/config';

type Props = {
  locale: Locales;
  onContactClick?: () => void;
};

const ProjectsList = ({ locale, onContactClick }: Props) => {
  const [projects, setProjects] = useState<ProjectRowData[] | null>(null);

  useEffect(() => {
    fetchAll('projects', { sortBy: 'inserted_at', ascending: false }).then((res) => {
      const mapped: ProjectRowData[] = res.map((project) => ({
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
              <ProjectRow
                key={index}
                project={project}
                layout={index % 2 === 0 ? 'big-left' : 'big-right'}
                onContactClick={onContactClick}
              />
            ))
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProjectsList;
