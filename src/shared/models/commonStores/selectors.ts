import type { DefaultRootState } from 'react-redux';

import { AccessLevels } from '~/shared/const';

const selectCommonState = (state: DefaultRootState) => state.common;

export const selectIsAdmin = (state: DefaultRootState) =>
  selectCommonState(state).user?.accessLevel === AccessLevels.Admin;

export const selectUser = (state: DefaultRootState) => selectCommonState(state).user;
