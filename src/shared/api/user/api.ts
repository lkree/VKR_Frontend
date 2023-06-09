import { BuiltInHeaders, call } from '~/shared/api/common';

import { Methods } from './const';
import type { LoginResponse, SessionResponse, LoginRequest } from './types';

export const loadSession = () => call<SessionResponse>({ url: Methods.Session });

export const login = (data: LoginRequest) =>
  call<LoginResponse>({
    url: Methods.Login,
    options: {
      method: 'POST',
      body: data,
      headers: { builtIn: [BuiltInHeaders.JSON] },
    },
  });

export const logout = () => call({ url: Methods.Logout, options: { method: 'POST' } });
