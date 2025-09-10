import styles from './styles.module.scss';

import Container from '@/UI/containers';

import { useTranslations } from 'next-intl';
import ProductsGrid from './ProductsGrid';

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
          <ProductsGrid />
        </div>
      </Container>
    </section>
  );
};

export default Products;
