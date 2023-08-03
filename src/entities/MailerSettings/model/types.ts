import type { Nullable } from 'lkree-common-utils/ts';

import type { MailSettings, ReceivedMailSettings } from '../types';

export interface State {
  localSettings: MailSettings;
  uploadingStatus: 'loading' | 'idle';
  downloadingStatus: 'loading' | 'idle';
  receivedSettings: Nullable<ReceivedMailSettings>;
}
