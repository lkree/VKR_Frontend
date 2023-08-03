import { AccessLevels } from '~/shared/const';

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
  cityBounding?: string;
}

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
