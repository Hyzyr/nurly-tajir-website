'use client';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

const BROKEN_IMAGE_FALLBACK = '/images/broken-image.png';

type Props = {
  products: string[];
  title?: string;
};

function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      style={{ objectFit: 'cover' }}
      onError={() => setImgSrc(BROKEN_IMAGE_FALLBACK)}
    />
  );
}

const ExpertiseProducts = ({ products, title }: Props) => {
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
              <ProductImage
                src={src}
                alt={`${title || 'Product'} — image ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertiseProducts;
