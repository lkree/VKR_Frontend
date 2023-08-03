import { createAction } from '@reduxjs/toolkit';

import { createAppAsyncThunk } from '~/shared/models/commonStores';

import * as api from '../api';
import type { ResponsiblePerson, ResponsiblePersonArray } from '../types';

const computeActionName = (actionName: string) => `responsiblePersons/${actionName}`;

export const setResponsiblePersonsArray = createAction<ResponsiblePersonArray>(
  computeActionName('setResponsiblePersonsArray')
);

export const setResponsiblePerson = createAction<ResponsiblePerson>(computeActionName('setResponsiblePerson'));

export const downloadResponsiblePersonsArray = createAppAsyncThunk<Promise<void>, void>(
  computeActionName('downloadResponsiblePersonsArray'),
  (_, { dispatch }) =>
    api.getResponsiblePersonArray().then(d => {
      dispatch(setResponsiblePersonsArray(d));
    }) satisfies Promise<void>
);

export const uploadResponsiblePerson = createAppAsyncThunk<Promise<void>, ResponsiblePerson>(
  computeActionName('uploadResponsiblePerson'),
  (responsiblePerson, { dispatch }) =>
    api.writeResponsiblePerson(responsiblePerson).then(d => {
      dispatch(setResponsiblePerson(d));
    }) satisfies Promise<void>
);

export const sendTestEmail = createAppAsyncThunk<Promise<true>, string>(computeActionName('sendTestEmail'), email =>
  api.sendTestEmail(email)
);
