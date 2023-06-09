import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { InternalRoutes } from '~/shared/const';
import { selectIsAdmin } from '~/shared/models/commonStores';
import { selectIsAuthenticated } from '~/shared/models/session';

interface Props {
  otherwiseRoute: InternalRoutes;
  type: 'auth' | 'anonymous' | 'admin';
}

export const ProtectedRoute: FC<Props> = ({ otherwiseRoute, type }) => {
  const isLoggedIn = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);

  if (
    (type === 'auth' && !isLoggedIn) ||
    (type === 'anonymous' && isLoggedIn) ||
    (type === 'admin' && (!isAdmin || !isLoggedIn))
  ) {
    return <Navigate to={otherwiseRoute} replace />;
  }

  return <Outlet />;
};
