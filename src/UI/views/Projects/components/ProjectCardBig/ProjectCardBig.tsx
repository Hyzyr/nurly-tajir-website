import React from 'react';
import Button from '@/UI/components/Button';
import styles from './styles.module.scss';

type ProjectCardBigProps = {
  image: string;
  description: string;
  onContactClick?: () => void;
};

const ProjectCardBig = ({ image, description, onContactClick }: ProjectCardBigProps) => {
  return (
    <div className={styles['project-card-big']}>
      <div
        className={styles['project-card-big__image']}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={styles['project-card-big__content']}>
        <p className={styles['project-card-big__description']}>{description}</p>
        <Button text="Contact Us" style="outlined" size="sm" onClick={onContactClick} />
      </div>
    </div>
  );
};

export default ProjectCardBig;
