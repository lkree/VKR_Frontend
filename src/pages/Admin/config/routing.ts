import { tryAdminRoute } from '~/shared/models/commonStores';
import { routes } from '~/shared/models/router';

import { Layout } from '../ui';

export const route = routes.admin;

export const AdminRoute = {
  route: tryAdminRoute({ route, otherwise: routes.main.open }),
  view: Layout,
};
