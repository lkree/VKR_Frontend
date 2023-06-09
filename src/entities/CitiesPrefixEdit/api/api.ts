import { BuiltInHeaders, call } from '~/shared/api/common';

import { Methods } from './const';
import type { AddCityRequest, RemoveCityRequest, SuccessResponse } from './types';

export const addCityPrefix = (data: AddCityRequest) =>
  call<SuccessResponse>({
    url: Methods.Add,
    options: {
      method: 'POST',
      body: data,
      headers: { builtIn: [BuiltInHeaders.JSON] },
    },
  });

export const removeCityPrefix = (data: RemoveCityRequest) =>
  call<SuccessResponse>({
    url: Methods.Delete,
    options: {
      method: 'POST',
      body: data,
      headers: { builtIn: [BuiltInHeaders.JSON] },
    },
  });

export const getAllCitiesPrefixes = () => call<SuccessResponse>({ url: Methods.GetAll });
