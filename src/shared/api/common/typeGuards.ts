import { isObject } from '~/shared/lib/helpers/typeGuards';

export const isErrorResponse = (d: unknown) => isObject(d) && 'errors' in d && 'message' in d;
