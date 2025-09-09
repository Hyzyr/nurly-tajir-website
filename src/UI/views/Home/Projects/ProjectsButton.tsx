'use client';
import React from 'react';
import Icon from '@/UI/components/Icon';

import styles from './styles.module.scss';
import { useContactModal } from '@/UI/components/ContactModal';

type ProjectButtonType = {
  text: string;
};

const ProjectButton = ({ text }: ProjectButtonType) => {
  const contactModal = useContactModal();
  const contactUs = () => contactModal.openModal();

  return (
    <div className={styles.projects__row__button} onClick={contactUs}>
      <strong className="subtitle _lg">{text}</strong>
      <Icon name="arrowCorner" />
    </div>
  );
};

export default ProjectButton;
