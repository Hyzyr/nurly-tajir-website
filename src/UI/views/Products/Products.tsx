import styles from './styles.module.scss';

import Container from '@/UI/containers';
import ProductCard from './ProductCard';

import data from './data.json';
import Icon from '@/UI/components/Icon';

type Props = {};

const Products = (props: Props) => {
  return (
    <section className={styles.products}>
      <Container>
        <div className={styles.products__inner}>
          <h3 className="h3">
            <span className="color-gray">Our</span> <br />
            Products
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
              <strong className="h5">Explore Store</strong>
              <Icon name="arrowCorner" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Products;
