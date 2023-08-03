import { createAction } from '@reduxjs/toolkit';

import * as api from '~/shared/api/user';
import { createAppAsyncThunk, actions } from '~/shared/models/commonStores';

import type { AuthStatus } from './const';

const computeActionName = (actionName: string) => `session/${actionName}`;

export const setAuthStatus = createAction<AuthStatus>(computeActionName('setAuthStatus'));
export const loadSession = createAppAsyncThunk<api.SessionResponse, void>(
  computeActionName('loadSession'),
  (_, { dispatch }) =>
    api.loadSession().then(d => {
      dispatch(actions.setUser(d));

      return d;
    })
);
