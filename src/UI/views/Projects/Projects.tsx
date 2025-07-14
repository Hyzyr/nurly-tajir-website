import styles from './styles.module.scss';

import Container from '@/UI/containers';
import data from './data.json';
import ProjectCard from './ProjectCard';
import Icon from '@/UI/components/Icon';
import ProjectsRow from './ProjectsRow';

type Props = {};

const Projects = (props: Props) => {
  return (
    <section className={styles.projects}>
      <Container>
        <div className={styles.projects__inner}>
          <small>Highlighted Projects</small>
          <ProjectsRow>
            {data.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
            <div className={styles.projects__row__button}>
              <strong className="subtitle _lg">Request Consultation</strong>
              <Icon name="arrowCorner" />
            </div>
          </ProjectsRow>
        </div>
      </Container>
    </section>
  );
};

export default Projects;
