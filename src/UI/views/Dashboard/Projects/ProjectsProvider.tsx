'use client';

import { Project } from '@/types/supabase';
import { fetchAll } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import ProjectsTable from './ProjectsTable';

type ProjectWithID = Project & { index: number };

const ProjectsProvider = () => {
  const [data, setData] = useState<ProjectWithID[] | null>(null);

  useEffect(() => {
    fetchAll('projects').then((data) => {
      const dataWithIndex = data.map((item, index) => ({
        ...item,
        index: index + 1,
      }));

      setData(dataWithIndex as ProjectWithID[]);
    });
  }, []);
  return <ProjectsTable data={data} />;
};

export default ProjectsProvider;
