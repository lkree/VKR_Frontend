import { createReducer } from '@reduxjs/toolkit';

import { setUser } from '~/shared/models/commonStores/actions';

import { CommonState } from './types';

const initialState: CommonState = { user: null };

export const common = createReducer(initialState, builder => {
  builder.addCase(setUser, (state, { payload }) => {
    state.user = payload;
  });
});
