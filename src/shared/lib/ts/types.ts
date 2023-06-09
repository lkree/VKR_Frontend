import type { noop } from 'lodash';

export type Nullable<T> = T | null;
export type Voidable<T> = T | undefined;
export type noop = typeof noop;

export type fn = (...args: any[]) => any;
