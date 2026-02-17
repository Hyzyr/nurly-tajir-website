import React from 'react';
import styles from './styles.module.scss';

type ProjectCardProps = {
  title: string;
  description: string;
};

const ProjectCard = ({ title, description }: ProjectCardProps) => {
  return (
    <div className={styles['project-card']}>
      <div className={styles['project-card__wrapper']}>
        <h4 className={styles['project-card__title']}>{title}</h4>
        <div className={styles['project-card__description']}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
