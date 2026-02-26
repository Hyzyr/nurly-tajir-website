'use client';

import React, { useRef } from 'react';
import { ServiceSection } from '@/types/supabase';
import { useEffect, useState } from 'react';
import ExpertiseTable from './ExpertiseTable';
import { ModalRef } from '@/UI/components/Modal/Modal';
import ExpertiseEditModal from './ExpertiseEditModal';
import ExpertiseCreateModal from './ExpertiseCreateModal';
import { supabase } from '@/utils/supabase/client';

type ExpertiseWithID = ServiceSection & { index: number };

const ExpertiseProvider = () => {
  const [data, setData] = useState<ExpertiseWithID[] | null>(null);
  const [editModalData, setEditModalData] = useState<ServiceSection | null>(null);
  const editModalRef = useRef<ModalRef | null>(null);
  const addModalRef = useRef<ModalRef | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const onAdd = () => {
    if (addModalRef.current) addModalRef.current.show();
    setEditModalData(null);
  };

  const onEdit = (item: ServiceSection) => {
    if (editModalRef.current) editModalRef.current.show();
    setEditModalData(item);
  };

  const fetchExpertise = React.useCallback(() => {
    setIsFetching(true);

    supabase
      .from('services_section')
      .select('*')
      .order('display_order', { ascending: true })
      .then(({ data, error }) => {
        if (error) throw error;
        const rows = (data ?? []) as ServiceSection[];
        const dataWithIndex: ExpertiseWithID[] = rows.map((item, i) => ({
          ...item,
          index: i + 1,
        }));
        setIsFetching(false);
        setData(dataWithIndex);
      });
  }, []);

  useEffect(() => {
    fetchExpertise();
  }, []);

  return (
    <>
      <ExpertiseTable data={data} onAdd={onAdd} onEdit={onEdit} />
      {data && (
        <ExpertiseEditModal
          disabled={isFetching}
          ref={editModalRef}
          data={editModalData ?? null}
          onRefresh={fetchExpertise}
        />
      )}
      {data && (
        <ExpertiseCreateModal
          disabled={isFetching}
          ref={addModalRef}
          onRefresh={fetchExpertise}
        />
      )}
    </>
  );
};

export default ExpertiseProvider;
