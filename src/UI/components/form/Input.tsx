// components/Input.tsx

import React, { useId } from 'react';
import styles from './styles.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  name,
  id,
  disabled,
  className,
  ...rest
}: InputProps) => {
  return (
    <div className={`${styles.input} ${className ?? ''}`}>
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
  wrapperClassName?: string;
};

export const LabeledInput = ({
  wrapperClassName,
  label,
  ...restProps
}: LabeledInputProps) => {
  const id = useId();

  return (
    <div className={`${styles.input__group} ${wrapperClassName ?? ''}`}>
      <label htmlFor={id}>{label}</label>
      <Input {...restProps} id={id} />
    </div>
  );
};

export default Input;
