// components/Textarea.tsx

import React, { useId } from 'react';
import styles from './styles.module.scss';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  sizeStyle?: 'sm' | 'md' | 'lg';
};

const Textarea = ({
  value,
  onChange,
  placeholder,
  name,
  id,
  disabled,
  className,
  sizeStyle = 'md',
  ...rest
}: TextareaProps) => {
  return (
    <div className={`${styles.input}  _${sizeStyle} ${className ?? ''}`}>
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
  sizeStyle?: 'sm' | 'md' | 'lg';
};

export const LabeledTextarea = ({
  wrapperClassName,
  label,
  sizeStyle = 'md',
  ...restProps
}: LabeledTextareaProps) => {
  const id = useId();

  return (
    <div
      className={
        `${styles.input__group}  _${sizeStyle}` + ` ${wrapperClassName ?? ''}`
      }>
      <label htmlFor={id}>{label}</label>
      <Textarea {...restProps} id={id} sizeStyle={sizeStyle} />
    </div>
  );
};

export default Textarea;
