import styles from './styles.module.scss';

import Container from '@/UI/containers';
import data from './data.json';
import ProjectCard from './ProjectCard';
import Icon from '@/UI/components/Icon';
import ProjectsCardsWrapper from './ProjectsCardsWrapper';
import { useLocale, useTranslations } from 'next-intl';

const dummyAwait = () =>
  new Promise<{ test: string }>((resolve) => {
    setTimeout(() => {
      resolve(data); // <-- resolve with your object
    }, 200);
  });

const ProjectsContent = ({ testData }: { testData: any }) => {
  const tCommon = useTranslations('common');
  const t = useTranslations('home.projects');
  const locale = useLocale();

  return (
    <section className={styles.projects}>
      <Container>
        <div className={styles.projects__inner}>
          <small>{t('subtitle')}</small>
          <ProjectsCardsWrapper>
            {data.map((project, index) => (
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
const Projects = async () => {
  const testData = await dummyAwait();
  return <ProjectsContent testData={testData} />;
};

export default Projects;
