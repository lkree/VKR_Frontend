import { createReducer } from '@reduxjs/toolkit';

import { AuthStatus } from '~/shared/models/session/const';

import { loadSession } from './actions';
import type { SessionState } from './types';

const initialState: SessionState = { sessionData: null, authStatus: AuthStatus.Initial };

export const session = createReducer(initialState, builder => {
  builder
    .addCase(loadSession.pending, state => {
      state.authStatus = AuthStatus.Pending;
    })
    .addCase(loadSession.fulfilled, state => {
      state.authStatus = AuthStatus.Authenticated;
    })
    .addCase(loadSession.rejected, state => {
      state.authStatus = AuthStatus.Anonymous;
    });
});
