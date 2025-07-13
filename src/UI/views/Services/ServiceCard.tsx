import Icon from '@/UI/components/Icon';
import styles from './styles.module.scss';

import React from 'react';

type Props = {
  imageIcon?: string;
  title: string;
  active?: boolean;
  onClick?: () => void;
};

const ServiceCard = ({ imageIcon, title, active, onClick }: Props) => {
  return (
    <div
      className={`${styles.card} 
    ${active ? 'active' : ''} ${imageIcon ? '' : styles.card__noimage}`}
      onClick={onClick}>
      {imageIcon && (
        <img src={`/images/website/services/${imageIcon}`} alt="icon-image" />
      )}
      <div className={styles.card__title}>
        <strong className="subtitle _lg">{title}</strong>
      </div>
      <div className={styles.card__btn}>
        <Icon name="arrowCorner" />
        <label>More Info</label>
      </div>
    </div>
  );
};

export default ServiceCard;
