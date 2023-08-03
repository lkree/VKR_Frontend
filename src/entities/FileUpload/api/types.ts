import type { CreateRequestResponseData } from 'lkree-common-utils/api';

type SuccessResponse = true;

interface FileInfoSuccessResponse {
  uploadDate: number;
  lastUpdatedDate?: number;
}

export type UploadFile = CreateRequestResponseData<File, SuccessResponse>;
export type DeleteExistingFile = CreateRequestResponseData<void, SuccessResponse>;
export type GetFileInfo = CreateRequestResponseData<void, FileInfoSuccessResponse>;
export type AcceptFile = CreateRequestResponseData<boolean, FileInfoSuccessResponse>;
