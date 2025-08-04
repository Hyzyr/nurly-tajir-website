import styles from './styles.module.scss';
import './data-table-styles.scss';

import Container from '@/UI/containers';

import React, { PropsWithChildren } from 'react';
type Props = {
  title: string;
  children: React.ReactNode;
};

const DashboardTable = ({ title, children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Container size="xlg">
        <div className={styles.wrapper__inner}>
          <h2 className="h3">{title}</h2>
          {children}
        </div>
      </Container>
    </div>
  );
};

export const DashboardTableCta = ({ children }: PropsWithChildren) => {
  return <div className={styles.cta}>{children}</div>;
};
export const ActionsHeader = ({ children }: PropsWithChildren) => {
  return <div className={styles.cta__header}>{children}</div>;
};
export const ActionsCell = ({ children }: PropsWithChildren) => {
  return <div className={styles.cta__cell}>{children}</div>;
};
export default DashboardTable;
