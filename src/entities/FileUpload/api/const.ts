import { computeApiPathWithDomain } from '~/shared/api/common';

const computePath = computeApiPathWithDomain.bind(null, 'file');

export const Methods = {
  Upload: computePath('upload'),
  DeleteExisting: computePath('deleteExisting'),
  GetFileInfo: computePath('getFileInfo'),
  AcceptFile: computePath('acceptFile'),
};
