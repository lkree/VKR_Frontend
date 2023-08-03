import type { State } from './types';

interface DefaultRootState {
  $minimalLeftovers: State;
}

const selectMinimalLeftoversState = (state: DefaultRootState) => state.$minimalLeftovers;

export const selectIsLoading = (state: DefaultRootState) => selectMinimalLeftoversState(state).status === 'loading';
export const selectMinimalLeftoversList = (state: DefaultRootState) =>
  selectMinimalLeftoversState(state).minimalLeftoversArray;
export const selectMinimalLeftoversListIsEmpty = (state: DefaultRootState) =>
  (selectMinimalLeftoversState(state).minimalLeftoversArray?.length ?? 0) === 0;
