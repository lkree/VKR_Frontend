import { createReducer } from '@reduxjs/toolkit';

import { getMinimalLeftoversArray, setMinimalLeftovers, setMinimalLeftoversArray } from './actions';
import type { State } from './types';

const initialState: State = { minimalLeftoversArray: null, status: 'idle' };

export const $minimalLeftovers = createReducer(initialState, builder => {
  builder
    .addCase(setMinimalLeftoversArray, (state, { payload }) => {
      state.minimalLeftoversArray = payload;
    })
    .addCase(setMinimalLeftovers, (state, { payload }) => {
      if (state.minimalLeftoversArray) {
        state.minimalLeftoversArray = state.minimalLeftoversArray.map(minimalLeftovers =>
          minimalLeftovers.cityName === payload.cityName ? payload : minimalLeftovers
        );
      } else {
        state.minimalLeftoversArray = [payload];
      }
    })
    .addCase(getMinimalLeftoversArray.pending, state => {
      state.status = 'loading';
    })
    .addCase(getMinimalLeftoversArray.fulfilled, state => {
      state.status = 'idle';
    })
    .addCase(getMinimalLeftoversArray.rejected, state => {
      state.status = 'idle';
    });
});
