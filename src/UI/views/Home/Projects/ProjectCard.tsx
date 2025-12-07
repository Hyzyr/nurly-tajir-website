import styles from './styles.module.scss';

import React from 'react';

type ProjectCardInfo = {
  title: string;
  description: string;
  image: string;
};

type ProjectCardProps = ProjectCardInfo & {
  onClick?: () => void;
};

const ProjectCard = ({
  image,
  title,
  description,
  onClick,
}: ProjectCardProps) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className="ratioImage">
        <img src={image} alt="project-image" />
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__title}>
          <strong className="subtitle _lg">{title}</strong>
        </div>
        <div className={styles.card__description}>
          <p>{description}</p>
          <span className="subtitle _xxsm color-primary">read more</span>
        </div>
      </div>
    </div>
  );
};

export type { ProjectCardInfo };
export default ProjectCard;
