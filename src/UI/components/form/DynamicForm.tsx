import styles from './styles.module.scss';

import React, { useEffect, useImperativeHandle, useState } from 'react';
import { LabeledInput } from './Input';
import { LabeledTextarea } from './TextArea';
import { LabeledImageInput } from './ImageInput';

// ---- Types (no `any`) ----

type SelectOption<V> = string | { label: string; value: V };

type FieldConfig<T> =
  | { label?: string; type: 'text' | 'textarea' }
  | { label?: string; type: 'number' }
  | { label?: string; type: 'image' }
  | { label?: string; type: 'checkbox' }
  | {
      label?: string;
      type: 'select';
      options: Array<SelectOption<T extends string | number ? T : string>>;
    }
  | {
      label?: string;
      type: 'object';
      fields: FieldConfigMap<
        T extends Record<string, unknown> ? T : Record<string, unknown>
      >;
    }
  | {
      label?: string;
      type: 'array';
      itemConfig: FieldConfig<T extends Array<infer U> ? U : unknown>;
    };

export type FieldConfigMap<T> = { [K in keyof T]?: FieldConfig<T[K]> };

export type DynamicFormProps<T extends Record<string, unknown>> = {
  value: T;
  config: FieldConfigMap<T>;
};
export type DynamicFormHandle<T> = {
  getData: () => T;
};

// ---- Helpers ----
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const isArray = <U,>(v: unknown): v is U[] => Array.isArray(v);

// ---- Component ----

function DynamicFormInner<T extends Record<string, unknown>>(
  { value, config }: DynamicFormProps<T>,
  ref: React.Ref<DynamicFormHandle<T>>
) {
  const [data, setData] = useState<T>(value);

  const handleChange = <K extends keyof T>(key: K, val: T[K]) => {
    setData((prev) => ({ ...prev, [key]: val }));
  };

  useEffect(() => {
    setData(value);
  }, [value]);

  useImperativeHandle(
    ref,
    () => ({
      getData: () => data,
    }),
    [data]
  );

  return (
    <form className={styles.form}>
      {Object.entries(config).map(([key, cfg]) => {
        const fieldKey = key as keyof T;
        const fieldVal = data[fieldKey];
        const label = (cfg as { label?: string }).label ?? String(fieldKey);

        switch ((cfg as { type: string }).type) {
          case 'text':
          case 'number': {
            const isNumber =
              (cfg as { type: 'number' | 'text' }).type === 'number';
            const inputValue: string | number = isNumber
              ? typeof fieldVal === 'number'
                ? fieldVal
                : ''
              : String(fieldVal ?? '');

            return (
              <LabeledInput
                sizeStyle="sm"
                key={key}
                label={label}
                type={isNumber ? 'number' : 'text'}
                value={inputValue}
                onChange={(e) => {
                  const raw = e.target.value;
                  const val = (
                    isNumber ? (raw === '' ? undefined : Number(raw)) : raw
                  ) as T[typeof fieldKey];
                  handleChange(fieldKey, val);
                }}
              />
            );
          }
          case 'textarea': {
            return (
              <LabeledTextarea
                key={key}
                sizeStyle="sm"
                label={label}
                value={String(fieldVal ?? '')}
                onChange={(e) =>
                  handleChange(fieldKey, e.target.value as T[typeof fieldKey])
                }
              />
            );
          }
          case 'image': {
            return (
              <LabeledImageInput key={key} label={label} ratioPercent={1} />
            );
          }
          case 'checkbox': {
            return (
              <div key={key} className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  checked={Boolean(fieldVal)}
                  onChange={(e) =>
                    handleChange(
                      fieldKey,
                      e.target.checked as T[typeof fieldKey]
                    )
                  }
                  className="mr-2"
                />
                <label>{label}</label>
              </div>
            );
          }
          case 'select': {
            const options = (
              cfg as Extract<FieldConfig<unknown>, { type: 'select' }>
            ).options;
            return (
              <div key={key} className="mb-4">
                <label className="block font-medium mb-1">{label}</label>
                <select
                  value={
                    typeof fieldVal === 'string' || typeof fieldVal === 'number'
                      ? (fieldVal as string | number)
                      : ''
                  }
                  onChange={(e) => {
                    const v = e.target.value as unknown as T[typeof fieldKey];
                    handleChange(fieldKey, v);
                  }}
                  className="w-full border px-2 py-1 rounded">
                  {options?.map((opt) =>
                    typeof opt === 'string' ? (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ) : (
                      <option key={String(opt.value)} value={String(opt.value)}>
                        {opt.label}
                      </option>
                    )
                  )}
                </select>
              </div>
            );
          }
          case 'object': {
            const fields = (
              cfg as Extract<FieldConfig<unknown>, { type: 'object' }>
            ).fields as FieldConfigMap<
              T[typeof fieldKey] extends Record<string, unknown>
                ? T[typeof fieldKey]
                : Record<string, unknown>
            >;

            const childVal = isRecord(fieldVal)
              ? (fieldVal as T[typeof fieldKey])
              : ({} as T[typeof fieldKey]);

            return (
              <fieldset key={key} className="border p-4 mb-4 rounded">
                <legend className="font-semibold mb-2">{label}</legend>
                <DynamicForm
                  // @ts-expect-error generic inference through forwardRef wrapper
                  value={childVal}
                  config={
                    fields as unknown as FieldConfigMap<Record<string, unknown>>
                  }
                />
              </fieldset>
            );
          }
          case 'array': {
            const itemConfig = (
              cfg as Extract<FieldConfig<unknown>, { type: 'array' }>
            ).itemConfig as FieldConfig<
              T[typeof fieldKey] extends Array<infer U> ? U : unknown
            >;

            const arr = isArray<
              T[typeof fieldKey] extends Array<infer U> ? U : never
            >(fieldVal)
              ? (fieldVal as unknown as (T[typeof fieldKey] extends Array<
                  infer U
                >
                  ? U
                  : never)[])
              : [];

            return (
              <div key={key} className="mb-4">
                <label className="block font-medium mb-2">{label}</label>
                {arr.map((item, idx) => (
                  <div key={idx} className="flex items-start mb-2">
                    <DynamicForm
                      value={item as unknown as Record<string, unknown>}
                      config={
                        (
                          itemConfig as Extract<
                            FieldConfig<unknown>,
                            { type: 'object' }
                          >
                        ).type === 'object'
                          ? ((
                              itemConfig as Extract<
                                FieldConfig<unknown>,
                                { type: 'object' }
                              >
                            ).fields as FieldConfigMap<Record<string, unknown>>)
                          : ({
                              value: {
                                type: (itemConfig as { type: string }).type as
                                  | 'text'
                                  | 'textarea'
                                  | 'number'
                                  | 'image'
                                  | 'checkbox'
                                  | 'select',
                              },
                            } as unknown as FieldConfigMap<
                              Record<string, unknown>
                            >)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const current = isArray(fieldVal)
                          ? [...(fieldVal as unknown[])]
                          : [];
                        current.splice(idx, 1);
                        handleChange(
                          fieldKey,
                          current as unknown as T[typeof fieldKey]
                        );
                      }}
                      className="ml-2 text-red-500">
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const current = isArray(fieldVal)
                      ? [...(fieldVal as unknown[])]
                      : [];
                    const toAdd = (
                      (itemConfig as { type: string }).type === 'object'
                        ? {}
                        : ''
                    ) as unknown;
                    current.push(toAdd);
                    handleChange(
                      fieldKey,
                      current as unknown as T[typeof fieldKey]
                    );
                  }}
                  className="text-blue-600">
                  Add Item
                </button>
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </form>
  );
}

// `forwardRef` + generics dance with precise callable signature
export const DynamicForm = React.forwardRef(DynamicFormInner) as <
  T extends Record<string, unknown>
>(
  props: DynamicFormProps<T> & { ref?: React.Ref<DynamicFormHandle<T>> }
) => React.ReactElement | null;

export type { FieldConfig };
