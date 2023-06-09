import { createAction } from '@reduxjs/toolkit';

import { selectEmailPassword } from '~/pages/Login';

import { login, LoginResponse } from '~/shared/api/user';
import { createAppAsyncThunk } from '~/shared/models/commonStores';
import { actions } from '~/shared/models/session';

const computeActionName = (actionName: string) => `login/${actionName}`;

export const setEmail = createAction<string>(computeActionName('setEmail'));
export const setPassword = createAction<string>(computeActionName('setPassword'));

export const submit = createAppAsyncThunk<LoginResponse, void>(
  computeActionName('submit'),
  (_, { getState, dispatch }) =>
    login(selectEmailPassword(getState())).then(d => {
      void dispatch(actions.loadSession());

      return d;
    })
);
