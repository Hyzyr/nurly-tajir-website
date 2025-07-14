import Logo from '@/UI/components/Logo';
import styles from './styles.module.scss';
import Icon from '@/UI/components/Icon';
import Container from '@/UI/containers';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footer__inner}>
          <div className={styles.footer__column}>
            <Logo style="white" />
            <p className="_sm">
              In a short time, we’ve successfully implemented over 15 projects
              in variouse sectors
            </p>
          </div>
          <div className={styles.footer__column}>
            <strong className="subtitle _xsm">Company</strong>
            <div className="fbox fbox-column fbox-gap-2">
              <a href="#projects" className={styles.footer__link}>
                Projects
              </a>
              <a href="#services" className={styles.footer__link}>
                Services
              </a>
              <a href="#products" className={styles.footer__link}>
                Products
              </a>
              <a href="#about-us" className={styles.footer__link}>
                About Us
              </a>
              <a href="#contacts" className={styles.footer__link}>
                Contacts
              </a>
            </div>
          </div>
          <div className={styles.footer__column}>
            <strong className="subtitle _xsm">Legal</strong>
            <div className="fbox fbox-column fbox-gap-2">
              <a href="#" className={styles.footer__link}>
                Documents
              </a>
              <a href="#" className={styles.footer__link}>
                Privacy Policy
              </a>
              <a href="#" className={styles.footer__link}>
                Terms & Conditions
              </a>
            </div>
          </div>
          <div className={styles.footer__column}>
            <strong className="subtitle _xsm">Office</strong>
            <ul>
              <li>
                <Icon name="mapPinIcon" />
                <a href="mailto:info@nurly-tajir.com">
                  Turkmenistan, Ashgabat Oguzhan 126
                </a>
              </li>
              <li>
                <Icon name="mapPinIcon" />
                <a href="mailto:info@nurly-tajir.com">
                  Turkmenistan, Ashgabat Azady 62/15
                </a>
              </li>
              <li>
                <Icon name="phoneIcon" />
                <a href="mailto:info@nurly-tajir.com">+993 63 102030</a>
              </li>
              <li>
                <Icon name="emailIcon" />
                <a href="mailto:info@nurly-tajir.com">info@nurly-tajir.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footer__copyright}>
          <small>
            All Rights Reserved <Icon name="copyrightSVG" /> 2025, Nurly Tajir
          </small>
          <HyzyrLogo />
        </div>
      </Container>
    </footer>
  );
};

const HyzyrLogo = () => {
  return (
    <div className="fbox fbox-gap-1 fbox-center">
      <small> Designed and Developed by</small>
      <a
        href="https://hyzyr.com"
        target="_blank"
        className="fbox fbox-gap-1 fbox-center">
        <span className="icon">
          <svg
            width="12"
            height="15"
            viewBox="0 0 12 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.89089 14.835H5.10907V9.48951H6.89089V14.835Z"
              fill="#a4bcd6"
            />
            <path
              d="M4.34543 3.27203H1.72491V12.1433H4.34543V13.0531H0.272705V2.36223H4.34543V3.27203Z"
              fill="#a4bcd6"
            />
            <path
              d="M11.7273 13.0531H7.65452V12.1433H10.275V3.27203H7.65452V2.36223H11.7273V13.0531Z"
              fill="#a4bcd6"
            />
            <path
              d="M6.89089 6.18042H5.10907V0.834961H6.89089V6.18042Z"
              fill="#a4bcd6"
            />
          </svg>
        </span>
        <small>HYZYR</small>
      </a>
    </div>
  );
};

export default Footer;
