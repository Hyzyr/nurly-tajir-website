'use client';

import styles from './styles.module.scss';

import Container from '@/UI/containers';
import ProjectCard, { ProjectCardInfo } from './ProjectCard';
import ProjectsCardsWrapper from './ProjectsCardsWrapper';
import { useTranslations, useLocale } from 'next-intl';
import ProjectButton from './ProjectsButton';
import { useRouter } from 'next/navigation';

export type ProjectInfo = ProjectCardInfo & { id: string };

type ProjectsContentProps = {
  data: ProjectInfo[];
};

const ProjectsContent = ({ data }: ProjectsContentProps) => {
  const tCommon = useTranslations('common');
  const t = useTranslations('home.projects');
  const locale = useLocale();
  const router = useRouter();

  const handleProjectClick = (project: ProjectInfo) => {
    router.push(`/${locale}/projects#project-${project.id}`);
  };

  return (
    <section className={styles.projects} id="projects">
      <Container>
        <div className={styles.projects__inner}>
          <small>{t('subtitle')}</small>
          <ProjectsCardsWrapper>
            {data &&
              data.map((project, index) => (
                <ProjectCard
                  key={index}
                  {...project}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            <ProjectButton text={tCommon('explore_projects')} />
          </ProjectsCardsWrapper>
        </div>
      </Container>
    </section>
  );
};

export default ProjectsContent;
