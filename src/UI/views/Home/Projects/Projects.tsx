import styles from './styles.module.scss';

import Container from '@/UI/containers';
import data from './data.json';
import ProjectCard from './ProjectCard';
import Icon from '@/UI/components/Icon';
import ProjectsCardsWrapper from './ProjectsCardsWrapper';
import { useTranslations } from 'next-intl';
import { dummyAwait } from '@/UI/utils/fetch';

const ProjectsContent = ({ testData }: { testData: typeof data }) => {
  const tCommon = useTranslations('common');
  const t = useTranslations('home.projects');

  return (
    <section className={styles.projects} id="projects">
      <Container>
        <div className={styles.projects__inner}>
          <small>{t('subtitle')}</small>
          <ProjectsCardsWrapper>
            {testData.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
            <div className={styles.projects__row__button}>
              <strong className="subtitle _lg">
                {tCommon('req_consultation')}
              </strong>
              <Icon name="arrowCorner" />
            </div>
          </ProjectsCardsWrapper>
        </div>
      </Container>
    </section>
  );
};
const Projects = async ({ locale }: { locale: string }) => {
  const testData = await dummyAwait(locale, data);
  return <ProjectsContent testData={testData} />;
};

export default Projects;
