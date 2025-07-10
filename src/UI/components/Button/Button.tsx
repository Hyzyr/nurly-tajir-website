import styles from './styles.module.scss';

type Props = {
  text?: string;
  children?: React.ReactNode;
  size?: 'md' | 'lg' | 'sm';
  onClick?: () => void;
};

const Button = ({ text, children, size = 'md', onClick }: Props) => {
  return (
    <button
      className={`button ${styles.button} ${styles.button}-${size}`}
      onClick={onClick}>
      {text && text}
      {children && children}
    </button>
  );
};

export default Button;
