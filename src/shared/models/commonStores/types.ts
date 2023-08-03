import type { Nullable } from 'lkree-common-utils/ts';

import type { User } from '~/shared/api/user';
import type { AlertState, ModalState } from '~/shared/lib/hooks';

export interface CommonState {
  user: Nullable<User>;
  modalSettingsList: Array<ModalState>;
  alertsSettingsList: Array<AlertState>;
  errors: {
    messagesList: Array<string>;
  };
}
