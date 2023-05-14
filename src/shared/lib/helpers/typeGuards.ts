export const isObject = (value: unknown): value is object =>
  Boolean(Boolean(value) && typeof value === 'object' && !Array.isArray(value));

export const isArray = (value: unknown): value is Array<unknown> => Boolean(value && Array.isArray(value));

export const isPrimitive = (value: unknown): value is number | string | boolean =>
  ['boolean', 'number', 'string'].includes(typeof value);
