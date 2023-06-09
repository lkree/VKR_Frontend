import { createAction } from '@reduxjs/toolkit';

import { actions as minimalLeftoversAndOrderingActions } from '~/entities/MinimalLeftoversAndOrderingEdit';

import { createAppAsyncThunk } from '~/shared/models/commonStores';

import * as api from '../api';

import type { State } from './types';

const computeActionName = (actionName: string) => `citiesPrefixEdit/${actionName}`;

export const setDate = createAction<Pick<State, 'uploadDate' | 'lastUpdatedDate'>>(computeActionName('setUploadDate'));

export const uploadFile = createAppAsyncThunk<Promise<void>, File>(
  computeActionName('uploadFile'),
  (file, { dispatch }) => api.uploadFile(file).then(() => dispatch(getUploadDate())) as Promise<void>
);

export const getUploadDate = createAppAsyncThunk<Promise<void>, void>(
  computeActionName('getUploadDate'),
  (_, { dispatch }) =>
    api
      .getFileInfo()
      .then(({ uploadDate, lastUpdatedDate = null }) =>
        dispatch(setDate({ uploadDate, lastUpdatedDate }))
      ) as Promise<void>
);

export const acceptFile = createAppAsyncThunk<Promise<void>, void>(
  computeActionName('acceptFile'),
  (_, { dispatch }) =>
    api.acceptFile().then(({ uploadDate, lastUpdatedDate = null }) => {
      dispatch(setDate({ uploadDate, lastUpdatedDate }));
      void dispatch(minimalLeftoversAndOrderingActions.getMinimalLeftoversArray());
    }) satisfies Promise<void>
);
