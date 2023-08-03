import type { Nullable } from 'lkree-common-utils/ts';

export interface State {
  uploadDate: Nullable<number>;
  lastUpdatedDate: Nullable<number>;
  fileUploadingState: 'idle' | 'uploading';
}
