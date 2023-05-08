import { createAction } from '@reduxjs/toolkit';

const computeActionName = (actionName: string) => `login/${actionName}`;

export const setIsLoggedIn = createAction<boolean>(computeActionName('setIsLoggedIn'));
