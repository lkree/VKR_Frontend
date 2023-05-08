import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { initStore } from '../../model/store';
import { createBrowserHistory } from 'history';

export const withStore = (component: () => ReactNode) => () =>
  <Provider store={initStore(createBrowserHistory())}>{component()}</Provider>;
