import { logout as logoutApi } from '~/shared/api/user';
import { createAppAsyncThunk } from '~/shared/models/commonStores';

const computeActionName = (actionName: string) => `logout/${actionName}`;

export const logout = createAppAsyncThunk<void, void>(computeActionName('logout'), () =>
  logoutApi().then(() => location.reload())
);
