import { createReducer } from '@reduxjs/toolkit';

import {
  cleanErrors,
  setErrorsMessage,
  setUser,
  cleanAlertsSettings,
  addAlertsSettings,
  addModalSettings,
  cleanModalSettings,
} from './actions';
import type { CommonState } from './types';

const initialState: CommonState = {
  user: null,
  errors: { messagesList: [] },
  alertsSettingsList: [],
  modalSettingsList: [],
};

export const common = createReducer(initialState, builder => {
  builder
    .addCase(setUser, (state, { payload }) => {
      state.user = payload;
    })
    .addCase(setErrorsMessage, (state, { payload }) => {
      state.errors.messagesList.push(payload);
    })
    .addCase(cleanErrors, state => {
      state.errors.messagesList.length = 0;
    })
    .addCase(addAlertsSettings, (state, { payload }) => {
      (state.alertsSettingsList as CommonState['alertsSettingsList']).push(payload);
    })
    .addCase(cleanAlertsSettings, state => {
      state.alertsSettingsList.length = 0;
    })
    .addCase(addModalSettings, (state, { payload }) => {
      state.modalSettingsList.push(payload);
    })
    .addCase(cleanModalSettings, state => {
      state.modalSettingsList.length = 0;
    });
});
