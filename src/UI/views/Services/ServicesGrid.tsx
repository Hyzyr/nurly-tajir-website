'use client';
import styles from './styles.module.scss';

import React from 'react';
import ServiceCard from './ServiceCard';

import data from './data.json';
import { useState } from 'react';
import ServiceInfoCard from './ServiceInfoCard';

const ServicesGrid = () => {
  const [info, setInfo] = useState(false);
  const [active, setActive] = useState(1);

  const setActiveItem = (index: number) => {
    setActive(index);
    setInfo(true);
  };
  
  return (
    <div className={styles.grid}>
      <div className={styles.grid__tabs}>
        {data.map((service, index) => (
          <ServiceCard
            key={index}
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
