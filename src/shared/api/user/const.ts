import { computeApiPathWithDomain } from '~/shared/api/common';

const computePath = computeApiPathWithDomain.bind(null, 'user');

export const Methods = {
  Registration: computePath('registration'),
  Session: computePath('session'),
  Login: computePath('login'),
  Logout: computePath('logout'),
  Refresh: computePath('refresh'),
  GetAll: computePath('getAll'),
};
