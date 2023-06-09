import type { Nullable } from '~/shared/lib/ts';

import type { MinimalLeftovers } from '../types';

export interface State {
  minimalLeftoversArray: Nullable<Array<MinimalLeftovers>>;
  status: 'idle' | 'loading';
}
