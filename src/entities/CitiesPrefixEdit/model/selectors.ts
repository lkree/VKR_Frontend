import { State } from './types';

interface DefaultRootState {
  $citiesPrefixEdit: State;
}

const selectCitiesPrefixEditState = (state: DefaultRootState) => state.$citiesPrefixEdit;

export const selectCities = (state: DefaultRootState) => selectCitiesPrefixEditState(state).cities;
export const selectNewCityName = (state: DefaultRootState) => selectCitiesPrefixEditState(state).newCityName;
export const selectNewCityPrefix = (state: DefaultRootState) => selectCitiesPrefixEditState(state).newCityPrefix;
export const selectShowNewCityForm = (state: DefaultRootState) => selectCitiesPrefixEditState(state).showNewCityForm;
