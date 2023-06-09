import { createReducer } from '@reduxjs/toolkit';

import { setEmail, setPassword, submit } from './actions';

const initialState = { email: '', password: '', isLoading: false };

export const login = createReducer(initialState, builder => {
  builder
    .addCase(setEmail, (state, { payload }) => {
      state.email = payload;
    })
    .addCase(setPassword, (state, { payload }) => {
      state.password = payload;
    })
    .addCase(submit.pending, state => {
      state.isLoading = true;
    })
    .addCase(submit.fulfilled, state => {
      state.isLoading = false;
    })
    .addCase(submit.rejected, state => {
      state.isLoading = false;
    });
});
