import { createAction } from '@reduxjs/toolkit';

import { downloadResponsiblePersonsArray } from '~/entities/ResponsiblePersonsEdit/model/actions';

import { createAppAsyncThunk } from '~/shared/models/commonStores';

import { addCityPrefix, CitiesPrefixes, getAllCitiesPrefixes, removeCityPrefix } from '../api';

import { selectNewCityName, selectNewCityPrefix } from './selectors';
import type { State } from './types';

const computeActionName = (actionName: string) => `citiesPrefixEdit/${actionName}`;

export const setCities = createAction<State['cities']>(computeActionName('setCities'));
export const setNewCityName = createAction<State['newCityName']>(computeActionName('setNewCityName'));
export const setNewCityPrefix = createAction<State['newCityPrefix']>(computeActionName('setNewCityPrefix'));
export const setShowNewCityForm = createAction<State['showNewCityForm']>(computeActionName('setShowNewCityForm'));

export const downloadCities = createAppAsyncThunk<Promise<void>, void>(
  computeActionName('downloadCities'),
  async (_, { dispatch }) => {
    const cities = await getAllCitiesPrefixes();

    dispatch(setCities(cities));
  }
);

export const saveNewCityItem = createAppAsyncThunk<Promise<void> | void, void>(
  computeActionName('saveNewCityItem'),
  (_, { getState, dispatch }) => {
    const state = getState();

    const prefix = selectNewCityPrefix(state);
    const name = selectNewCityName(state);

    if (name && prefix) {
      dispatch(setShowNewCityForm(false));
      dispatch(setNewCityName(''));
      dispatch(setNewCityPrefix(''));

      return addCityPrefix({ prefix, name })
        .then(cities => dispatch(setCities(cities)))
        .then(() => dispatch(downloadResponsiblePersonsArray())) as Promise<void>;
    }

    return void 0;
  }
);

export const deleteCity = createAppAsyncThunk<Promise<void>, CitiesPrefixes[number]>(
  computeActionName('deleteCity'),
  (cityToRemove, { dispatch }) =>
    removeCityPrefix({ prefix: cityToRemove[1] }).then(d => {
      dispatch(setCities(d));
      void dispatch(downloadResponsiblePersonsArray());
    }) satisfies Promise<void>
);
