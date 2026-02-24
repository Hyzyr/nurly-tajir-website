import React from 'react';
import styles from './styles.module.scss';
import ExpertiseHero from './ExpertiseHero';
import ExpertiseProducts from './ExpertiseProducts';
import ExpertiseFooter from './ExpertiseFooter';

export type ExpertiseItemData = {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  benefits: {
    value: string;
    label: string;
  }[];
  products: {
    id: string;
    image: string;
  }[];
  footerText: string;
  ctaText: string;
};

type Props = {
  data: ExpertiseItemData;
};

const ExpertiseItem = ({ data }: Props) => {
  return (
    <div className={styles.expertise__item}>
      <div className={styles.expertise__item__body}>
        {/* Header */}
        <div className={styles.expertise__item__header}>
          <h5 className={`h5 ${styles.expertise__item__title}`}>{data.title}</h5>
          <p className={`${styles.expertise__item__description}`}>
            {data.description}
          </p>
        </div>

        {/* Hero Image with Benefits */}
        <ExpertiseHero image={data.heroImage} benefits={data.benefits} />

        {/* Products Grid */}
        {data.products && data.products.length > 0 && (
          <ExpertiseProducts products={data.products} />
        )}

        {/* Footer */}
        <ExpertiseFooter text={data.footerText} ctaText={data.ctaText} />
      </div>
    </div>
  );
};

export default ExpertiseItem;
