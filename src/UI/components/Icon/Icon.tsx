import styles from './styles.module.scss';
import * as iconsSVG from '@/UI/assets/SimpleIconsSVG';

export type IconNames = keyof typeof iconsSVG;
type Props = {
  name: IconNames;
};

const Icon = ({ name }: Props) => {
  return <span className={`icon ${styles.icon}`}>{iconsSVG[name]}</span>;
};

export default Icon;
