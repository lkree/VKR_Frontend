import type { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { InternalRoutes } from '~/shared/const';
import { selectIsAuthenticated } from '~/shared/models/session';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useSelector(selectIsAuthenticated);

  if (!isLoggedIn) return <Navigate to={InternalRoutes.Login} replace />;

  return <>{children}</>;
};
