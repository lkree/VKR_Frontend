import type { DefaultRootState } from 'react-redux';

export const selectLoginState = (state: DefaultRootState) => state.login;

export const selectEmail = (state: DefaultRootState) => selectLoginState(state).email;

export const selectPassword = (state: DefaultRootState) => selectLoginState(state).password;

export const selectIsLoading = (state: DefaultRootState) => selectLoginState(state).isLoading;

export const selectEmailPassword = (state: DefaultRootState) => ({
  email: selectEmail(state),
  password: selectPassword(state),
});
