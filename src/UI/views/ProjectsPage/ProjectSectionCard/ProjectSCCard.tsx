import React from 'react';
import { FormatText } from '@/UI/components/FormatText';
import styles from './styles.module.scss';

type InfoItem = {
  label: string;
  value: string;
};

type ProjectSCCardProps = {
  title: string;
  description: string;
  infoItems?: InfoItem[];
};

const ProjectSCCard = ({ title, description, infoItems }: ProjectSCCardProps) => {
  return (
    <div className={styles.sc_card}>
      {title && <h4>{title}</h4>}
      {description && (
        <p>
          <FormatText text={description} doubleBr />
        </p>
      )}
      {infoItems && infoItems.length > 0 && (
        <ul className={styles.sc_card__list}>
          {infoItems.map((item, index) => (
            <li key={index}>
              <strong>{item.label}</strong>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectSCCard;
