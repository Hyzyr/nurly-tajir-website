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
  const sizeClass = `button-${size}`;
  const styleClass = `button-${style}`;

  return (
    <button
      className={`button ${styles.button} ${styles[sizeClass]} ${styles[styleClass]}`}
      onClick={onClick}>
      {text && text}
      {children && children}
    </button>
  );
};

export default Button;
