import styles from './styles.module.scss';

import Container from '@/UI/containers';
import ProductCard from './ProductCard';

import data from './data.json';
import { useTranslations } from 'next-intl';
import ProductsCta from './ProductsCta';

const Products = () => {
  const t = useTranslations('home.products');
  const title = t('title').split('\n');

  return (
    <section className={styles.products} id="products">
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
            <ProductsCta />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Products;
