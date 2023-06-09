import { createAction } from '@reduxjs/toolkit';

import type { User } from '~/shared/api/user';
import type { Nullable } from '~/shared/lib/ts';

const computeActionName = (actionName: string) => `common/${actionName}`;

export const setUser = createAction<Nullable<User>>(computeActionName('setUser'));
