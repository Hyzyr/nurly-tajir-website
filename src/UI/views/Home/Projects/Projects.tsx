import ProjectsContent from './ProjectsContent';
import type { ProjectInfo } from '@/UI/fetch';

export type { ProjectInfo };

type Props = {
  data: ProjectInfo[];
};

const Projects = ({ data }: Props) => {
  return <ProjectsContent data={data} />;
};

export default Projects;
