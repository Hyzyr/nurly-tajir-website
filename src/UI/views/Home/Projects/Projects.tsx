'use client';

import ProjectsContent, { ProjectInfo } from './ProjectsContent';
import { Locales } from '@/i18n/config';
import { dbHelper } from '@/utils/supabase/helper';
import { fetchAll } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

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

  if (!data) return 'loading';
  return <ProjectsContent data={data} />;
};

export default Projects;
