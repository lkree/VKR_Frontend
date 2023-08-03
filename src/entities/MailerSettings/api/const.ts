import { computeApiPathWithDomain } from '~/shared/api/common';

const computePath = computeApiPathWithDomain.bind(null, 'config');

export const Methods = {
  GetEmailSettings: computePath('getEmailSettings'),
  WriteEmailSettings: computePath('writeEmailSettings'),
};
