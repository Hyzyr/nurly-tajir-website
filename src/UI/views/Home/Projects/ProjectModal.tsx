"use client";

import styles from "./styles.module.scss";
import React, { useRef, useImperativeHandle } from "react";
import Button from "@/UI/components/Button";
import Modal, { ModalRef } from "@/UI/components/Modal";
import { ProjectInfo } from "./ProjectsContent";
import { useContactModal } from "@/UI/components/ContactModal";

type ProjectModalProps = {
  project: ProjectInfo | null;
};

const ProjectModal = React.forwardRef<ModalRef, ProjectModalProps>(
  ({ project }, ref) => {
    const modalRef = useRef<ModalRef>(null);
    const contactModal = useContactModal();

    const handleContactClick = () => {
      modalRef.current?.hide();
      setTimeout(() => {
        contactModal.openModal();
      }, 300);
    };

    useImperativeHandle(ref, () => ({
      show: () => modalRef.current?.show(),
      hide: () => modalRef.current?.hide(),
      isVisible: () => modalRef.current?.isVisible() ?? false,
      wrapperRef: modalRef.current?.wrapperRef ?? ({ current: null } as React.RefObject<HTMLDivElement | null>),
    }));

    if (!project) return null;

    return (
      <Modal
        ref={modalRef}
        title={project.title}
        foldable
      >
        <div className={styles.modal__body}>
          <div className={styles.modal__left}>
            <div className={styles.modal__imageContainer}>
              <img src={project.image} alt={project.title} />
            </div>
          </div>

          <div className={styles.modal__right}>
            <div className={styles.modal__content}>
              <div className={styles.modal__description}>
                <p>{project.description}</p>
              </div>

              <div className={styles.modal__tech}>
                <span className={styles.modal__techTitle}>Integrated technologies:</span>
                <div className={styles.modal__techList}>
                  <span className={styles.modal__tag}>React</span>
                  <span className={styles.modal__tag}>TypeScript</span>
                  <span className={styles.modal__tag}>Next.js</span>
                </div>
              </div>

              <div className={styles.modal__contact}>
                <p>Want something similar?</p>
                <Button
                  text="Contact us"
                  style="outlined"
                  onClick={handleContactClick}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
);

ProjectModal.displayName = 'ProjectModal';
export default ProjectModal;
