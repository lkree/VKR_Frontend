import type { Nullable } from 'lkree-common-utils/ts';

import type { MinimalLeftovers } from '../types';

export interface State {
  status: 'idle' | 'loading';
  minimalLeftoversArray: Nullable<Array<MinimalLeftovers>>;
}
