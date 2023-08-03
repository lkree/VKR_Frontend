import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { createBrowserHistory } from 'history';

import { setStore, getStore } from '~/shared/lib/global';

import { initStore } from '../../model/store';

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  setStore(initStore(createBrowserHistory()));

  return <Provider store={getStore()}>{children}</Provider>;
};
