import { createAction } from '@reduxjs/toolkit';
import type { Nullable } from 'lkree-common-utils/ts';

import type { User } from '~/shared/api/user';

import type { CommonState } from './types';

const computeActionName = (actionName: string) => `common/${actionName}`;

export const setUser = createAction<Nullable<User>>(computeActionName('setUser'));

export const setErrorsMessage = createAction<CommonState['errors']['messagesList'][number]>(
  computeActionName('setErrorsMessage')
);

export const cleanErrors = createAction(computeActionName('cleanErrors'));

export const addAlertsSettings = createAction<CommonState['alertsSettingsList'][number]>(
  computeActionName('addAlertsSettings')
);

export const cleanAlertsSettings = createAction(computeActionName('cleanAlertsSettings'));

export const addModalSettings = createAction<CommonState['modalSettingsList'][number]>(
  computeActionName('addModalSettings')
);

export const cleanModalSettings = createAction(computeActionName('cleanModalSettings'));
