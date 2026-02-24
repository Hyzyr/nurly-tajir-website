import React from 'react';
import styles from './styles.module.scss';

type Props = {
  value: string;
  label: string;
};

const ExpertiseBenefitCard = ({ value, label }: Props) => {
  return (
    <div className={styles.expertise__benefit}>
      <div className={styles.expertise__benefit__value}>
        <p className={`subtitle ${styles.expertise__benefit__text}`}>{value}</p>
      </div>
      <p className={styles.expertise__benefit__label}>{label}</p>
    </div>
  );
};

export default ExpertiseBenefitCard;
