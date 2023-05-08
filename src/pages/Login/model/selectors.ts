import { DefaultRootState } from 'react-redux';

const selectLoginState = (state: DefaultRootState) => state.login;

export const selectIsLoggedIn = (state: DefaultRootState) => selectLoginState(state).isLoggedIn;
