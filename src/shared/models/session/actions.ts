import { createAction } from '@reduxjs/toolkit';

import { loadSession as getSession, SessionResponse } from '~/shared/api/user';
import { createAppAsyncThunk, actions } from '~/shared/models/commonStores';

import type { AuthStatus } from './const';

const computeActionName = (actionName: string) => `session/${actionName}`;

export const setAuthStatus = createAction<AuthStatus>(computeActionName('setAuthStatus'));
export const loadSession = createAppAsyncThunk<SessionResponse, void>(
  computeActionName('loadSession'),
  (_, { dispatch }) =>
    getSession().then(d => {
      console.log(d);
      dispatch(actions.setUser(d));

      return d;
    })
);
