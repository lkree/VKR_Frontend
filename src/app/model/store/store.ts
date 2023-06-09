import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import type { History } from 'history';

import { getRootReducer } from './rootReducer';

export const initStore = (history: History) => {
  return configureStore({
    reducer: getRootReducer(history),
    middleware: getDefaultMiddleware => [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoreActions: true,
        },
      }),
      routerMiddleware(history),
    ],
  });
};

export type Store = ReturnType<typeof initStore>;
export type RootState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

declare module 'react-redux' {
  // @ts-ignore
  export type DefaultRootState = RootState;
  export function useSelector<TState = DefaultRootState, TSelected = unknown>(
    selector: (state: TState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected;
}
