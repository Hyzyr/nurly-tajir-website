// components/Input.tsx

import React, { useId } from 'react';
import styles from './styles.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  sizeStyle?: 'sm' | 'md' | 'lg';
};

const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  name,
  id,
  disabled,
  className,
  sizeStyle = 'md',
  ...rest
}: InputProps) => {
  return (
    <div className={`${styles.input}  _${sizeStyle} ${className ?? ''}`}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        id={id}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};

type LabeledInputProps = InputProps & {
  label: string;
  sizeStyle?: 'sm' | 'md' | 'lg';
  wrapperClassName?: string;
};

const LabeledInput = ({
  wrapperClassName,
  label,
  sizeStyle = 'md',
  ...restProps
}: LabeledInputProps) => {
  const id = useId();

  return (
    <div
      className={
        `${styles.input__group} _${sizeStyle}` + ` ${wrapperClassName ?? ''}`
      }>
      <label htmlFor={id}>{label}</label>
      <Input {...restProps} id={id} sizeStyle={sizeStyle} />
    </div>
  );
};

export { LabeledInput };
export default Input;
