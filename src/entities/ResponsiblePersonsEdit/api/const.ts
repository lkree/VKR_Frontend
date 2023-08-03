import { computeApiPathWithDomain } from '~/shared/api/common';

const computePath = computeApiPathWithDomain.bind(null, 'responsiblePersons');
const computeEmailPath = computeApiPathWithDomain.bind(null, 'emailSender');

export const Methods = {
  GetAll: computePath('getAll'),
  Write: computePath('write'),
};

export const EmailMethods = {
  SendTestEmail: computeEmailPath('sendTestEmail'),
};
