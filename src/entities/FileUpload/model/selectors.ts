import type { State } from './types';

interface DefaultRootState {
  $fileUpload: State;
}

const selectFileUploadState = (state: DefaultRootState) => state.$fileUpload;

export const selectFileUploadDate = (state: DefaultRootState) => selectFileUploadState(state).uploadDate;
export const selectIsLastUpdatedEqualUploadDate = (state: DefaultRootState) =>
  selectFileUploadState(state).lastUpdatedDate === selectFileUploadDate(state);
export const selectIsFileUploading = (state: DefaultRootState) =>
  selectFileUploadState(state).fileUploadingState === 'uploading';
