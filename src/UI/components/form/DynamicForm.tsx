import styles from './styles.module.scss';

import React, { useEffect, useState } from 'react';
import { LabeledInput } from './Input';
import { LabeledTextarea } from './TextArea';
import { LabeledImageInput } from './ImageInput';

export type FieldConfig<T> = {
  label?: string;
  type:
    | 'text'
    | 'textarea'
    | 'number'
    | 'image'
    | 'checkbox'
    | 'select'
    | 'object'
    | 'array';
  options?: Array<string | { label: string; value: any }>;
  fields?: FieldConfigMap<any>;
  itemConfig?: FieldConfig<any>;
};

export type FieldConfigMap<T> = {
  [K in keyof T]?: FieldConfig<T[K]>;
};

export interface DynamicFormProps<T extends Record<string, any>> {
  value: T;
  config: FieldConfigMap<T>;
}

export function DynamicForm<T extends Record<string, any>>({
  value,
  config,
}: DynamicFormProps<T>) {
  const [data, setData] = useState<T>(value);

  const handleChange = <K extends keyof T>(key: K, val: any) => {
    setData({ ...data, [key]: val });
  };

  useEffect(() => {
    setData(value);
  }, [value]);

  return (
    <form className={styles.form}>
      {Object.entries(config).map(([key, cfg]) => {
        const fieldKey = key as keyof T;
        const fieldVal = data[fieldKey];
        if (!cfg) return null;

        const label = cfg.label ?? String(fieldKey);
        switch (cfg.type) {
          case 'text':
          case 'number':
            // Ensure value prop is string or number
            const inputValue =
              cfg.type === 'number'
                ? (fieldVal as any as number)
                : String(fieldVal ?? '');
            return (
              <LabeledInput
                sizeStyle="sm"
                key={key}
                label={label}
                type={cfg.type === 'number' ? 'number' : 'text'}
                value={inputValue as string | number}
                onChange={(e) => {
                  const val =
                    cfg.type === 'number'
                      ? e.target.value === ''
                        ? undefined
                        : +e.target.value
                      : e.target.value;
                  handleChange(fieldKey, val);
                }}
              />
            );
          case 'textarea':
            return (
              <LabeledTextarea
                sizeStyle="sm"
                label={label}
                value={String(fieldVal ?? '')}
                onChange={(e) => handleChange(fieldKey, e.target.value)}
              />
            );
          case 'image':
            return <LabeledImageInput label={label} ratioPercent={1} />;
          case 'checkbox':
            return (
              <div key={key} className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  checked={Boolean(fieldVal)}
                  onChange={(e) => handleChange(fieldKey, e.target.checked)}
                  className="mr-2"
                />
                <label>{label}</label>
              </div>
            );
          case 'select':
            return (
              <div key={key} className="mb-4">
                <label className="block font-medium mb-1">{label}</label>
                <select
                  value={fieldVal as any}
                  onChange={(e) => handleChange(fieldKey, e.target.value)}
                  className="w-full border px-2 py-1 rounded">
                  {cfg.options?.map((opt) =>
                    typeof opt === 'string' ? (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ) : (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    )
                  )}
                </select>
              </div>
            );
          case 'object':
            return (
              <fieldset key={key} className="border p-4 mb-4 rounded">
                <legend className="font-semibold mb-2">{label}</legend>
                <DynamicForm
                  value={fieldVal as Record<string, any>}
                  config={cfg.fields!}
                  //   onChange={(val) => handleChange(fieldKey, val)}
                />
              </fieldset>
            );
          case 'array':
            return (
              <div key={key} className="mb-4">
                <label className="block font-medium mb-2">{label}</label>
                {(fieldVal as any[]).map((item, idx) => (
                  <div key={idx} className="flex items-start mb-2">
                    <DynamicForm
                      value={item}
                      config={
                        cfg.itemConfig!.fields ?? {
                          value: { type: cfg.itemConfig!.type },
                        }
                      }
                      //   onChange={(val) => {
                      //     const newArr = [...(data[fieldKey] as any[])];
                      //     newArr[idx] = val;
                      //     handleChange(fieldKey, newArr);
                      //   }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newArr = [...(data[fieldKey] as any[])];
                        newArr.splice(idx, 1);
                        handleChange(fieldKey, newArr);
                      }}
                      className="ml-2 text-red-500">
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    handleChange(fieldKey, [
                      ...(value[fieldKey] as any[]),
                      cfg.itemConfig?.type === 'object' ? {} : '',
                    ])
                  }
                  className="text-blue-600">
                  Add Item
                </button>
              </div>
            );
          default:
            return null;
        }
      })}
    </form>
  );
}
