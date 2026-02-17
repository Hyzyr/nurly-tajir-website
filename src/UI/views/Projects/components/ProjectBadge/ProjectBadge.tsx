import React from 'react';
import styles from './styles.module.scss';

type ProjectBadgeProps = {
  label: string;
};

const ProjectBadge = ({ label }: ProjectBadgeProps) => {
  return (
    <div className={styles['project-badge']}>
      <p className={styles['project-badge__text']}>{label}</p>
    </div>
  );
};

export default ProjectBadge;
