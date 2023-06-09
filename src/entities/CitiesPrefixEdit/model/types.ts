import type { Nullable } from '~/shared/lib/ts';

import type { CitiesPrefixes } from '../api';

export interface State {
  cities: Nullable<CitiesPrefixes>;
  newCityName: string;
  newCityPrefix: string;
  showNewCityForm: boolean;
}
