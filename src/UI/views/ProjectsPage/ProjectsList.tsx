import React from 'react';
import { ProjectSectionCard, ProjectSectionCardData } from './ProjectSectionCard';
import styles from './styles.module.scss';
import Container from '@/UI/containers';
import type { ProjectSectionData } from '@/UI/fetch';

type Props = {
  data: ProjectSectionData[];
};

const ProjectsList = ({ data }: Props) => {
  return (
    <section className={styles.projects}>
      <Container>
        <div className={styles.projects__inner}>
          {data.map((project, index) => (
            <ProjectSectionCard
              key={project.id}
              id={`project-${project.id}`}
              project={project as ProjectSectionCardData}
              layout={index % 2 === 0 ? 'big-left' : 'big-right'}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProjectsList;
