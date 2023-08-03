import type { ResponsiblePerson, ResponsiblePersonArray, ResponsiblePersonWithPassword } from '../types';

export type GetResponsiblePersonArrayResponse = ResponsiblePersonArray;

export type WriteResponsiblePersonRequest = Partial<ResponsiblePersonWithPassword>;
export type WriteResponsiblePersonResponse = ResponsiblePerson;
