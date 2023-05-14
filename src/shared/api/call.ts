import { computeHeaders, getJSONHeaders, toCamelCase } from '~/shared/api/helpers';

export enum BuiltInHeaders {
  JSON = 'json',
}

interface Headers {
  builtIn?: Array<BuiltInHeaders>;
  own?: Record<string, string>;
}

interface Props {
  url: string;
  options?: {
    headers?: Headers;
    body?: any;
  } & Omit<RequestInit, 'body' | 'headers'>;
  resultType?: 'text' | 'json';
}

const computeHeadersObject = (headers: Headers) =>
  !headers
    ? headers
    : computeHeaders({
        ...(headers.builtIn?.includes(BuiltInHeaders.JSON) && getJSONHeaders()),
        ...(headers.own && headers.own),
      });

const computeOptions = (options?: Props['options']) =>
  !options
    ? options
    : {
        ...options,
        ...(options.body && { body: JSON.stringify(options.body) }),
        ...(options.headers && { headers: computeHeadersObject(options.headers) }),
      };

export const call = <T>({ url, options, resultType = 'json' }: Props): Promise<T> =>
  fetch(url, computeOptions(options))
    .then(d => d[resultType]())
    .then(toCamelCase);
