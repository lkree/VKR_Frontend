import { createAction } from '@reduxjs/toolkit';

const computeActionName = (actionName: string) => `app/${actionName}`;

export const increment = createAction(computeActionName('increment'));
export const decrement = createAction(computeActionName('decrement'));
export const set = createAction<number>(computeActionName('set'));
