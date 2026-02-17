/**
 * Lightweight className joiner (similar to `clsx` / `classnames`).
 * - Accepts strings, numbers, arrays and objects.
 * - Objects include keys with truthy values.
 *
 * Examples:
 *   cn('a', { active: isActive }, ['x','y'], 0) => 'a x y 0'
 */

type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassDictionary
  | ClassArray;

interface ClassDictionary {
  [key: string]: any;
}

interface ClassArray extends Array<ClassValue> {}

export const cn = (...inputs: ClassValue[]): string => {
  const out: string[] = [];

  const add = (val: ClassValue) => {
    if (val === null || val === undefined || val === false) return;
    if (typeof val === 'string' || typeof val === 'number') {
      out.push(String(val));
      return;
    }
    if (Array.isArray(val)) {
      val.forEach(add);
      return;
    }
    if (typeof val === 'object') {
      for (const key in val as ClassDictionary) {
        if (
          Object.prototype.hasOwnProperty.call(val, key) &&
          (val as ClassDictionary)[key]
        ) {
          out.push(key);
        }
      }
    }
  };

  inputs.forEach(add);
  return out.join(' ');
};