import Container, { ContainerInner } from '@/UI/containers';
import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';
import { FormatText } from '@/UI/components/FormatText';

const About = () => {
  const t = useTranslations('home.about');
  const title = t('title').split('\n');

  return (
    <section className={styles.about} id="about-us">
      <Container>
        <ContainerInner className={styles.about__inner}>
          <div className={styles.about__header}>
            <h3 className="h3">
              {title[0] && <span className="color-gray">{title[0]}</span>}
              {title[1] && (
                <>
                  <br /> {title[1]}
                </>
              )}
            </h3>
          </div>
          <div className={styles.about__body}>
            <LogoSVG />
            <div className={styles.about__body__info}>
              {t('paragraph') && (
                <p>
                  <FormatText text={t('paragraph')} />
                </p>
              )}
            </div>
          </div>
        </ContainerInner>
      </Container>
    </section>
  );
};

const LogoSVG = () => {
  return (
    <svg
      width="448"
      height="446"
      viewBox="0 0 448 446"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M384.875 215.268C384.875 132.549 314.217 63.0366 223.956 63.0366C133.695 63.0366 63.0366 132.549 63.0366 215.268V445.563H0V215.268C0 95.0223 101.657 0 223.956 0C346.255 0 447.912 95.0223 447.912 215.268V445.563H384.875V215.268Z"
        fill="#ECEDEF"
      />
      <path
        d="M157.396 445.563H94.3591V299.717H157.396V445.563Z"
        fill="#ECEDEF"
      />
      <path
        d="M353.944 445.563H290.908V299.717H353.944V445.563Z"
        fill="#ECEDEF"
      />
      <path
        d="M224.152 102.581C280.591 102.581 328.616 138.605 346.489 188.914H274.823C262.58 174.653 244.421 165.618 224.152 165.618C203.882 165.618 185.723 174.653 173.48 188.914H101.815C119.688 138.605 167.712 102.581 224.152 102.581Z"
        fill="#ECEDEF"
      />
      <path
        d="M8.81411 445.835L8.81411 382.798H154.66V445.835H8.81411Z"
        fill="#ECEDEF"
      />
      <path
        d="M300.95 445.835V382.799H446.795V445.835H300.95Z"
        fill="#ECEDEF"
      />
      <path
        d="M354.14 212.21L354.14 275.247L255.67 275.247L255.67 445.758L192.633 445.758L192.633 275.247L93.3802 275.247L93.3802 212.21L354.14 212.21Z"
        fill="#E0E2E4"
      />
    </svg>
  );
};

export default About;
