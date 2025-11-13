'use client';
import styles from './styles.module.scss';

import React, { useEffect } from 'react';
import ServiceCard from './ServiceCard';
import { useState } from 'react';
import ServiceInfoCard from './ServiceInfoCard';
import { fetchAll } from '@/utils/supabase/client';
import { useLocale } from 'next-intl';
import { dbHelper } from '@/utils/supabase/helper';
import  { ServicesGridSkeleton } from './ServiceCardSkeleton';

export type ServiceInfo = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageIcon?: string;
};

const ServicesGrid = () => {
  const [data, setData] = useState<ServiceInfo[] | null>(null);
  const [info, setInfo] = useState(false);
  const [active, setActive] = useState(1);
  const locale = useLocale();

  const setActiveItem = (index: number) => {
    setActive(index);
    setInfo(true);
  };

  useEffect(() => {
    fetchAll('services').then((data) => {
      if (!data) return;
      const services = data
        .sort((a, b) => {
          if (a.image_icon && !b.image_icon) return -1; // a goes before b
          if (!a.image_icon && b.image_icon) return 1; // b goes before a
          return 0; // leave order unchanged if both have or both don't have
        })
        .map(
          (service) =>
            ({
              id: service.id,
              title: service[dbHelper.getTitle(locale)],
              description: service[dbHelper.getDescription(locale)],
              imageIcon: service.image_icon,
              image: service.image,
            } as ServiceInfo)
        );

      setData(services);
    });
  }, [locale]);

 if (!data) {
  return <ServicesGridSkeleton />;
}
  return (
    <div className={styles.grid}>
      <div className={styles.grid__tabs}>
        {data.map((service, index) => (
          <ServiceCard
            key={service.id}
            active={index === active}
            title={service.title}
            imageIcon={service.imageIcon}
            onClick={() => setActiveItem(index)}
          />
        ))}
      </div>
      <ServiceInfoCard
        key={`card-${active}`}
        className={`${styles.grid__info} ${info ? 'active' : ''}`}
        {...data[active]}
        onBackClick={() => setInfo(false)}
      />
    </div>
  );
};

export default ServicesGrid;
