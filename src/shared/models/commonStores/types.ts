import type { User } from '~/shared/api/user';
import type { Nullable } from '~/shared/lib/ts';

export interface CommonState {
  user: Nullable<User>;
}
