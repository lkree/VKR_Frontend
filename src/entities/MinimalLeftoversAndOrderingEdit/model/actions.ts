import { createAction } from '@reduxjs/toolkit';

import { actions as leftoversActions } from '~/entities/LeftoversTable';

import { createAppAsyncThunk } from '~/shared/models/commonStores';

import * as api from '../api';
import type { MinimalLeftovers, MinimalLeftoversList } from '../types';

import { selectMinimalLeftoversList } from './selectors';

const computeActionName = (actionName: string) => `minimalLeftovers/${actionName}`;

export const setMinimalLeftoversList = createAction<MinimalLeftoversList>(computeActionName('setMinimalLeftoversList'));

export const setMinimalLeftover = createAction<MinimalLeftovers>(computeActionName('setMinimalLeftover'));

export const getMinimalLeftoversList = createAppAsyncThunk<Promise<void>, void>(
  computeActionName('getMinimalLeftoversList'),
  (_, { dispatch }) => api.getMinimalLeftoversArray().then(d => dispatch(setMinimalLeftoversList(d))) as Promise<void>
);

export const writeMinimalLeftover = createAppAsyncThunk<Promise<void>, MinimalLeftovers>(
  computeActionName('writeMinimalLeftover'),
  (minimalLeftover, { dispatch, getState }) =>
    api
      .writeMinimalLeftover(minimalLeftover)
      .then(d =>
        d
          ? dispatch(setMinimalLeftover(d))
          : dispatch(
              setMinimalLeftoversList(
                selectMinimalLeftoversList(getState())?.filter(it => it.cityName !== minimalLeftover.cityName) ?? []
              )
            )
      )
      .then(() => dispatch(leftoversActions.getLeftoversList())) as Promise<void>
);

export const deleteMinimalLeftoversList = createAppAsyncThunk<Promise<void>, void>(
  computeActionName('deleteMinimalLeftovers'),
  (_, { dispatch }) => api.deleteMinimalLeftoversList().then(d => dispatch(setMinimalLeftoversList(d))) as Promise<void>
);
