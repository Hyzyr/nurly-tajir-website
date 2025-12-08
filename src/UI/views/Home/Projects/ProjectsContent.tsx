"use client";

import styles from "./styles.module.scss";

import Container from "@/UI/containers";
import ProjectCard, { ProjectCardInfo } from "./ProjectCard";
import ProjectsCardsWrapper from "./ProjectsCardsWrapper";
import { useTranslations } from "next-intl";
import ProjectButton from "./ProjectsButton";
import ProjectModal from "./ProjectModal";
import { useState, useRef } from "react";
import { ModalRef } from "@/UI/components/Modal";

export type ProjectInfo = ProjectCardInfo & { id: string };

type ProjectsContentProps = {
  data: ProjectInfo[];
};

const ProjectsContent = ({ data }: ProjectsContentProps) => {
  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(
    null
  );
  const projectModalRef = useRef<ModalRef>(null);
  const tCommon = useTranslations("common");
  const t = useTranslations("home.projects");

  const handleProjectClick = (project: ProjectInfo) => {
    setSelectedProject(project);
    projectModalRef.current?.show();
  };

  return (
    <>
      <section className={styles.projects} id="projects">
        <Container>
          <div className={styles.projects__inner}>
            <small>{t("subtitle")}</small>
            <ProjectsCardsWrapper>
              {data &&
                data.map((project, index) => (
                  <ProjectCard
                    key={index}
                    {...project}
                    onClick={() => handleProjectClick(project)}
                  />
                ))}
              <ProjectButton text={tCommon("req_consultation")} />
            </ProjectsCardsWrapper>
          </div>
        </Container>
      </section>

      <ProjectModal
        ref={projectModalRef}
        project={selectedProject}
      />
    </>
  );
};

export default ProjectsContent;
