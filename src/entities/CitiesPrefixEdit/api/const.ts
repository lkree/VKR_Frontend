import { computeApiPathWithDomain } from '~/shared/api/common';

const computePath = computeApiPathWithDomain.bind(null, 'citiesPrefix');

export const Methods = {
  GetAll: computePath('getAll'),
  Add: computePath('add'),
  Delete: computePath('delete'),
} as const;
