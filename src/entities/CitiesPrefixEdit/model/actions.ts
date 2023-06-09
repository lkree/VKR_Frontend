import { createAction } from '@reduxjs/toolkit';

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

export const saveNewCityItem = createAppAsyncThunk<void, void>(
  computeActionName('saveNewCityItem'),
  (_, { getState, dispatch }) => {
    const state = getState();

    const cityPrefix = selectNewCityPrefix(state);
    const cityName = selectNewCityName(state);

    if (cityName && cityPrefix) {
      dispatch(setShowNewCityForm(false));
      dispatch(setNewCityName(''));
      dispatch(setNewCityPrefix(''));

      void addCityPrefix({ cityPrefix, cityName }).then(cities => dispatch(setCities(cities)));
    }
  }
);

export const deleteCity = createAppAsyncThunk<void, CitiesPrefixes[number]>(
  computeActionName('deleteCity'),
  (cityToRemove, { dispatch }) => {
    void removeCityPrefix({ cityPrefix: cityToRemove[1] }).then(d => dispatch(setCities(d)));
  }
);
