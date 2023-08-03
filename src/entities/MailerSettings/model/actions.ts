import { createAction } from '@reduxjs/toolkit';

import { createAppAsyncThunk } from '~/shared/models/commonStores';

import * as api from '../api';
import type { MailSettings, ReceivedMailSettings } from '../types';

import { selectLocalMailerSettings, selectReceivedMailerSettings } from './selectors';

const computeActionName = (actionName: string) => `minimalLeftovers/${actionName}`;

export const setLocalMailSettings = createAction<Partial<MailSettings>>(computeActionName('setLocalMailSettings'));
export const setReceivedMailSettings = createAction<ReceivedMailSettings>(computeActionName('setReceivedMailSettings'));

export const downloadMailSettings = createAppAsyncThunk<Promise<void>, void>(
  computeActionName('downloadMailSettings'),
  (_, { dispatch }) =>
    api.getMailSettings().then(d => {
      dispatch(setLocalMailSettings(d));
      dispatch(setReceivedMailSettings(d));
    }) satisfies Promise<void>
);

export const uploadMailSettings = createAppAsyncThunk<Promise<void>, void>(
  computeActionName('uploadMailSettings'),
  (_, { dispatch, getState }) => {
    const state = getState();
    const settings = { ...selectReceivedMailerSettings(state), ...selectLocalMailerSettings(state) };

    return api.writeMailSettings(settings).then(d => {
      dispatch(setLocalMailSettings(d));
      dispatch(setReceivedMailSettings(d));
    }) satisfies Promise<void>;
  }
);
