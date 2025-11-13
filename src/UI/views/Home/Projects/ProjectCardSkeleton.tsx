'use client';
import styles from './styles.module.scss';
import React from 'react';

const ProjectCardSkeleton = () => {
  return (
    <div className={`${styles.card} ${styles.skeleton}`}>
      <div className="ratioImage">
        <div className={styles.skeleton__image} />
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__title}>
          <div className={styles.skeleton__title} />
        </div>
        <div className={styles.card__description}>
          <div className={styles.skeleton__descLine} />
          <div className={styles.skeleton__descLine} />
          <div className={styles.skeleton__descLine} />
        </div>
      </div>
    </div>
  );
};

const ProjectButtonSkeleton = () => {
  return (
    <div className={`${styles.projects__row__button} ${styles.skeleton}`}>
      <div className={styles.skeleton__buttonText} />
      <div className={styles.skeleton__buttonIcon} />
    </div>
  );
};

export const ProjectsRowSkeleton = () => {
  return (
    <div className={styles.projects__row}>
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectButtonSkeleton />
    </div>
  );
};

export const ProjectsSliderSkeleton = () => {
  return (
    <div className={styles.slider}>
      <div className={styles.slider__container}>
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectButtonSkeleton />
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;