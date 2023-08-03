import { computeApiPathWithDomain } from '~/shared/api/common';

const computePath = computeApiPathWithDomain.bind(null, 'leftovers');

export const Methods = {
  Add: computePath('add'),
  Update: computePath('update'),
  WriteAll: computePath('writeAll'),
  DeleteOne: computePath('deleteOne'),
  DeleteAll: computePath('deleteAll'),
  GetAll: computePath('getAll'),
  GetUniqueProducts: computePath('getUniqueProducts'),
};
