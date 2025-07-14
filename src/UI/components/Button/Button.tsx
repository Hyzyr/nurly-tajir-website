import styles from './styles.module.scss';

type Props = {
  text?: string;
  children?: React.ReactNode;
  size?: 'md' | 'lg' | 'sm';
  style?: 'default' | 'outlined';
  onClick?: () => void;
};

const Button = ({
  text,
  children,
  style = 'default',
  size = 'md',
  onClick,
}: Props) => {
  return (
    <button
      className={`button ${styles.button} ${styles.button}-${size}  ${styles.button}-${style}`}
      onClick={onClick}>
      {text && text}
      {children && children}
    </button>
  );
};

export default Button;
