'use client';
import styles from './styles.module.scss';

import Container from '@/UI/containers';
import ServiceCard from './ServiceCard';

import data from './data.json';
import { useState } from 'react';
import ServiceInfoCard from './ServiceInfoCard';

type Props = {};

const Services = (props: Props) => {
  const [active, setActive] = useState(1);

  return (
    <section className={styles.services}>
      <Container>
        <div className={styles.services__inner}>
          <div className={styles.services__title}>
            <h3 className="h3">
              Services <br />
              <span className="color-gray">We Provide</span>
            </h3>
          </div>
          <div className={styles.grid}>
            <div className={styles.grid__tabs}>
              {data.map((service, index) => (
                <ServiceCard
                  key={index}
                  active={index === active}
                  title={service.title}
                  imageIcon={service.imageIcon}
                  onClick={() => setActive(index)}
                />
              ))}
            </div>
            <ServiceInfoCard
              key={`card-${active}`}
              className={styles.grid__info}
              {...data[active]}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
export default Services;
