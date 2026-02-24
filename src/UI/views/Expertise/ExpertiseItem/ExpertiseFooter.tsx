import React from 'react';
import styles from './styles.module.scss';
import Button from '@/UI/components/Button';

type Props = {
  text: string;
  ctaText: string;
};

const ExpertiseFooter = ({ text, ctaText }: Props) => {
  return (
    <div className={styles.expertise__footer}>
      <p className={styles.expertise__footer__text}>{text}</p>
      <Button text={ctaText} style="outlined" size="md" icon="arrowCorner" iconRight />
    </div>
  );
};

export default ExpertiseFooter;
