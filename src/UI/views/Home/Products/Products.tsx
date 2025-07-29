import styles from './styles.module.scss';

import Container from '@/UI/containers';
import ProductCard from './ProductCard';

import data from './data.json';
import Icon from '@/UI/components/Icon';
import { useTranslations } from 'next-intl';

const Products = () => {
  const t = useTranslations('home.products');
  const tCommon = useTranslations('common');
  const title = t('title').split('\n');

  return (
    <section className={styles.products}>
      <Container>
        <div className={styles.products__inner}>
          <h3 className="h3">
            {title[0] && <span className="color-gray">{title[0]}</span>}
            {title[1] && (
              <>
                <br /> {title[1]}
              </>
            )}
          </h3>
          <div className={styles.products__grid}>
            {data.map((category, index) => (
              <ProductCard
                key={index}
                brands={category.brands}
                title={category.name}
                image={category.image}
              />
            ))}
            <div className={styles.products__grid__button}>
              <strong className="h5">{tCommon('explore_store')}</strong>
              <Icon name="arrowCorner" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Products;
