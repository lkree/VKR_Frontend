import type { DefaultRootState } from 'react-redux';

import { AuthStatus } from './const';

export const selectSessionState = (state: DefaultRootState) => state.session;

export const selectIsAuthenticated = (state: DefaultRootState) =>
  selectSessionState(state).authStatus === AuthStatus.Authenticated;
