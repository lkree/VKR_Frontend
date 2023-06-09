import { createReducer } from '@reduxjs/toolkit';

import { setCities, setNewCityName, setNewCityPrefix, setShowNewCityForm } from './actions';
import type { State } from './types';

const initialState: State = { cities: null, newCityName: '', newCityPrefix: '', showNewCityForm: false };

export const $citiesPrefixEdit = createReducer(initialState, builder => {
  builder
    .addCase(setCities, (state, { payload }) => {
      state.cities = payload;
    })
    .addCase(setNewCityName, (state, { payload }) => {
      state.newCityName = payload.trim();
    })
    .addCase(setNewCityPrefix, (state, { payload }) => {
      state.newCityPrefix = payload.trim();
    })
    .addCase(setShowNewCityForm, (state, { payload }) => {
      state.showNewCityForm = payload;
    });
});
