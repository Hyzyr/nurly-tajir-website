import React from 'react';
import ProjectSCBadges from './ProjectSCBadges';
import ProjectSCCard from './ProjectSCCard';
import styles from './styles.module.scss';

type InfoItem = {
  label: string;
  value: string;
};

type ProjectSCInfoProps = {
  title: string;
  description: string;
  badges: string[];
  infoItems?: InfoItem[];
};

const ProjectSCInfo = ({ title, description, badges, infoItems }: ProjectSCInfoProps) => {
  return (
    <div className={styles.projectcard__info}>
      <ProjectSCBadges badges={badges} />
      <ProjectSCCard title={title} description={description} infoItems={infoItems} />
    </div>
  );
};

export default ProjectSCInfo;
