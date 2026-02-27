'use client';
import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';

interface TagInputProps {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Add item…',
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag || value.includes(tag)) return;
    onChange([...value, tag]);
    setInputValue('');
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  return (
    <div className={styles.tagInput}>
      {label && <span className={styles.tagInput__label}>{label}</span>}
      <div
        className={styles.tagInput__field}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag, i) => (
          <span key={`${tag}-${i}`} className={styles.tagInput__chip}>
            {tag}
            <button
              type="button"
              className={styles.tagInput__remove}
              onClick={(e) => {
                e.stopPropagation();
                removeTag(i);
              }}
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (inputValue.trim()) addTag(inputValue);
          }}
          placeholder={value.length === 0 ? placeholder : ''}
          className={styles.tagInput__input}
        />
      </div>
      <span className={styles.tagInput__hint}>Press Enter or comma to add · Backspace to remove last</span>
    </div>
  );
};

export default TagInput;
