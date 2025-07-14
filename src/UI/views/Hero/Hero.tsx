import styles from './styles.module.scss';

import Container from '@/UI/containers';
import Button from '@/UI/components/Button';
import HeroBg from './HeroBg';



const Hero = () => {
  return (
    <section className={styles.hero} id='hero'>
      <Container>
        <div className={styles.hero__body}>
          <div className={styles.hero__content}>
            <h6 className="subtitle">From Development to Deployment</h6>
            <h1 className="h1">
              We Power <br />
              the Next Tech <br />
              Evolution
            </h1>
            <div className={styles.hero__content__cta}>
              <Button text="Contact Us" size="lg" />
            </div>
          </div>
          <HeroBg />
        </div>
      </Container>
    </section>
  );
};

export default Hero;
