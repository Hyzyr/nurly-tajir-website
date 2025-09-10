import styles from './styles.module.scss';

import React from 'react';

type ProjectCardInfo = {
  title: string;
  description: string;
  image: string;
};

const ProjectCard = ({ image, title, description }: ProjectCardInfo) => {
  return (
    <div className={styles.card}>
      <div className="ratioImage">
        <img src={image} alt="project-image" />
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__title}>
          <strong className="subtitle _lg">{title}</strong>
        </div>
        <div className={styles.card__description}>{description}</div>
      </div>
    </div>
  );
};

export type { ProjectCardInfo };
export default ProjectCard;
