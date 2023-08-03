import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import type { History } from 'history';

import { adminReducer } from '~/pages/Admin';
import { appReducer } from '~/pages/App';
import { login } from '~/pages/Login';

import { common } from '~/shared/models/commonStores';
import { session } from '~/shared/models/session';

export const getRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    login,
    session,
    common,
    ...adminReducer,
    ...appReducer,
  });
