import type { AccessLevels } from '~/shared/const';

export interface ErrorResponse {
  message: string;
  error: Array<string>;
}

export type SessionResponse = {
  accessLevel: AccessLevels;
  email: string;
  exp: number;
  iat: number;
  id: string;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  accessLevel: AccessLevels;
  email: string;
  id: string;
}

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
