import type { Nullable } from '~/shared/lib/ts';

export interface State {
  uploadDate: Nullable<number>;
  lastUpdatedDate: Nullable<number>;
  fileUploadingState: 'idle' | 'uploading';
}
