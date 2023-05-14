import { isPrimitive, isObject, isArray } from './typeGuards';

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const compose =
  <T extends (...args: any[]) => any>(...fns: T[]) =>
  <K extends (...args: any[]) => any>(fn: K): K =>
    fns.reduce((result, current) => current(result), fn);

type Value<T> = T extends boolean | number | string
  ? T
  : T extends unknown[] | Record<string, any>
  ? T[keyof T]
  : never;

type ReturnValue<T, K> = T extends boolean | number | string
  ? K
  : T extends unknown[] | Record<string, any>
  ? { [Key in keyof T]: K }
  : never;

export const forEachValue = <T, K extends (value: Value<T>) => any>(
  data: T,
  callback: K
): ReturnValue<T, ReturnType<K>> =>
  isPrimitive(data)
    ? (callback(data as Value<T>) as ReturnValue<T, ReturnType<K>>)
    : Object.entries(data).reduce((r, [name, value]) => {
        r[name as keyof typeof r] = isObject(value)
          ? forEachValue(value, callback)
          : Array.isArray(value)
          ? value.map(c => forEachValue(c, callback))
          : callback(value as Value<T>);

        return r;
      }, data as ReturnValue<T, ReturnType<K>>);

export const forEachKey = <T extends Record<string, any>>(
  data: T,
  callback: (key: string) => string
): Record<ReturnType<typeof callback>, T[keyof T]> =>
  Object.entries(data).reduce((r, [name, value]) => {
    r[callback(name)] = isObject(value) || isArray(value) ? forEachKey(value, callback) : value;

    return r;
  }, (isObject(data) ? {} : []) as Record<ReturnType<typeof callback>, T[keyof T]>);

export const deepClone = <T>(d: T): T => JSON.parse(JSON.stringify(d));

export const clone = <T>(d: T): T => JSON.parse(JSON.stringify(d));

export const equal = <T, K>(a: T, b: K) => JSON.stringify(a) === JSON.stringify(b);
