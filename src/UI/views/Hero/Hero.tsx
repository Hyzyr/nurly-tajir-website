import Container from '@/UI/containers';
import styles from './styles.module.scss';
import Button from '@/UI/components/Button';
import HeroBg from './HeroBg';

type Props = {};

const Hero = (props: Props) => {
  return (
    <section className={styles.hero}>
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
