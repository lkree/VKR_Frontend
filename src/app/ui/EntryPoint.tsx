import { ReactNode } from 'react';

import { compose } from '~/shared/lib/helpers';

import { Router, withStore } from '../providers';

const App = (component: () => ReactNode) => () => <>{component()}</>;

export const EntryPoint = compose(App, withStore)(() => <Router />);
