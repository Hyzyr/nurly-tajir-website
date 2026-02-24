import React from 'react';
import styles from './styles.module.scss';

const ProjectRowSkeleton = () => {
  return (
    <div className={styles['project-row-skeleton']}>
      <div className={styles['project-row-skeleton__image']} />
      <div className={styles['project-row-skeleton__info']}>
        <div className={styles['project-row-skeleton__badges']}>
          <div className={styles['project-row-skeleton__badge']} />
          <div className={styles['project-row-skeleton__badge']} />
          <div className={styles['project-row-skeleton__badge']} />
          <div className={styles['project-row-skeleton__badge']} />
        </div>
        <div className={styles['project-row-skeleton__title']} />
        <div className={styles['project-row-skeleton__desc']}>
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles['project-row-skeleton__meta']}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export const ProjectsListSkeleton = () => {
  return (
    <>
      <ProjectRowSkeleton />
      <ProjectRowSkeleton />
      <ProjectRowSkeleton />
    </>
  );
};

export default ProjectRowSkeleton;
