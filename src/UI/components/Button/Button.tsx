import { CSSProperties } from 'react';
import Icon, { IconNames } from '../Icon';
import styles from './styles.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  size?: 'md' | 'lg' | 'sm' | 'xsm';
  style?: 'default' | 'secondary' | 'outlined';
  state?: 'default' | 'warning' | 'danger' | 'success';
  inlineCSS?: CSSProperties;
  icon?: IconNames;
  iconRight?: boolean;
};

const Button = ({
  text,
  children,
  style = 'default',
  size = 'md',
  icon,
  state,
  inlineCSS,
  disabled,
  iconRight,
  onClick,
}: Props) => {
  const sizeClass = `button-${size}`;
  const styleClass = `button-${style}`;

  return (
    <button
      disabled={disabled}
      className={`button ${styles.button} ${styles[sizeClass]} ${
        styles[styleClass]
      }
      ${state ? styles[state] : ''}`}
      onClick={onClick}
      style={inlineCSS}>
      {icon && !iconRight && <Icon name={icon} />}
      {text && text}
      {children && children}
      {icon && iconRight && <Icon name={icon} />}
    </button>
  );
};

export default Button;
