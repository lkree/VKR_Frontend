import type { State } from './types';

interface DefaultRootState {
  $leftoversTable: State;
}

const selectLeftoversTableState = (state: DefaultRootState) => state.$leftoversTable;

export const selectLeftoversList = (state: DefaultRootState) => selectLeftoversTableState(state).leftoversList;
export const selectIsLoading = (state: DefaultRootState) => selectLeftoversTableState(state).status === 'loading';
