import { createAction } from '@reduxjs/toolkit';

import { createAppAsyncThunk } from '~/shared/models/commonStores';

import * as api from '../api';
import { SHARED_KEY } from '../const';
import type { MinimalLeftovers, MinimalLeftoversArray } from '../types';

import { selectMinimalLeftoversArray } from './selectors';

const computeActionName = (actionName: string) => `minimalLeftovers/${actionName}`;

export const setMinimalLeftoversArray = createAction(
  computeActionName('setMinimalLeftoversArray'),
  (mla: MinimalLeftoversArray) => ({
    payload: [...mla].sort((a, b) => {
      const aName = a.cityName.toLocaleLowerCase();
      const bName = b.cityName.toLowerCase();

      if (bName === SHARED_KEY) return -1;

      if (aName < bName) return -1;
      if (aName > bName) return 1;

      return 0;
    }),
  })
);

export const setMinimalLeftovers = createAction<MinimalLeftovers>(computeActionName('setMinimalLeftovers'));

export const getMinimalLeftoversArray = createAppAsyncThunk<Promise<void>, void>(
  computeActionName('getMinimalLeftoversArray'),
  (_, { dispatch }) => api.getMinimalLeftoversArray().then(d => dispatch(setMinimalLeftoversArray(d))) as Promise<void>
);

export const writeMinimalLeftover = createAppAsyncThunk<Promise<void>, MinimalLeftovers>(
  computeActionName('writeMinimalLeftover'),
  (minimalLeftovers, { dispatch, getState }) =>
    api
      .writeMinimalLeftovers(minimalLeftovers)
      .then(d =>
        d
          ? dispatch(setMinimalLeftovers(d))
          : dispatch(
              setMinimalLeftoversArray(
                selectMinimalLeftoversArray(getState())?.filter(it => it.cityName !== minimalLeftovers.cityName) ?? []
              )
            )
      ) as Promise<void>
);
