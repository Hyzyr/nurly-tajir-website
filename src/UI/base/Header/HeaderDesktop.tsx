import styles from './styles.module.scss';

import Button from '@/UI/components/Button';
import Icon, { IconNames } from '@/UI/components/Icon';
import Logo from '@/UI/components/Logo';
import Container from '@/UI/containers';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import LangSwitch from './components/LangSwitch';
import { useGsapScrollTo } from '@/hooks/useGsapScrollTo';
import { useContactModal } from '@/UI/components/ContactModal';

const HeaderDesktop = () => {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();

  const contactModal = useContactModal();
  const contactUs = () => contactModal.openModal();

  const scrollTo = useGsapScrollTo();

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  const scrollToSection = (section: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      event.preventDefault();
      scrollTo(section, { offsetY: window!.innerHeight * 0.15 });
    }
    // If not on home page, let the link navigate normally to /${locale}/#section
  };

  return (
    <>
      <div className={styles.header__pre}>
        <Container>
          <div className={styles.header__pre__body}>
            <div className={styles.header__pre__body__group}>
              <span>Turkmenistan, Ashgabat</span>
              <hr className="seperator seperator-ver" />
              <LangSwitch />
            </div>
            <div className={styles.header__pre__body__group}>
              <HeaderPreLink
                href={t('address.phone.link')}
                iconName="phoneIcon"
                label={t('address.phone.title')}
              />
              <HeaderPreLink
                href={t('address.email.link')}
                iconName="emailIcon"
                label={t('address.email.title')}
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
                <a href={`/${locale}/projects`}>{t('nav.projects')}</a>
                <a href={`/services`} onClick={scrollToSection('#services')}>
                  {t('nav.services')}
                </a>
                <a href={`/${locale}/#products`} onClick={scrollToSection('#products')}>
                  {t('nav.products')}
                </a>
                <a href={`/${locale}/#about-us`} onClick={scrollToSection('#about-us')}>
                  {t('nav.about_us')}
                </a>
                <a href={`/${locale}/#footer`} onClick={scrollToSection('#footer')}>
                  {t('nav.contacts')}
                </a>
              </div>
              <span>&nbsp; &nbsp; &nbsp;</span>
              <Button text={t('get_quote')} onClick={contactUs} />
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
