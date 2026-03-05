import React from 'react';
import styles from './ExpertiseItem/styles.module.scss';
import Container from '@/UI/containers';
import { ExpertiseItem } from './ExpertiseItem';
import type { ExpertiseItemData } from '@/UI/fetch';

type Props = {
  data: ExpertiseItemData[];
};

const ExpertiseList = ({ data }: Props) => {
  return (
    <section className={styles.expertise}>
      <Container>
        <div className={styles.expertise__inner}>
          {data.map((item) => (
            <ExpertiseItem key={item.id} data={item} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ExpertiseList;
