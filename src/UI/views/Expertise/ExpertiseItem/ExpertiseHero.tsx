import React from 'react';
import styles from './styles.module.scss';
import ExpertiseBenefitCard from './ExpertiseBenefitCard';
import Image from 'next/image';

type Props = {
  image: string;
  alt?: string;
  benefits?: {
    value: string;
    label: string;
  }[];
};

const ExpertiseHero = ({ image, alt, benefits }: Props) => {
  return (
    <div className={styles.expertise__hero}>
      <div className={styles.expertise__hero__image}>
        <Image src={image} alt={alt || 'Expertise showcase'} fill style={{ objectFit: 'cover' }} />
        <div className={styles.expertise__hero__overlay} />
      </div>
      {benefits && benefits.length > 0 && (
        <div className={styles.expertise__hero__benefits}>
          {benefits.map((benefit, index) => (
            <ExpertiseBenefitCard
              key={index}
              value={benefit.value}
              label={benefit.label}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpertiseHero;
