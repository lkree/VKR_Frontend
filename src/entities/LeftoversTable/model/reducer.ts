import { createReducer } from '@reduxjs/toolkit';

import { setLocalMailSettings, setReceivedMailSettings, uploadMailSettings, downloadMailSettings } from './actions';
import type { State } from './types';

const initialState: State = {
  localSettings: { port: 0, host: '', user: '', password: '', secure: false },
  downloadingStatus: 'idle',
  uploadingStatus: 'idle',
  receivedSettings: null,
};

export const $mailerSettings = createReducer(initialState, builder => {
  builder
    .addCase(setLocalMailSettings, (state, { payload }) => {
      state.localSettings = { ...state.localSettings, ...payload };
    })
    .addCase(setReceivedMailSettings, (state, { payload }) => {
      state.receivedSettings = payload;
    })
    .addCase(uploadMailSettings.pending, state => {
      state.uploadingStatus = 'loading';
    })
    .addCase(uploadMailSettings.fulfilled, state => {
      state.uploadingStatus = 'idle';
    })
    .addCase(uploadMailSettings.rejected, state => {
      state.uploadingStatus = 'idle';
    })
    .addCase(downloadMailSettings.pending, state => {
      state.downloadingStatus = 'loading';
    })
    .addCase(downloadMailSettings.fulfilled, state => {
      state.downloadingStatus = 'idle';
    })
    .addCase(downloadMailSettings.rejected, state => {
      state.downloadingStatus = 'idle';
    });
});
