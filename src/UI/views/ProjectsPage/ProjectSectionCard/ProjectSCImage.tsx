import React from 'react';
import styles from './styles.module.scss';

type ProjectSCImageProps = {
  image: string;
  alt?: string;
};

const ProjectSCImage = ({ image, alt = 'Project image' }: ProjectSCImageProps) => {
  return (
    <div className={styles.projectcard__image}>
      <img src={image} alt={alt} />
    </div>
  );
};

export default ProjectSCImage;
