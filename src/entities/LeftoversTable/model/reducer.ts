import { createReducer } from '@reduxjs/toolkit';

import { setLeftoversList, getLeftoversList } from './actions';
import type { State } from './types';

const initialState: State = {
  leftoversList: null,
  status: 'idle',
};

export const $leftoversTable = createReducer(initialState, builder => {
  builder
    .addCase(setLeftoversList, (state, { payload }) => {
      state.leftoversList = payload;
    })
    .addCase(getLeftoversList.pending, state => {
      state.status = 'loading';
    })
    .addCase(getLeftoversList.fulfilled, state => {
      state.status = 'idle';
    })
    .addCase(getLeftoversList.rejected, state => {
      state.status = 'idle';
    });
});
