import styles from './styles.module.scss';
import * as iconsSVG from '@/UI/assets/SimpleIconsSVG';

export type IconNames = keyof typeof iconsSVG;
type Props = {
  name: IconNames;
  size?: 'small' | 'medium' | 'large';
};

const Icon = ({ name, size }: Props) => {
  return <span className={`icon ${styles.icon}`}>{iconsSVG[name]}</span>;
};

export default Icon;
