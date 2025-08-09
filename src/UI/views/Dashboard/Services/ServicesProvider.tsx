'use client';

import React, { useRef } from 'react';
import { Service, ServiceInsert, ServiceUpdate } from '@/types/supabase';
import { fetchAll } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import ServicesTable from './ServicesTable';
import { ModalRef } from '@/UI/components/Modal/Modal';
import ServiceEditModal from './ServiceEditModal';

type ServiceWithID = Service & { index: number };

const ServicesProvider = () => {
  const [data, setData] = useState<ServiceWithID[] | null>(null);
  const [editModalData, setEditModalData] = useState<Service | null>(null);
  const [addModalData, setAddModalData] = useState<ServiceInsert | {}>({});
  const editModalRef = useRef<ModalRef | null>(null);
  const addModalRef = useRef<ModalRef | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const onAdd = () => {
    if (addModalRef.current) addModalRef.current.show();
    setAddModalData({});
    setEditModalData(null);
  };
  const onEdit = (data: Service) => {
    if (editModalRef.current) editModalRef.current.show();
    setEditModalData(data);
  };

  const fetchServices = React.useCallback(() => {
    setIsFetching(true);

    fetchAll<Service>('services').then((data) => {
      const dataWithIndex = data.map((item, index) => ({
        ...item,
        index: index + 1,
      }));
      setIsFetching(false);
      setData(dataWithIndex as ServiceWithID[]);
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
