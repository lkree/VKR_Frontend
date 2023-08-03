import type { Nullable } from 'lkree-common-utils/ts';

import type { LeftoversList } from '../types';

export interface State {
  status: 'loading' | 'idle';
  leftoversList: Nullable<LeftoversList>;
}
