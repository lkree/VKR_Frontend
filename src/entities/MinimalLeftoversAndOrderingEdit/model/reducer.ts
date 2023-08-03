import { createReducer } from '@reduxjs/toolkit';

import { getMinimalLeftoversList, setMinimalLeftover, setMinimalLeftoversList } from './actions';
import type { State } from './types';

const initialState: State = { minimalLeftoversArray: null, status: 'idle' };

export const $minimalLeftovers = createReducer(initialState, builder => {
  builder
    .addCase(setMinimalLeftoversList, (state, { payload }) => {
      state.minimalLeftoversArray = payload;
    })
    .addCase(setMinimalLeftover, (state, { payload }) => {
      if (state.minimalLeftoversArray) {
        state.minimalLeftoversArray = state.minimalLeftoversArray.map(minimalLeftovers =>
          minimalLeftovers.cityName === payload.cityName ? payload : minimalLeftovers
        );
      } else {
        state.minimalLeftoversArray = [payload];
      }
    })
    .addCase(getMinimalLeftoversList.pending, state => {
      state.status = 'loading';
    })
    .addCase(getMinimalLeftoversList.fulfilled, state => {
      state.status = 'idle';
    })
    .addCase(getMinimalLeftoversList.rejected, state => {
      state.status = 'idle';
    });
});
