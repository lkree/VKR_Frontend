import { createSelector } from '@reduxjs/toolkit';
import type { Entries } from 'lkree-common-utils/ts';

import type { MailSettings } from '../types';

import type { State } from './types';

interface DefaultRootState {
  $mailerSettings: State;
}

const selectMailerSettings = (state: DefaultRootState) => state.$mailerSettings;

export const selectIsDownloading = (state: DefaultRootState) =>
  selectMailerSettings(state).downloadingStatus === 'loading';
export const selectIsUploading = (state: DefaultRootState) => selectMailerSettings(state).uploadingStatus === 'loading';
export const selectLocalMailerSettings = (state: DefaultRootState) => selectMailerSettings(state).localSettings;
export const selectReceivedMailerSettings = (state: DefaultRootState) => selectMailerSettings(state).receivedSettings;
export const selectIsAllDataReady = createSelector(
  selectLocalMailerSettings,
  selectReceivedMailerSettings,
  (local, received) =>
    !received ||
    local.password ||
    (Object.entries(received) as Entries<MailSettings>).some(([key, value]) => local[key] !== value)
);
