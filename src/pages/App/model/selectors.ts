import { DefaultRootState } from 'react-redux';

const selectAppState = (state: DefaultRootState) => state.app;

export const selectAppValue = (state: DefaultRootState) => selectAppState(state).value;
