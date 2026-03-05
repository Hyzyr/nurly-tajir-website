import React from 'react';
import { formatDate } from '@/utils/DateAndTime';
import ProjectSCImage from './ProjectSCImage';
import ProjectSCInfo from './ProjectSCInfo';
import styles from './styles.module.scss';

export type ProjectSectionCardData = {
  title: string;
  description: string;
  image: string;
  badges: string[];
  date?: string;
  location?: string;
  client?: string;
};

type ProjectSectionCardProps = {
  project: ProjectSectionCardData;
  layout?: 'big-left' | 'big-right';
  id?: string;
};

const ProjectSectionCard = ({ project, layout = 'big-left', id }: ProjectSectionCardProps) => {
  const infoItems = [
    { label: 'Date', value: project.date ? formatDate(project.date, { month: 'short', year: 'numeric' }) : '' },
    { label: 'Location', value: project.location || '' },
    { label: 'Client', value: project.client || '' },
  ].filter((item) => item.value);

  const imageSection = <ProjectSCImage image={project.image} alt={project.title} />;

  const infoSection = (
    <ProjectSCInfo
      title={project.title}
      description={project.description}
      badges={project.badges}
      infoItems={infoItems.length > 0 ? infoItems : undefined}
    />
  );

  return (
    <article id={id} className={styles.projectcard}>
      {layout === 'big-left' ? (
        <>
          {imageSection}
          {infoSection}
        </>
      ) : (
        <>
          {infoSection}
          {imageSection}
        </>
      )}
    </article>
  );
};

export default ProjectSectionCard;
