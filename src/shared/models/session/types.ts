import type { SessionResponse } from '~/shared/api';
import type { Nullable } from '~/shared/lib/ts';
import type { AuthStatus } from '~/shared/models/session/const';

export type SessionState = {
  sessionData: Nullable<SessionResponse>;
  authStatus: AuthStatus;
};
