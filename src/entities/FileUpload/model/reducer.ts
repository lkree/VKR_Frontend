import { createReducer } from '@reduxjs/toolkit';

import { acceptFile, setDate, uploadFile } from './actions';
import type { State } from './types';

const initialState: State = { uploadDate: null, lastUpdatedDate: null, fileUploadingState: 'idle' };

export const $fileUpload = createReducer(initialState, builder => {
  builder
    .addCase(setDate, (state, { payload }) => {
      state.uploadDate = payload.uploadDate;
      state.lastUpdatedDate = payload.lastUpdatedDate;
    })
    .addCase(uploadFile.pending, state => {
      state.fileUploadingState = 'uploading';
    })
    .addCase(uploadFile.fulfilled, state => {
      state.fileUploadingState = 'idle';
    })
    .addCase(uploadFile.rejected, state => {
      state.fileUploadingState = 'idle';
    })
    .addCase(acceptFile.pending, state => {
      state.fileUploadingState = 'uploading';
    })
    .addCase(acceptFile.fulfilled, state => {
      state.fileUploadingState = 'idle';
    })
    .addCase(acceptFile.rejected, state => {
      state.fileUploadingState = 'idle';
    });
});
