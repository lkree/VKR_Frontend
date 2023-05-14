import { createRouteView } from 'atomic-router-react';

import { routes } from '~/shared/models/router';
import { chainAuthenticate } from '~/shared/models/session';
import { LoadingPage } from '~/shared/ui/LoadingPage';

import { App } from '../ui';

export const route = routes.main;

export const AppRoute = {
  route,
  view: createRouteView({
    route: chainAuthenticate(route, { flow: 'authorized', otherwise: routes.auth.login.open }),
    view: App,
    otherwise: LoadingPage,
  }),
};
