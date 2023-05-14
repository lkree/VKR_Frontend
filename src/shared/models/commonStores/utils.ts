import type { DefaultRootState } from 'react-redux';

import { createAsyncThunk } from '@reduxjs/toolkit';

// @ts-ignore
export const createAppAsyncThunk = createAsyncThunk.withTypes<{ state: DefaultRootState }>();
