import styles from './styles.module.scss';

import Container from '@/UI/containers';
import ProjectCard, { ProjectCardInfo } from './ProjectCard';
import ProjectsCardsWrapper from './ProjectsCardsWrapper';
import { useTranslations } from 'next-intl';
import ProjectButton from './ProjectsButton';

export type ProjectInfo = ProjectCardInfo & { id: string };
type ProjectsContentProps = {
  data: ProjectInfo[];
};
const ProjectsContent = ({ data }: ProjectsContentProps) => {
  const tCommon = useTranslations('common');
  const t = useTranslations('home.projects');

  return (
    <section className={styles.projects} id="projects">
      <Container>
        <div className={styles.projects__inner}>
          <small>{t('subtitle')}</small>
          <ProjectsCardsWrapper>
            {data &&
              data.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            <ProjectButton text={tCommon('req_consultation')} />
          </ProjectsCardsWrapper>
        </div>
      </Container>
    </section>
  );
};

export default ProjectsContent;
