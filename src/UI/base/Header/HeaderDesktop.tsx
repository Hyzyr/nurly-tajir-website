import styles from './styles.module.scss';

import Button from '@/UI/components/Button';
import Icon, { IconNames } from '@/UI/components/Icon';
import Logo from '@/UI/components/Logo';
import Container from '@/UI/containers';
import { useTranslations } from 'next-intl';
import LangSwitch from './components/LangSwitch';
import { useGsapScrollTo } from '@/hooks/useGsapScrollTo';
import { useContactModal } from '@/UI/components/ContactModal';

const HeaderDesktop = () => {
  const t = useTranslations('common');

  const contactModal = useContactModal();
  const contactUs = () => contactModal.openModal();

  const scrollTo = useGsapScrollTo();

  const scrollToSection =
    (section: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      scrollTo(section, { offsetY: window!.innerHeight * 0.15 });
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
                href={`tel:${t('address.phone')}`}
                iconName="phoneIcon"
                label={t('address.phone')}
              />
              <HeaderPreLink
                href={`mailto:${t('address.email')}`}
                iconName="emailIcon"
                label={t('address.email')}
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
                <a href={'#projects'} onClick={scrollToSection('#projects')}>
                  {t('nav.projects')}
                </a>
                <a href={'#services'} onClick={scrollToSection('#services')}>
                  {t('nav.services')}
                </a>
                <a href={'#products'} onClick={scrollToSection('#products')}>
                  {t('nav.products')}
                </a>
                <a href={'#about-us'} onClick={scrollToSection('#about-us')}>
                  {t('nav.about_us')}
                </a>
                <a href={'#footer'} onClick={scrollToSection('#footer')}>
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
