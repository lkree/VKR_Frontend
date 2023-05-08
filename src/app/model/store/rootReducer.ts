import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import type { History } from 'history';

import { app } from '@pages/App';
import { login } from '@pages/Login';

export const getRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    app,
    login,
  });
