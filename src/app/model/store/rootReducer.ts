import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import type { History } from 'history';

import { reducers as adminReducers } from '~/pages/Admin';
import { app } from '~/pages/App';
import { login } from '~/pages/Login';

import { common } from '~/shared/models/commonStores';
import { session } from '~/shared/models/session';

export const getRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    app,
    login,
    session,
    common,
    ...adminReducers,
  });
