'use client';

import React, { useRef } from 'react';
import { Project } from '@/types/supabase';
import { useEffect, useState } from 'react';
import ProjectsTable from './ProjectsTable';
import { ModalRef } from '@/UI/components/Modal/Modal';
import ProjectsEditModal from './ProjectsEditModal';
import ProjectCreateModal from './ProjectCreateModal';
import { supabase } from '@/utils/supabase/client';

type ProjectWithID = Project & { index: number };

const ProjectsProvider = () => {
  const [data, setData] = useState<ProjectWithID[] | null>(null);
  const [editModalData, setEditModalData] = useState<Project | null>(null);
  const editModalRef = useRef<ModalRef | null>(null);
  const addModalRef = useRef<ModalRef | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const onAdd = () => {
    if (addModalRef.current) addModalRef.current.show();
    setEditModalData(null);
  };

  const onEdit = (data: Project) => {
    if (editModalRef.current) editModalRef.current.show();
    setEditModalData(data);
  };

  const fetchProjects = React.useCallback(() => {
    setIsFetching(true);

    supabase
      .from('projects')
      .select('*')
      .then(({ data, error }) => {
        if (error) throw error;
        const rows = (data ?? []) as Project[];
        
        const dataWithIndex: ProjectWithID[] = rows.map((item, i) => ({
          ...item,
          index: i + 1,
        }));
        setIsFetching(false);
        setData(dataWithIndex);
      });
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <ProjectsTable data={data} onAdd={onAdd} onEdit={onEdit} />
      {data && (
        <ProjectsEditModal
          disabled={isFetching}
          ref={editModalRef}
          data={editModalData ?? null}
          onRefresh={fetchProjects}
        />
      )}
      {data && (
        <ProjectCreateModal
          disabled={isFetching}
          ref={addModalRef}
          onRefresh={fetchProjects}
        />
      )}
    </>
  );
};

export default ProjectsProvider;
