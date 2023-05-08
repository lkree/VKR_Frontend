import { createReducer } from '@reduxjs/toolkit';

import { decrement, increment, set } from './actions';

const initialState = { value: 0 };

export const app = createReducer(initialState, builder => {
  builder
    .addCase(increment, state => {
      state.value += 1;
    })
    .addCase(decrement, state => {
      state.value -= 1;
    })
    .addCase(set, (state, { payload }) => {
      state.value += payload;
    });
});
