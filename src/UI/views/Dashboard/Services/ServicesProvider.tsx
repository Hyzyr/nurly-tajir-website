'use client';

import React, { useRef } from 'react';
import { Service, ServiceInsert, ServiceUpdate } from '@/types/supabase';
import { useEffect, useState } from 'react';
import ServicesTable from './ServicesTable';
import { ModalRef } from '@/UI/components/Modal/Modal';
import ServiceEditModal from './ServiceEditModal';
import { emptyService } from './constants';
import { supabase } from '@/utils/supabase/client';

type ServiceWithID = Service & { index: number };

const ServicesProvider = () => {
  const [data, setData] = useState<ServiceWithID[] | null>(null);
  const [editModalData, setEditModalData] = useState<Service | null>(null);
  const [addModalData, setAddModalData] = useState<ServiceInsert>(emptyService);
  const editModalRef = useRef<ModalRef | null>(null);
  const addModalRef = useRef<ModalRef | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const onAdd = () => {
    if (addModalRef.current) addModalRef.current.show();
    setAddModalData(emptyService);
    setEditModalData(null);
  };
  const onEdit = (data: Service) => {
    if (editModalRef.current) editModalRef.current.show();
    setEditModalData(data);
  };

  const fetchServices = React.useCallback(() => {
    setIsFetching(true);

    supabase
      .from('services')
      .select('*')
      .then(({ data, error }) => {
        if (error) throw error;
        const rows = (data ?? []) as Service[]; // rows is Service[]
        
        const dataWithIndex: ServiceWithID[] = rows.map((item, i) => ({
          ...item,
          index: i + 1,
        }));
        setIsFetching(false);
        setData(dataWithIndex);
      });
  }, [data]);

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <ServicesTable data={data} onAdd={onAdd} onEdit={onEdit} />
      {data && (
        <ServiceEditModal
          disabled={isFetching}
          ref={editModalRef}
          data={editModalData ?? null}
        />
      )}
      {data && (
        <ServiceEditModal
          disabled={isFetching}
          ref={addModalRef}
          data={addModalData as ServiceUpdate}
        />
      )}
    </>
  );
};

export default ServicesProvider;
