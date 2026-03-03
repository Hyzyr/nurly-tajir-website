'use client';
import styles from './styles.module.scss';

import React, { useCallback, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import { useState } from 'react';
import ServiceInfoCard from './ServiceInfoCard';
import type { ServiceInfo } from '@/UI/fetch';

export type { ServiceInfo };

type Props = {
  data: ServiceInfo[];
};

const ServicesGrid = ({ data }: Props) => {
  const [info, setInfo] = useState(false);
  const [active, setActive] = useState(1);

  const setActiveItem = (index: number) => {
    setActive(index);
    setInfo(true);
  };

  // Preload all service images once data is loaded to prevent flash on switch
  const preloadImages = useCallback((services: ServiceInfo[]) => {
    services.forEach((s) => {
      if (s.image) {
        const img = new Image();
        img.src = `/images/website/services/${s.image}`;
      }
    });
  }, []);

  useEffect(() => {
    preloadImages(data);
  }, [data, preloadImages]);

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
