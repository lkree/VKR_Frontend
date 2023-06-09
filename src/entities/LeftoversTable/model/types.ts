import type { Nullable } from '~/shared/lib/ts';

import type { MailSettings, ReceivedMailSettings } from '../types';

export interface State {
  localSettings: MailSettings;
  receivedSettings: Nullable<ReceivedMailSettings>;
  downloadingStatus: 'loading' | 'idle';
  uploadingStatus: 'loading' | 'idle';
}
