import styles from './styles.module.scss';
import * as iconsSVG from '@/UI/assets/SimpleIconsSVG';

export type IconNames = keyof typeof iconsSVG;
type Props = {
  className?: string;
  name: IconNames;
};

const Icon = ({ name, className = '' }: Props) => {
  return (
    <span className={`icon ${styles.icon} ${className}`}>{iconsSVG[name]}</span>
  );
};

export default Icon;
