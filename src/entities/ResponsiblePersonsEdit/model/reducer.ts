import { createReducer } from '@reduxjs/toolkit';

import { setResponsiblePersonsArray, setResponsiblePerson } from './actions';
import type { State } from './types';

const initialState: State = {
  responsiblePersonArray: null,
};

export const $responsiblePersons = createReducer(initialState, builder => {
  builder
    .addCase(setResponsiblePersonsArray, (state, { payload }) => {
      state.responsiblePersonArray = payload;
    })
    .addCase(setResponsiblePerson, (state, { payload }) => {
      if (state.responsiblePersonArray) {
        state.responsiblePersonArray = state.responsiblePersonArray.map(p =>
          p.cityName === payload.cityName ? payload : p
        );
      } else {
        state.responsiblePersonArray = [payload];
      }
    });
});
