import styles from './styles.module.scss';

import Button from '@/UI/components/Button';
import Icon, { IconNames } from '@/UI/components/Icon';
import Logo from '@/UI/components/Logo';
import Container from '@/UI/containers';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const HeaderDesktop = () => {
  const t = useTranslations('common');

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
                href={`tel:${t('address.email')}`}
                iconName="phoneIcon"
                label={t('address.email')}
              />
              <HeaderPreLink
                href={`mailto:${t('address.phone')}`}
                iconName="emailIcon"
                label={t('address.phone')}
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
                <Link href={'#projects'}>{t('nav.projects')}</Link>
                <Link href={'#services'}>{t('nav.services')}</Link>
                <Link href={'#products'}>{t('nav.products')}</Link>
                <Link href={'#about-us'}>{t('nav.about_us')}</Link>
                <Link href={'#contacts'}>{t('nav.contacts')}</Link>
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

const   HeaderPreLink = ({ href, label, iconName }: HeaderPreLinkProps) => {
  return (
    <a href={href} className={styles.header__pre__link}>
      <Icon name={iconName} />
      <span>{label}</span>
    </a>
  );
};
export default HeaderDesktop;
