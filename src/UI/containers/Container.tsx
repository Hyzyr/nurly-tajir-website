import styles from './styles.module.scss';

type Props = {
  size?: 'md' | 'lg' | 'xlg';
  children: React.ReactNode;
};

const Container = ({ children, size = 'md' }: Props) => {
  return <div className={`${styles.container}  _${size}`}>{children}</div>;
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
