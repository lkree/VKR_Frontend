import { computeApiPathWithDomain } from '~/shared/api/common';

const computePath = computeApiPathWithDomain.bind(null, 'minimalLeftovers');

export const Methods = {
  GetAll: computePath('getAll'),
  WriteAll: computePath('writeAll'),
  Write: computePath('write'),
  DeleteAll: computePath('deleteAll'),
  Delete: computePath('delete'),
};
