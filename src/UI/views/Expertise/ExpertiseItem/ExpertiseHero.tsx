import React from 'react';
import styles from './styles.module.scss';
import ExpertiseBenefitCard from './ExpertiseBenefitCard';
import Image from 'next/image';

type Props = {
  image: string;
  benefits: {
    value: string;
    label: string;
  }[];
};

const ExpertiseHero = ({ image, benefits }: Props) => {
  return (
    <div className={styles.expertise__hero}>
      <div className={styles.expertise__hero__image}>
        <Image src={image} alt="Expertise showcase" fill style={{ objectFit: 'cover' }} />
        <div className={styles.expertise__hero__overlay} />
      </div>
      <div className={styles.expertise__hero__benefits}>
        {benefits.map((benefit, index) => (
          <ExpertiseBenefitCard
            key={index}
            value={benefit.value}
            label={benefit.label}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpertiseHero;
