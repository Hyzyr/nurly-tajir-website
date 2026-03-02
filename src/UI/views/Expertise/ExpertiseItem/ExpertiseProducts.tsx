'use client';
import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

type Props = {
  products: string[];
};

const ExpertiseProducts = ({ products }: Props) => {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
    align: 'start',
  });

  return (
    <div className={styles.expertise__products}>
      <div ref={emblaRef} className={styles.expertise__products__clip}>
        <div className={styles.expertise__products__container}>
          {products.map((src, i) => (
            <div key={i} className={styles.expertise__products__item}>
              <Image
                src={src}
                alt={`Product ${i + 1}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertiseProducts;
