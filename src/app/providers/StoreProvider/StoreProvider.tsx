import { FC, PropsWithChildren, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { createBrowserHistory } from 'history';

import { setStore, getStore } from '~/shared/lib/global';

import { initStore } from '../../model/store';

export const WithStore: FC<PropsWithChildren> = ({ children }) => {
  setStore(initStore(createBrowserHistory()));

  return <Provider store={getStore()}>{children}</Provider>;
};
