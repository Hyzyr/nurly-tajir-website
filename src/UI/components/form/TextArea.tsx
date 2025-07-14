// components/Textarea.tsx

import React, { useId } from 'react';
import styles from './styles.module.scss';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({
  value,
  onChange,
  placeholder,
  name,
  id,
  disabled,
  className,
  ...rest
}: TextareaProps) => {
  return (
    <div className={`${styles.input} ${className ?? ''}`}>
      <textarea
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

type LabeledTextareaProps = TextareaProps & {
  label: string;
  wrapperClassName?: string;
};

export const LabeledTextarea = ({
  wrapperClassName,
  label,
  ...restProps
}: LabeledTextareaProps) => {
  const id = useId();

  return (
    <div className={`${styles.input__group} ${wrapperClassName ?? ''}`}>
      <label htmlFor={id}>{label}</label>
      <Textarea {...restProps} id={id} />
    </div>
  );
};

export default Textarea;
