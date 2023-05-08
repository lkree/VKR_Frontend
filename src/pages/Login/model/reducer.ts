import { createReducer } from '@reduxjs/toolkit';

import { setIsLoggedIn } from './actions';

const initialState = { isLoggedIn: true };

export const login = createReducer(initialState, builder => {
  builder.addCase(setIsLoggedIn, (state, { payload }) => {
    state.isLoggedIn = payload;
  });
});
