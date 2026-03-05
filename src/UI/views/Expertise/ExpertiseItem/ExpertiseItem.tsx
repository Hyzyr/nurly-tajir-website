import React from 'react';
import styles from './styles.module.scss';
import ExpertiseHero from './ExpertiseHero';
import ExpertiseProducts from './ExpertiseProducts';
import ExpertiseFooter from './ExpertiseFooter';

export type ExpertiseItemData = {
  id: string;
  title: string;
  description: string;
  heroImage?: string;
  benefits?: {
    value: string;
    label: string;
  }[];
  images?: string[] | null;
  footerText: string;
};

type Props = {
  data: ExpertiseItemData;
};

const ExpertiseItem = ({ data }: Props) => {
  return (
    <article className={styles.expertise__item}>
      <div className={styles.expertise__item__body}>
        {/* Header */}
        <div className={styles.expertise__item__header}>
          <h2 className={`h5 ${styles.expertise__item__title}`}>{data.title}</h2>
          <p className={`${styles.expertise__item__description}`}>
            {data.description}
          </p>
        </div>

        {/* Hero Image with Benefits */}
        {data.heroImage && (
          <ExpertiseHero image={data.heroImage} alt={data.title} benefits={data.benefits} />
        )}

        {/* Products Grid */}
        {data.images && data.images.length > 0 && (
          <ExpertiseProducts products={data.images} title={data.title} />
        )}

        {/* Footer */}
        <ExpertiseFooter text={data.footerText} />
      </div>
    </article>
  );
};

export default ExpertiseItem;
