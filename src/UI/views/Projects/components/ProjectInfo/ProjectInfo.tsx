import React from 'react';
import styles from './styles.module.scss';

type InfoItem = {
  label: string;
  value: string;
};

type ProjectInfoProps = {
  date?: string;
  location?: string;
  client?: string;
};

const ProjectInfo = ({ date, location, client }: ProjectInfoProps) => {
  const infoItems: InfoItem[] = [
    { label: 'Date', value: date || '' },
    { label: 'Location', value: location || '' },
    { label: 'Client', value: client || '' },
  ].filter((item) => item.value);

  return (
    <div className={styles['project-info']}>
      {infoItems.map((item, index) => (
        <div key={index} className={styles['project-info__item']}>
          <p className={styles['project-info__label']}>{item.label}</p>
          <p className={styles['project-info__value']}>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectInfo;
