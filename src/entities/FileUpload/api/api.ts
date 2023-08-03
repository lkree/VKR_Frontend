import { ApiFunction, BuiltInHeaders } from 'lkree-common-utils/api';

import { call } from '~/shared/api/common';

import { Methods } from './const';
import type { GetFileInfo, UploadFile, DeleteExistingFile, AcceptFile } from './types';

export const uploadFile: ApiFunction<UploadFile> = file => {
  const body = new FormData();

  body.append('file', file);

  return call({
    url: Methods.Upload,
    options: {
      method: 'POST',
      stringifyBody: false,
      body,
    },
  });
};

export const deleteExistingFile: ApiFunction<DeleteExistingFile> = () => call({ url: Methods.DeleteExisting });

export const getFileInfo: ApiFunction<GetFileInfo> = () => call({ url: Methods.GetFileInfo });

export const acceptFile: ApiFunction<AcceptFile> = notify =>
  call({
    url: Methods.AcceptFile,
    options: {
      method: 'POST',
      body: { notify },
      headers: { builtIn: [BuiltInHeaders.JSON] },
    },
  });
