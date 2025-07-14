import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

type ContainerInnerProps = {
  children: React.ReactNode;
  className?: string;
};

const ContainerInner = ({ className, children }: ContainerInnerProps) => {
  return (
    <div className={`${styles.container__inner} ${className ?? ''}`}>
      {children}
    </div>
  );
};

export { ContainerInner };

export default Container;
