import type { Nullable } from 'lkree-common-utils/ts';

import type { CitiesPrefixes } from '../api';

export interface State {
  newCityName: string;
  newCityPrefix: string;
  showNewCityForm: boolean;
  cities: Nullable<CitiesPrefixes>;
}
