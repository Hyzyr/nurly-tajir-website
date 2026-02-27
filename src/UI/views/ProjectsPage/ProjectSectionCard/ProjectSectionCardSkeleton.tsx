import React from 'react';
import styles from './skeleton.module.scss';

const ProjectSectionCardSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__image} />
      <div className={styles.skeleton__info}>
        <div className={styles.skeleton__badges}>
          <div className={styles.skeleton__badge} />
          <div className={styles.skeleton__badge} />
          <div className={styles.skeleton__badge} />
          <div className={styles.skeleton__badge} />
        </div>
        <div className={styles.skeleton__title} />
        <div className={styles.skeleton__desc}>
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.skeleton__meta}>
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
      <ProjectSectionCardSkeleton />
      <ProjectSectionCardSkeleton />
      <ProjectSectionCardSkeleton />
    </>
  );
};

export default ProjectSectionCardSkeleton;
