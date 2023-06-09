import type { DefaultRootState } from 'react-redux';

import { AuthStatus } from './const';

const selectSessionState = (state: DefaultRootState) => state.session;

export const selectIsAuthenticated = (state: DefaultRootState) =>
  selectSessionState(state).authStatus === AuthStatus.Authenticated;

export const selectIsSessionChecked = (state: DefaultRootState) =>
  selectSessionState(state).authStatus !== AuthStatus.Initial;
