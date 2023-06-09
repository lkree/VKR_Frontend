import type { State } from './types';

interface DefaultRootState {
  $mailerSettings: State;
}

const selectMinimalLeftoversState = (state: DefaultRootState) => state.$mailerSettings;

export const selectIsDownloading = (state: DefaultRootState) =>
  selectMinimalLeftoversState(state).downloadingStatus === 'loading';
export const selectIsUploading = (state: DefaultRootState) =>
  selectMinimalLeftoversState(state).uploadingStatus === 'loading';
export const selectLocalMailerSettings = (state: DefaultRootState) => selectMinimalLeftoversState(state).localSettings;
export const selectReceivedMailerSettings = (state: DefaultRootState) =>
  selectMinimalLeftoversState(state).receivedSettings;
export const selectIsAllDataReady = (state: DefaultRootState) =>
  Object.entries(selectLocalMailerSettings(state)).every(([key, value]) => key === 'secure' || Boolean(value));
