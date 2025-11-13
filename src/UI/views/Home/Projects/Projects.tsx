'use client';

import ProjectsContent, { ProjectInfo } from './ProjectsContent';
import { Locales } from '@/i18n/config';
import { dbHelper } from '@/utils/supabase/helper';
import { fetchAll } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { ProjectsRowSkeleton } from './ProjectCardSkeleton';
import styles from './styles.module.scss';
import Container from '@/UI/containers';
const Projects = ({ locale }: { locale: Locales }) => {
  const [data, setData] = useState<ProjectInfo[] | null>(null);

  useEffect(() => {
    fetchAll('projects').then((res) => {
      const projectsData: ProjectInfo[] | null = res
        ? res.map((project) => ({
            id: project.id,
            title: project[dbHelper.getTitle(locale)],
            description: project[dbHelper.getDescription(locale)],
            image: project.image,
          }))
        : null;
      setData(projectsData);
    });
  }, [locale]);

 if (!data) {
    return (
      <section className={styles.projects} id="projects">
        <Container>
          <div className={styles.projects__inner}>
            <small> </small> {/* Subtitle placeholder */}
            <ProjectsRowSkeleton />
          </div>
        </Container>
      </section>
    );
  }
  return <ProjectsContent data={data} />;
};

export default Projects;
