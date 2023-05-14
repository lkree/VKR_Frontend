import type { LoginResponse, SessionResponse, LoginRequest } from './api.types';
import { BuiltInHeaders, call } from './call';
import { Methods } from './const';

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
