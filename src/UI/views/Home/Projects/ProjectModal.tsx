"use client";

import styles from "./styles.module.scss";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "@/UI/components/Button";
import { ProjectInfo } from "./ProjectsContent";
import { useContactModal } from "@/UI/components/ContactModal";

type ProjectModalProps = {
  project: ProjectInfo | null;
  isOpen: boolean;
  isClosing: boolean;
  onClose: () => void;
};

const ProjectModal = ({
  project,
  isOpen,
  isClosing,
  onClose,
}: ProjectModalProps) => {
  const contactModal = useContactModal();

  const handleContactClick = () => {
    onClose();
    setTimeout(() => {
      contactModal.openModal();
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className={`${styles.modalOverlay} ${
        isClosing ? styles.modalOverlay__closing : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.modal__closing : ""}`}
      >
        <div className={styles.modal__header}>
          <h2>{project.title}</h2>
        </div>

        <div className={styles.modal__body}>
          <div className={styles.modal__left}>
            <div className={styles.modal__imageContainer}>
              <img src={project.image} alt={project.title} />
            </div>
          </div>

          <div className={styles.modal__right}>
            <button
              className={styles.modal__close}
              onClick={onClose}
              aria-label="Close modal"
            />

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
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ProjectModal;
