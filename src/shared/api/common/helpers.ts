import { camelCase, snakeCase } from 'lodash';

import { forEachKey } from '~/shared/lib/helpers';

export const computeHeaders = (headers: Record<string, string>) =>
  Object.entries(headers).reduce((result, [key, value]) => {
    result.append(key, value);

    return result;
  }, new Headers());

export const computeGetParams = (params: Record<string, string>) =>
  Object.entries(params).reduce((result, [key, value]) => {
    result.append(key, value);

    return result;
  }, new URLSearchParams());

export const toSnakeCase = <T extends Record<string, any>>(data: T): T => forEachKey(data, snakeCase) as T;

export const toCamelCase = <T extends Record<string, any>>(data: T): T => forEachKey(data, camelCase) as T;

export const getJSONHeaders = () => ({ 'Content-Type': 'application/json' });

export const computeApiPathWithDomain = (domain: string, path: string) => `/api/${domain}/${path}`;
