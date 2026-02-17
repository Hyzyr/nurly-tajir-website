import React from 'react';
import ProjectBadge from '../ProjectBadge';
import ProjectCard from '../ProjectCard';
import ProjectCardBig from '../ProjectCardBig';
import ProjectInfo from '../ProjectInfo';
import styles from './styles.module.scss';

export type ProjectRowData = {
  title: string;
  description: string;
  image: string;
  badges: string[];
  date?: string;
  location?: string;
  client?: string;
  bigCardDescription?: string;
};

type ProjectRowProps = {
  project: ProjectRowData;
  layout?: 'big-left' | 'big-right';
  onContactClick?: () => void;
};

const ProjectRow = ({ project, layout = 'big-left', onContactClick }: ProjectRowProps) => {
  const renderBigCard = () => (
    <ProjectCardBig
      image={project.image}
      description={
        project.bigCardDescription ||
        'From structured cabling to wireless systems, we build high-performance networks using trusted hardware brands for smooth and secure connectivity.'
      }
      onContactClick={onContactClick}
    />
  );

  const renderInfoSection = () => (
    <div className={styles['project-row__info']}>
      <div className={styles['project-row__badges']}>
        {project.badges.map((badge, index) => (
          <ProjectBadge key={index} label={badge} />
        ))}
      </div>
      <ProjectCard title={project.title} description={project.description} />
      <ProjectInfo date={project.date} location={project.location} client={project.client} />
    </div>
  );

  return (
    <div className={styles['project-row']}>
      {layout === 'big-left' ? (
        <>
          {renderBigCard()}
          {renderInfoSection()}
        </>
      ) : (
        <>
          {renderInfoSection()}
          {renderBigCard()}
        </>
      )}
    </div>
  );
};

export default ProjectRow;
