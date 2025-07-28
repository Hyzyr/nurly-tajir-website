import styles from './styles.module.scss';

import Button from '@/UI/components/Button';
import Icon, { IconNames } from '@/UI/components/Icon';
import Logo from '@/UI/components/Logo';
import Container from '@/UI/containers';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const HeaderDesktop = () => {
  const t = useTranslations('nav');

  return (
    <>
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
                <Link href={'#projects'}>{t('projects')}</Link>
                <Link href={'#services'}>{t('services')}</Link>
                <Link href={'#products'}>{t('products')}</Link>
                <Link href={'#about-us'}>{t('about_us')}</Link>
                <Link href={'#contacts'}>{t('contacts')}</Link>
              </div>
              <Button text={t('get_quote')} />
            </nav>
          </div>
        </Container>
      </div>
    </>
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
export default HeaderDesktop;
