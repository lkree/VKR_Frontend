import { logout as logoutApi } from '~/shared/api/user';
import { createAppAsyncThunk, actions as userActions } from '~/shared/models/commonStores';
import { AuthStatus, actions as sessionActions } from '~/shared/models/session';

const computeActionName = (actionName: string) => `logout/${actionName}`;

export const logout = createAppAsyncThunk<void, void>(computeActionName('logout'), (_, { dispatch }) =>
  logoutApi().then(() => {
    dispatch(sessionActions.setAuthStatus(AuthStatus.Anonymous));
    dispatch(userActions.setUser(null));
  })
);
