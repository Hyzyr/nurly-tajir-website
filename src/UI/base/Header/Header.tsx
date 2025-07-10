import Icon, { IconNames } from '@/UI/components/Icon';
import styles from './styles.module.scss';

import Container from '@/UI/containers';
import Logo from '@/UI/components/Logo';
import Button from '@/UI/components/Button';
import Link from 'next/link';

type Props = {};

const Header = (props: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__pre}>
        <Container>
          <div className={styles.header__pre__body}>
            <div className={styles.header__pre__body__group}>
              <span>Turkmenistan, Ashgabat</span>
              <hr className="seperator seperator-ver" />
              <HeaderPreLink
                href="tel:+993 63 102030"
                iconName="translateIcon"
                label="Eng"
              />
            </div>
            <div className={styles.header__pre__body__group}>
              <HeaderPreLink
                href="tel:+993 63 102030"
                iconName="phoneIcon"
                label="+993 63 102030"
              />
              <HeaderPreLink
                href="mailto:info@nurly-tajir.com"
                iconName="emailIcon"
                label="info@nurly-tajir.com"
              />
            </div>
          </div>
        </Container>
      </div>
      <div className={styles.header__main}>
        <Container>
          <div className={styles.header__main__body}>
            <Logo />

            <nav>
              <div className="fbox fbox-gap-2">
                <Link href={'#projects'}>Projects</Link>
                <Link href={'#services'}>Services</Link>
                <Link href={'#prdoucts'}>Prdoucts</Link>
                <Link href={'#about-us'}>About Us</Link>
                <Link href={'#contacts'}>Contacts</Link>
              </div>
              <Button text="Get Quote" />
            </nav>
          </div>
        </Container>
      </div>
    </header>
  );
};

type HeaderPreLinkProps = {
  href: string;
  iconName: IconNames;
  label: string;
};

const HeaderPreLink = ({ href, label, iconName }: HeaderPreLinkProps) => {
  return (
    <a href={href} className={styles.header__pre__link}>
      <Icon name={iconName} />
      <span>{label}</span>
    </a>
  );
};
export default Header;
