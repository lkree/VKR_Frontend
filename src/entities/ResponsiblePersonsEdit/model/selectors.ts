import type { State } from './types';

interface DefaultRootState {
  $responsiblePersons: State;
}

const selectResponsiblePersons = (state: DefaultRootState) => state.$responsiblePersons;

export const selectResponsiblePersonArray = (state: DefaultRootState) =>
  selectResponsiblePersons(state).responsiblePersonArray;
