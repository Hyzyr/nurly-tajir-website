import React from 'react';
import ProjectRow, { ProjectRowData } from './components/ProjectRow';
import styles from './styles.module.scss';
import Container from '@/UI/containers';

type Props = {
  projects?: ProjectRowData[];
  onContactClick?: () => void;
};
const mockProjects: ProjectRowData[] = [
  {
    title: 'National Airport',
    description:
      'We implemented over 50 reliable IT and system solutions — including networking, control systems, and integration support across the airport facility.\n\nWe implemented over 50 reliable IT and system solutions — including networking, control systems, and integration support across the airport facility.\n\n300+ camera\n20 monitors',
    image: '/images/projects/airport.jpg',
    badges: ['CCTV & Security Cameras', 'IT Systems', 'Fire Detection Systems', '+2'],
    date: '29 - Jan, 2024',
    location: 'Ashgabat',
    client: 'Sahra Gurlushyk',
  },
  {
    title: 'Commercial Buildings',
    description:
      'We implemented over 50 reliable IT and system solutions — including networking, control systems, and integration support across the airport facility.\n\nWe implemented over 50 reliable IT and system solutions — including networking, control systems, and integration support across the airport facility.\n\n300+ camera\n20 monitors',
    image: '/images/projects/commercial.jpg',
    badges: ['CCTV & Security Cameras', 'IT Systems', 'Fire Detection Systems', '+2'],
    date: '29 - Jan, 2024',
    location: 'Ashgabat',
    client: 'Sahra Gurlushyk',
  },
];
const ProjectsList = ({ projects = [], onContactClick }: Props) => {
  // Mock data for demonstration - replace with actual data

  const displayProjects = projects.length > 0 ? projects : mockProjects;

  return (
    <div className={styles.projects}>
      <Container>
        <div className={styles.projects__inner}>
          {displayProjects.map((project, index) => (
            <ProjectRow
              key={index}
              project={project}
              layout={index % 2 === 0 ? 'big-left' : 'big-right'}
              onContactClick={onContactClick}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProjectsList;
