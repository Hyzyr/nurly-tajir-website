'use client';
import styles from './styles.module.scss';

import Container, { ContainerInner } from '@/UI/containers';
import ServiceCard from './ServiceCard';

import data from './data.json';
import { useState } from 'react';
import ServiceInfoCard from './ServiceInfoCard';



const Services = () => {
  const [info, setInfo] = useState(false);
  const [active, setActive] = useState(1);

  const setActiveItem = (index: number) => {
    setActive(index);
    setInfo(true);
  };

  return (
    <section className={styles.services}>
      <Container>
        <div className={styles.services__inner}>
          <ContainerInner className={styles.services__title}>
            <h3 className="h3">
              Services <br />
              <span className="color-gray">We Provide</span>
            </h3>
          </ContainerInner>
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
        </div>
      </Container>
    </section>
  );
};
export default Services;
