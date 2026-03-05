'use client';
import styles from './styles.module.scss';

import React from 'react';
import { useMedia } from '@/hooks/useMedia';

type ProjectCardInfo = {
  title: string;
  description: string;
  image: string;
};

type ProjectCardProps = ProjectCardInfo & {
  onClick?: () => void;
};

const ProjectCard = ({ image, title, description, onClick }: ProjectCardProps) => {
  const isMobile = useMedia('(max-width: 768px)');

  return (
    <div className={styles.card} onClick={!isMobile ? onClick : undefined}>
      {/* Clickable overlay to capture clicks above pointer-events:none images */}
      {!isMobile && (
        <div
          className={styles.card__overlay}
          role="button"
          tabIndex={0}
          aria-label={`View ${title}`}
          onClick={onClick}
          onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
        />
      )}
      <div className="ratioImage">
        <img src={image} alt={title} />
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__title}>
          <strong className="subtitle _lg">{title}</strong>
        </div>
        <div className={styles.card__description}>
          <p>{description}</p>
          {isMobile ? (
            <button
              className={`subtitle _xxsm color-primary ${styles.card__readmore}`}
              onClick={onClick}
            >
              read more
            </button>
          ) : (
            <span className="subtitle _xxsm color-primary">read more</span>
          )}
        </div>
      </div>
    </div>
  );
};

export type { ProjectCardInfo };
export default ProjectCard;
