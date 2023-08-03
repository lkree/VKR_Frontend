import { createAction } from '@reduxjs/toolkit';
import type { Nullable } from 'lkree-common-utils/ts';

import { createAppAsyncThunk } from '~/shared/models/commonStores';

import * as api from '../api';
import type { Leftover, LeftoversList } from '../types';

import { selectLeftoversList } from './selectors';

const computeActionName = (actionName: string) => `leftovers/${actionName}`;

export const setLeftoversList = createAction<Nullable<LeftoversList>>(computeActionName('setLeftoversList'));

export const getLeftoversList = createAppAsyncThunk<Promise<void>, void>(
  computeActionName('getLeftoversList'),
  (_, { dispatch }) => api.getLeftoversList().then(d => dispatch(setLeftoversList(d))) as Promise<void>
);

export const updateLeftover = createAppAsyncThunk<Promise<void>, Leftover>(
  computeActionName('updateLeftover'),
  (leftover, { dispatch, getState }) =>
    api.updateLeftover(leftover).then(d => {
      const leftoversList = selectLeftoversList(getState());

      dispatch(
        setLeftoversList(
          leftoversList ? leftoversList.map(leftover => (leftover.cityName === d.cityName ? d : leftover)) : [d]
        )
      );
    }) satisfies Promise<void>
);

export const deleteLeftoversList = createAppAsyncThunk<Promise<void>, void>(
  computeActionName('getLeftoversList'),
  (_, { dispatch }) => api.deleteLeftoversList().then(d => dispatch(setLeftoversList(d))) as Promise<void>
);
