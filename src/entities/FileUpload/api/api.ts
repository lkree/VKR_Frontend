import { call } from '~/shared/api/common';

import { Methods } from './const';
import type { SuccessResponse, FileInfoSuccessResponse } from './types';

export const uploadFile = (file: File) => {
  const body = new FormData();

  body.append('file', file);

  return call<SuccessResponse>({
    url: Methods.Upload,
    options: {
      method: 'POST',
      stringifyBody: false,
      body,
    },
  });
};

export const deleteExistingFile = () => call<SuccessResponse>({ url: Methods.DeleteExisting });

export const getFileInfo = () => call<FileInfoSuccessResponse>({ url: Methods.GetFileInfo });

export const acceptFile = () => call<FileInfoSuccessResponse>({ url: Methods.AcceptFile });
