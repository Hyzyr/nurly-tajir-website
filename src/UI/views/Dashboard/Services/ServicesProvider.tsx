'use client';

import React from "react";
import { Service } from '@/types/supabase';
import { fetchAll } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import ServicesTable from './ServicesTable';

type ServiceWithID = Service & { index: number };

const ServicesProvider = () => {
  const [data, setData] = useState<ServiceWithID[] | null>(null);

  const fetchServices = React.useCallback(() => {
    fetchAll<Service>('services').then((data) => {
      const dataWithIndex = data.map((item, index) => ({
        ...item,
        index: index + 1,
      }));

      setData(dataWithIndex as ServiceWithID[]);
    });
  }, [data]);

  useEffect(() => {
    fetchServices();
  }, []);

  return <ServicesTable data={data} refetch={fetchServices} />;
};

export default ServicesProvider;
