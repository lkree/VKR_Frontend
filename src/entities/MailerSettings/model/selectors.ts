import type { State } from './types';

interface DefaultRootState {
  $minimalLeftovers: State;
}

const selectMinimalLeftoversState = (state: DefaultRootState) => state.$minimalLeftovers;

export const selectIsLoading = (state: DefaultRootState) => selectMinimalLeftoversState(state).status === 'loading';
export const selectMinimalLeftoversArray = (state: DefaultRootState) =>
  selectMinimalLeftoversState(state).minimalLeftoversArray;
