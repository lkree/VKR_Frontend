import { createRouteView } from 'atomic-router-react';

import { routes } from '~/shared/models/router';
import { chainAuthenticate } from '~/shared/models/session';
import { LoadingPage } from '~/shared/ui/LoadingPage';

import { Login } from '../ui';

const route = routes.auth.login;

export const LoginRoute = {
  route,
  view: createRouteView({
    route: chainAuthenticate(route, { flow: 'anonymous', otherwise: routes.main.open }),
    view: Login,
    otherwise: LoadingPage,
  }),
};
