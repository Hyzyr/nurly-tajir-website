import Container from '@/UI/containers';
import styles from './styles.module.scss';

import data from './data.json';
import PartnersSlider, { PartnersSliderItem } from './PartnersSlider';

type Props = {};

const Partners = (props: Props) => {
  return (
    <section className={styles.partners}>
      <Container>
        <div className={styles.partners__inner}>
          <div className={styles.partners__header}>
            <h5 className="h5">Our Partners</h5>
            <p className="_lg">
              We are official distributors in Turkmenistan for leading global
              brands like Samsung, Bosch, Philips, Hikvision, Cisco, and
              Honeywell — delivering certified, high-quality solutions backed by
              trusted technology.
            </p>
          </div>
          <div className={styles.partners__body}>
            <PartnersSlider>
              {[...data, ...data].map((img, index) => (
                <PartnersSliderItem key={index}>
                  <img src={`/images/website/partners/${img}`} key={index} />
                </PartnersSliderItem>
              ))}
            </PartnersSlider>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Partners;
