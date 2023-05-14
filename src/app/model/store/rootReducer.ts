import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import type { History } from 'history';

import { app } from '~/pages/App';

import { session } from '~/shared/models/session';

export const getRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    app,
    session,
  });
