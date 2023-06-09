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
export const selectIsAllDataReady = (state: DefaultRootState) =>
  Object.entries(selectLocalMailerSettings(state)).every(([key, value]) => key === 'secure' || Boolean(value));
