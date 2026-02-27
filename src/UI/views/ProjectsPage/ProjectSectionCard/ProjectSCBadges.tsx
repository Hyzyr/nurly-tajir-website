import React from 'react';
import styles from './styles.module.scss';

type ProjectSCBadgesProps = {
  badges: string[];
  maxVisible?: number;
};

const ProjectSCBadges = ({ badges, maxVisible = 3 }: ProjectSCBadgesProps) => {
  const showAll = badges.length <= maxVisible + 1;
  const visible = showAll ? badges : badges.slice(0, maxVisible);
  const overflow = showAll ? [] : badges.slice(maxVisible);

  return (
    <div className={styles.badgeList}>
      {visible.map((badge, i) => (
        <div key={i} className={styles.badge}>
          <span className={styles.badge__text}>{badge}</span>
        </div>
      ))}

      {overflow.length > 0 && (
        <div className={styles.badgeOverflow}>
          <div className={styles.badgeOverflow__trigger}>+{overflow.length}</div>
          <div className={styles.badgeOverflow__tooltip}>
            {overflow.map((badge, i) => (
              <span key={i} className={styles.badgeOverflow__item}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSCBadges;
